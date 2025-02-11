<template>
  <div class="pagination-container">
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="pageSize"
      :current-page.sync="currentPage"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, watch } from 'vue';

interface Props {
  total: number;
  pageSize?: number;
}

const props = withDefaults(defineProps<Props>(), {
  pageSize: 10,
});

const currentPage = ref(1);

watch(
  () => props.total,
  () => {
    if (currentPage.value * props.pageSize > props.total) {
      currentPage.value = Math.max(Math.ceil(props.total / props.pageSize), 1);
    }
  }
);

const emit = defineEmits(['update']);

function handleCurrentChange(page: number) {
  currentPage.value = page;
  emit('update', page);
}
</script>

<style scoped>
.pagination-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>