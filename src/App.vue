<script setup lang="ts">
    import HelloWorld from '@/components/HelloWorld.vue'
    import { Plus } from '@element-plus/icons-vue'
    import request from '@/api/request' // ʹ��Ĭ�ϵ���
    import { onMounted, ref } from 'vue'
    import axios from 'axios';

    const clusters = ref([])

    

    const fetchData = async () => {
        try {
            // 修改这里的路径为 /api/example
            const response = await request.get('/example');
            console.log('获取数据成功:', response.data);
        } catch (error) {
            console.error('获取数据失败:', error.message);
        }
    };

    fetchData();

    const fetchClusters = async () => {
        try {
            const response = await request.get('/dipper/monitor/api/v1/kafka/cluster/getAllCluster');
            console.log('��ȡ��Ⱥ��Ϣ�ɹ�:', JSON.stringify(response, null, 2));

            // ȷ�� response �� response.data ������ undefined
            if (response && response.data) {
                clusters.value = response.data.map(cluster => ({
                    ...cluster,
                    monitoringEnabled: cluster.clusterPolicy !== 'none'
                }));
            } else {
                console.error('API ��Ӧ���ݸ�ʽ����ȷ:', response);
            }
        } catch (error) {
            console.error('��ȡ��Ⱥ��Ϣʧ��:', error.message);
        }
    };

    onMounted(() => {
        fetchClusters(); // ��ȷ���� fetchClusters ����
    })
</script>


<template>
    <div>
        <router-view></router-view> <!-- 显示匹配的组件 -->
    </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

.example-pagination-block + .example-pagination-block {
    margin-top: 10px;
}
</style>
