<template>
  <div class="postlist">
     <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
      label="日期"
      width="180">
      <template >
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">2019-12-10</span>
      </template>
    </el-table-column>
    <el-table-column
      label="标题"
      width="300">
      <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.title.substring(0,20) }}</el-tag>
          </div>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
   <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageIndex"
      :page-sizes="[2, 4, 5, 8]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
import { getPostList } from '@/myapi/api.js'
export default {
  data () {
    return {
      tableData: [],
      pageIndex: 1,
      total: 0,
      pageSize: 5
    }
  },
  mounted () {
    this.init(this.pageSize, this.pageIndex)
  },
  methods: {
    init (pageSize, pageIndex) {
      getPostList({
        pageSize: pageSize,
        pageIndex: pageIndex
      })
        .then(res => {
          console.log(res)
          this.tableData = res.data.data
          this.total = 11
        })
    },
    handleEdit (index, row) {
      console.log(index, row)
    },
    handleDelete (index, row) {
      console.log(index, row)
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.init(val, this.pageIndex)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.init(this.pageSize, val)
    }
  }
}
</script>

<style>

</style>
