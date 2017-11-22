<style scoped>
.dialog {
  max-height: 80vh;
}

.dialog-img {
  width: 100%;
}
</style>

<template>
  <section class="content-wrap flex-column">
    <!-- 面包屑导航 -->
    <el-breadcrumb class="breadcrumb" separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>公司简介</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 面包屑导航 -->

    <div class="table-list flex-column flex-center" v-if="loading">
      <i class="el-icon-loading loading-status"></i>
    </div>
    <div class="table-list" v-else>
      <div class="form-wrap">
        <el-form label-position="top" label-width="80px" :model="companyForm" ref="companyForm" :rules="rules">
          <el-form-item label="公司名称" prop="name">
            <el-input v-model="companyForm.name" placeholder="输入公司名称"></el-input>
          </el-form-item>
          <el-form-item label="服务电话" prop="phone">
            <el-input v-model="companyForm.phone" placeholder="输入服务热线"></el-input>
          </el-form-item>
          <el-form-item label="公司描述" prop="desc">
            <el-input type="textarea" :rows="5" v-model="companyForm.desc" placeholder="输入公司描述"></el-input>
          </el-form-item>
          <el-form-item label="轮播图">
            <el-upload class="ad-imgs" :file-list="fileList" action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
              <i class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="详情图">
            <el-upload class="info-imgs" action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
              <i class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>
          </el-form-item>
            <el-button type="success" style="width: 95%;display:block;margin: 20px auto;">更新信息</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <el-dialog :visible.sync="dialogVisible" size="tiny" custom-class="dialog">
      <img class="dialog-img" :src="preImg" alt="图片">
    </el-dialog>
  </section>
</template>

<script>
export default {
  data() {
    return {
      loading: true,

      preImg: "",
      dialogVisible: false,

      rules: {
        name: [{ required: true, message: "公司名称不能为空！" }],
        phone: [{ required: true, message: "服务热线不能为空！" }],
        desc: [{ required: true, message: "公司描述不能为空！" }]
      },

      fileList: [
        {
          name: "aaa",
          url:
            "http://img06.tooopen.com/images/20160728/tooopen_sy_172881922881.jpg"
        }
      ],

      //表单
      companyForm: {
        name: "",
        phone: "",
        desc: ""
      }
    };
  },

  created() {
    setTimeout(() => {
      this.loading = false;
    }, 300);
  },

  methods: {
    //预览图片按钮
    handlePictureCardPreview(file) {
      console.log(file);
      this.dialogVisible = true;
      this.preImg = file.url;
    },

    //移除图片
    handleRemove(file, filelist) {}
  }
};
</script>


