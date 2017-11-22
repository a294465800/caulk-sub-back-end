<style scoped>
.table-list {
  flex: 1;
}
</style>

<template>
  <section class="content-wrap flex-column">
    <!-- 面包屑导航 -->
    <el-breadcrumb class="breadcrumb" separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>预约列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 面包屑导航 -->

    <!-- 功能 -->
    <div class="operation">
      <el-form :inline="true" :model="searchForm">
        <el-form-item label="订单状态">
          <el-select v-model="searchForm.state" placeholder="订单状态" @change="onSubmit">
            <el-option label="全部" value=""></el-option>
            <el-option label="未接单" value="1"></el-option>
            <el-option label="已受理" value="2"></el-option>
            <el-option label="已完成" value="3"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <!-- /功能 -->

    <div class="table-list flex-column flex-center" v-if="loading">
      <i class="el-icon-loading loading-status"></i>
    </div>
    <div class="table-list" v-else>
      <el-table :data="reservations" border stripe style="min-width: 900px;">
        <el-table-column prop="id" label="ID" sortable></el-table-column>
        <el-table-column prop="created_at" label="日期"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="number" label="联系方式"></el-table-column>
        <el-table-column prop="address" label="地址" show-overflow-tooltip></el-table-column>
        <el-table-column prop="worker" label="接单师傅">
          <template slot-scope="scope">
            <span>{{scope.row.worker || '暂未接单'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="state" label="当前状态" sortable>
          <template slot-scope="scope">
            <span v-if="scope.row.state == 0" class="warning">未接单</span>
            <span v-else-if="scope.row.state == 1" class="success">已受理</span>
            <span v-else-if="scope.row.state == 2" class="normal">已完成</span>
            <span v-else>未知</span>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 页码 -->
    <div class="pages">
      <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="10" layout="total, prev, pager, next" :total="count">
      </el-pagination>
    </div>
    <!-- /页码 -->
  </section>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
      //搜索 form
      searchForm: {
        state: ""
      },

      count: 0,

      currentPage: 1,

      //模拟数据
      reservations: [
        {
          id: 1,
          name: "黄华华",
          number: 18461251225,
          address: "广州市番禺区",
          worker: "老师傅",
          created_at: "2017-10-21",
          state: 1
        }
      ]
    };
  },

  created() {
    // this.$api.getReservations("", res => {
    //   this.reservations = res.data.data;
    //   this.count = res.data.count;
    // });
    setTimeout(() => {
      this.loading = false;
    }, 300);
  },

  methods: {
    /**
     * @param {number} page 当前页码
     * */
    handleCurrentChange(page) {
      let searchData = {
        page: page,
        state: this.searchForm.state
      };
      this.$api.getReservations(searchData, res => {
        this.reservations = res.data.data;
      });
    },

    //搜索查询
    onSubmit() {
      this.$api.getReservations(this.searchForm.state, res => {
        this.reservations = res.data.data;
        this.count = res.data.count;
      });
    }
  }
};
</script>

