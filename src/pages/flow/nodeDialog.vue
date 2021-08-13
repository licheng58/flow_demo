
<template>
  <div class="ef-node-form">
    <el-dialog :title='title'
               :visible.sync="nodeDialog"
               :show-close='false'>
      <el-form :model="node"
               ref="dataForm"
               label-width="80px"
               v-show="type === 'node'">
        <el-form-item label="类型">
          <el-input v-model="node.type"
                    :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="名称">
          <el-input v-model="node.name"></el-input>
        </el-form-item>
        <el-form-item label="left坐标">
          <el-input v-model="node.left"
                    :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="top坐标">
          <el-input v-model="node.top"
                    :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="ico图标">
          <el-input v-model="node.ico"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="cancel_node">取消</el-button>
          <el-button type="primary"
                     @click="save_node">保存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- <el-form :model="line"
             ref="dataForm"
             label-width="80px"
             v-show="type === 'line'">
      <el-form-item label="条件">
        <el-input v-model="line.label"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button icon="el-icon-close">重置</el-button>
        <el-button type="primary"
                   icon="el-icon-check"
                   @click="saveLine">保存</el-button>
      </el-form-item>
    </el-form> -->
  </div>
</template>

<script>
import { cloneDeep } from 'lodash'

export default {
  props: {
    nodeDialog: Boolean,
  },

  data() {
    return {
      title: '新建节点',
      type: 'node',
      node: {},
      line: {},
      data: {},
    }
  },

  created() {
    this.$bus.$on('set_nodeForm', (val1, val2) => {
      if (val1 === 'edit') {
        this.title = '编辑节点'
        this.node = val2
      } else {
        this.node = val2
        this.title = '新建节点'
      }
    })
  },

  methods: {
    /**
     * 表单修改，这里可以根据传入的ID进行业务信息获取
     * @param data
     * @param id
     */
    nodeInit(data, id) {
      this.type = 'node'
      this.data = data
      data.nodeList.filter((node) => {
        if (node.id === id) {
          this.node = cloneDeep(node)
        }
      })
    },

    lineInit(line) {
      this.type = 'line'
      this.line = line
    },

    // 修改连线
    saveLine() {
      this.$emit('setLineLabel', this.line.from, this.line.to, this.line.label)
    },

    // 保存节点
    save_node() {
      // this.data.nodeList.filter((node) => {
      //   if (node.id === this.node.id) {
      //     node.name = this.node.name
      //     node.left = this.node.left
      //     node.top = this.node.top
      //     node.ico = this.node.ico
      //     node.state = this.node.state
      //     this.$emit('repaintEverything')
      //   }
      // })
      // console.log(this.node)
      this.$parent.nodeDialog = false
    },

    // 取消节点
    cancel_node() {
      this.$parent.nodeDialog = false
    },
  },
}
</script>

<style>
.el-node-form-tag {
  position: absolute;
  top: 50%;
  margin-left: -15px;
  height: 40px;
  width: 15px;
  background-color: #fbfbfb;
  border: 1px solid rgb(220, 227, 232);
  border-right: none;
  z-index: 0;
}
</style>
