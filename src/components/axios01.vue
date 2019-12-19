<template>
  <div>
    <div>
      <el-row>
        <el-col :span="6">用户名：<el-input placeholder="请输入用户名" v-model="name" clearable style="width: 70%;"></el-input></el-col>
        <el-col :span="6">密码：<el-input placeholder="请输入密码" v-model="age" clearable style="width: 70%;"></el-input></el-col>
        <el-col :span="6"><el-button type="success" @click="add">新增</el-button></el-col>
        <el-col :span="6"><el-button type="warning">一键刷新</el-button></el-col>
      </el-row>
    </div>
    <div>
      <el-table
        :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
        style="width: 100%">
        <el-table-column
          label="ID"
          prop="id">
        </el-table-column>
        <el-table-column
          label="用户名"
          prop="name">
        </el-table-column>
        <el-table-column
          label="密码"
          prop="age">
        </el-table-column>
        <el-table-column
          align="right">
          <template slot="header" slot-scope="scope">
            <el-input
              v-model="search"
              size="mini"
              placeholder="输入关键字搜索"/>
          </template>
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">修改</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="pageSize"
        :page-count="pageCount"
        @current-change="handleCurrentChange">
      </el-pagination>
    </div>
    <!-- 弹框 -->
    <el-dialog title="修改用户信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="用户名：" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" style="width: 60%;"></el-input>
        </el-form-item>
        <el-form-item label="密码：" :label-width="formLabelWidth">
          <el-input v-model="form.age" autocomplete="off" style="width: 60%;"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="modify">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script>
export default {
  name: "axios01",
  data() {
    return {
      // 分页所用数据
      // 当前页数
      currentPage: 1,
      // 总条数
      total: 100,
      // 总页数
      pageCount: 100,
      // 每页条数
      pageSize: 5,
      msg: "haha",
      // 新增所用数据
      name: "",
      age: "",
      // 页面list模拟数据
      tableData: [
        {
          id: '1',
          name: '吴老二',
          age: '123456'
        }, 
        {
          id: '2',
          name: '王亮',
          age: '123456'
        }, 
        {
          id: '3',
          name: '李宏',
          age: '123456'
        }, 
        {
          id: '4',
          name: '啊望',
          age: '123456'
        }
      ],
      search: '',
      // 弹框使用字段
      dialogFormVisible: false,
      form: {
        id: "",
        name: '',
        age: '',
        // date1: '',
        // date2: '',
        // delivery: false,
        // type: [],
        // resource: '',
        // desc: ''
      },
      formLabelWidth: '120px'
    };
  },
  methods: {
    // 分页所用方法
    handleCurrentChange(val){
      // 设置当前页码
      this.currentPage = val;
      // 调用分页方法
      this.getByPage();
    },
    // 修改用户名密码方法-调取弹窗
    handleEdit(index, row) {
      console.log(index, row);
      this.dialogFormVisible = true;
      this.form.id = row.id;
      this.form.name = row.name;
      this.form.age = row.age;
    },
    // 修改用户名密码方法-修改数据
    modify(){
      this.dialogFormVisible = false;
      var url = this.HOST + "/sys/user/updateById";
      this.$axios.post(url, {
        id: this.form.id,
        name: this.form.name,
        age: this.form.age,
      }).then(resource => {
        if(resource.status === 200){
          this.getByPage();
          this.$message('用户修改成功');
        }else{
          alert("用户修改失败");
        }
      }).catch(error => {
        console.log(error);
      });
    },
    // 根据id删除方法
    handleDelete(index, row) {
      // elementui方法
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 真正删除逻辑
          var url = this.HOST + "/sys/user/deleteByID?id=" + row.id;
          this.$axios.get(url)
          .then(res => {
            if(res.status === 200){
              // 每页五条 一共六条数据 删除第六条数据时显示有问题 加此动作修改
              if(this.total % this.pageSize === 1){
                this.currentPage--;
              }
              this.getByPage();
            }else{
              alert("删除失败");
            }
          })
          .catch(error => {
            console.log(error);
          })

          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });

      // 自己写的方法
      // if(confirm("是否确认删除该账户") == true){
      //   console.log(index, row);
      //   var url = this.HOST + "/sys/user/deleteByID?id=" + row.id;
      //   console.log(url);
      //   this.$axios.get(url)
      //   .then(res => {
      //     if(res.status === 200){
      //       this.getAllList();
      //     }else{
      //       alert("删除失败");
      //     }
      //   })
      //   .catch(error => {
      //     console.log(error);
      //   })
      // }
    },
    // 调用所有用户方法
    getAllList(){
      // "http://127.0.0.1:8081/sys/user/selectList
      var url = this.HOST + '/sys/user/selectList';
      console.log("url:" + url);
      this.$axios.get(url)
      .then(res => {
        if(res.status === 200){
          // 返回的数据在data中
          this.tableData = res.data;
        }else{
          alert("获取数据失败");
        }
        console.log(res);
      })
      .catch(error => {
        console.log(error);
      })
    },
    // 分页查询
    getByPage(){
      var url = this.HOST + "/sys/user/selectByPage";
      this.$axios.post(url, {
        current: this.currentPage,
        size: this.pageSize,
      }).then(resource => {
        if(resource.status === 200){
          this.tableData = resource.data.records;
          this.total = resource.data.total;
          this.pageCount = resource.data.pages;
        }else{
          alert("分页查询失败");
        }
      }).catch(error => {
        console.log(error);
      });
    },
    // 新增用户方法
    add(){
      // 判断是否输入用户名
      if(this.name == ""){
        this.$message({
          showClose: true,
          message: '请输入用户名',
          type: 'warning'
        });
        return;
      }
      // 判断是否输入密码
      if(this.age == ""){
        this.$alert('', '请输入密码', {
          confirmButtonText: '确定',
        });
        return;
      }
      var url = this.HOST + "/sys/user/saveUser";
      this.$axios.post(url, {
        name: this.name,
        age: this.age 
      }).then(resource => {
        if (resource.status === 200){
          // 调用获取列表方法
          this.getByPage();
          // 清除输入框内容
          this.name = "";
          this.age = "";
        }else{
          alert("数据添加失败");
        }
      })
    },
  },
  created (){
    this.getByPage();
  }
};
</script>
<style scoped></style>
