<template>
  <el-card class="box-card">
    <!-- 卡片顶部添加品牌按钮 -->
    <div style="margin-bottom: 10px;">
      <el-button type="primary" size="default" icon="Plus" @click="handleAddBrand">添加品牌</el-button>
    </div>

    <!-- 表格组件：用于展示已有平台数据 -->
    <el-table :data="tableData" style="width: 100%; margin-bottom: 10px;" border>
      <el-table-column label="序号" width="80px" align="center">
        <template #default="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="品牌名称" prop="name"></el-table-column>
      <el-table-column label="品牌Logo" align="center">
        <template #default="scope">
          <el-image
            style="width: 50px; height: 50px"
            :src="scope.row.logoUrl"
            fit="cover"></el-image>
        </template>
      </el-table-column>
      <el-table-column label="品牌操作" align="center">
        <template #default="scope">
          <el-button type="text" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="text" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页组件 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="pageSize"
      :current-page="currentPage"
      @current-change="handlePageChange">
    </el-pagination>
  </el-card>
</template>

<script setup>
import { ref } from 'vue';

// 模拟的数据
const tableData = ref([
  { name: 'Brand A', logoUrl: 'https://example.com/logoA.png' },
  { name: 'Brand B', logoUrl: 'https://example.com/logoB.png' },
  // 更多数据...
]);

const total = ref(100); // 总数据条数
const pageSize = ref(10); // 每页显示条数
const currentPage = ref(1); // 当前页码

// 分页切换事件处理函数
function handlePageChange(page) {
  currentPage.value = page;
  fetchData(); // 假设有一个方法从服务器获取对应页码的数据
}

// 添加品牌按钮点击事件处理函数
function handleAddBrand() {
  console.log('添加品牌');
  // 这里可以打开一个对话框或跳转到添加品牌的页面
}

// 编辑按钮点击事件处理函数
function handleEdit(row) {
  console.log('编辑品牌', row);
  // 这里可以打开一个对话框或跳转到编辑品牌的页面
}

// 删除按钮点击事件处理函数
function handleDelete(row) {
  console.log('删除品牌', row);
  // 这里可以调用API删除品牌并更新表格数据
}

// 模拟从服务器获取数据的方法
function fetchData() {
  // 根据 currentPage 和 pageSize 获取数据
  // 更新 tableData
}
</script>

<style scoped>
.box-card {
  width: 100%;
}
</style>