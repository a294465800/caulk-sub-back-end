<style scoped>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>

<template>
  <section class="content-wrap flex-column">
    <!-- 面包屑导航 -->
    <el-breadcrumb class="breadcrumb" separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>师傅管理</el-breadcrumb-item>
      <el-breadcrumb-item>申请列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 面包屑导航 -->

    <!-- 功能 -->
    <div class="operation">
      <el-form :inline="true" :model="searchForm">
        <el-form-item label="省份">
          <el-select v-model="searchForm.area" placeholder="选择省份">
            <el-option v-for="sheng in shengs" :key="sheng.id" :label="sheng.fullname" :value="sheng.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="申请状态">
          <el-select v-model="searchForm.state" placeholder="申请状态">
            <el-option label="全部" value=""></el-option>
            <el-option label="待处理" value="0"></el-option>
            <el-option label="通过" value="1"></el-option>
            <el-option label="拒绝" value="2"></el-option>
          </el-select>
        </el-form-item>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- /功能 -->

    <div class="table-list flex-column flex-center" v-if="loading">
      <i class="el-icon-loading loading-status"></i>
    </div>
    <div class="table-list" v-else>
      <el-table :data="masterLists" border stripe style="min-width: 900px;">
        <el-table-column prop="id" label="ID" sortable></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="id_card" label="身份证"></el-table-column>
        <el-table-column prop="phone" label="联系方式"></el-table-column>
        <el-table-column prop="good_at" label="擅长" show-overflow-tooltip></el-table-column>
        <el-table-column prop="address" label="地址" show-overflow-tooltip></el-table-column>
        <el-table-column prop="created_at" label="申请时间"></el-table-column>
        <el-table-column prop="state" label="申请状态">
          <template slot-scope="scope">
            <span v-if="scope.row.state == 0" class="normal">待处理</span>
            <span v-else-if="scope.row.state == 1" class="success">已通过</span>
            <span v-else class="warning">已拒绝</span>
          </template>
        </el-table-column>
        <el-table-column prop="state" label="操作">
          <template slot-scope="scope">
            <el-button v-if="scope.row.state == 0" size="small" type="primary" @click="passMaster(scope.$index, scope.row.id)">通过</el-button>
            <el-button v-if="scope.row.state == 0" size="small" type="danger" @click="rejectMaster(scope.$index, scope.row.id)">拒绝</el-button>
            <span v-else>无操作</span>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 页码 -->
    <div class="pages">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="eachPage" layout="total, prev, sizes, pager, next" :total="count">
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
      searchForm: {
        state: ""
      },

      shengs: "",

      pickerOptions: this.$common.dateOptions,

      masterLists: [{
        id: 1,
        state: 1,
        created_at: '2017-11-20',
        address: '广州市番禺区xxxxx很详细的',
        good_at: '炒菜',
        phone: 18315125136,
        id_card: 405135125551364128,
        name: '梅超风'
      }],
      count: 1,
      currentPage: 1,
      eachPage: 10
    };
  },

  created() {
    // this.$api.getApplies({ state: 0 }, res => {
    //   this.masterLists = res.data.data;
    //   this.count = res.data.count;
    // });

    // this.$api.getDistrict((err, res) => {
    //   this.shengs = res.result[0];
    // });
    setTimeout(() => {
      this.loading = false;
    }, 300);
  },

  methods: {
    //搜索
    search() {
      this.$api.getApplies(this.searchForm, res => {
        this.masterLists = res.data.data;
        this.count = res.data.count;
      });
    },

    //通过
    passMaster(index, id) {
      this.$confirm("此操作将通过该申请, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$api.postApply(id, { state: 1 }, res => {
            this.masterLists.splice(index, 1);
            this.count--;
            this.$message({
              type: "success",
              message: "通过成功"
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },

    //通过
    rejectMaster(index, id) {
      this.$confirm("此操作将拒绝该申请, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$api.postApply(id, { state: 2 }, res => {
            this.masterLists.splice(index, 1);
            this.count--;
            this.$message({
              type: "warning",
              message: "已拒绝"
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },

    //页码
    handleCurrentChange(page) {
      this.$api.getApplies(
        { state: this.searchForm.state, page: page },
        res => {
          this.masterLists = res.data.data;
        }
      );
    },

    //每页限制
    handleSizeChange(eachPage) {
      console.log(eachPage);
    }
  }
};
</script>

