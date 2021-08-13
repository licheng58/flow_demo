<template>
  <div ref="node"
       :style="nodeContainerStyle"
       @click="clickNode"
       @mouseup="changeNodeSite"
       :class="nodeContainerClass"
       class="nodeContainerClass">

    <!-- 最左侧的那条竖线 -->
    <div class="ef-node-left"></div>

    <!-- 节点类型的图标 -->
    <div class="ef-node-left-ico flow-node-drag">
      <i :class="nodeIcoClass"></i>
    </div>

    <!-- 节点名称 -->
    <div class="ef-node-text"
         :show-overflow-tooltip="true">
      {{node.name}}
    </div>

    <!-- 设置节点 -->
    <el-dropdown @command="handleCommand"
                 class="node-drop"
                 placement="bottom-start"
                 v-if="!node.viewOnly">
      <span class="ef-node-right-ico">
        <i class="el-icon-setting"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="a">编辑节点</el-dropdown-item>
        <el-dropdown-item command="b">删除节点</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

  </div>
</template>

<script>
export default {
  data() {
    return {}
  },

  props: {
    node: Object,
    activeElement: Object,
  },

  computed: {
    nodeContainerClass() {
      return {
        'ef-node-container': true,
        'ef-node-active':
          this.activeElement.type == 'node'
            ? this.activeElement.nodeId === this.node.id
            : false,
      }
    },

    // 节点容器样式
    nodeContainerStyle() {
      return {
        top: this.node.top,
        left: this.node.left,
        backgroundColor: this.node.viewOnly ? '#f56c6c' : '#fff',
      }
    },

    nodeIcoClass() {
      var nodeIcoClass = {}
      nodeIcoClass[this.node.ico] = true
      // 添加该class可以推拽连线出来
      nodeIcoClass['flow-node-drag'] = true
      return nodeIcoClass
    },
  },

  methods: {
    // 设置节点
    handleCommand(command) {
      if (command === 'a') {
        // 编辑节点
        this.$parent.nodeDialog = true
        this.$bus.$emit('set_nodeForm', 'edit', this.node)
      } else if (command === 'b') {
        // 删除节点
        this.$parent.activeElement.nodeId = this.node.id
        this.$parent.activeElement.type = 'node'
        this.$parent.deleteElement()
      }
    },

    // 点击节点
    clickNode() {
      this.$emit('clickNode', this.node.id)
    },

    // 鼠标移动后抬起
    changeNodeSite() {
      // 避免抖动
      if (
        this.node.left == this.$refs.node.style.left &&
        this.node.top == this.$refs.node.style.top
      ) {
        return
      }
      this.$emit('changeNodeSite', {
        nodeId: this.node.id,
        left: this.$refs.node.style.left,
        top: this.$refs.node.style.top,
      })
    },
  },
}
</script>

<style>
.nodeContainerClass .el-icon-setting {
  color: #409eff;
}

.nodeContainerClass .el-icon-setting:hover {
  font-size: 16px;
  cursor: pointer;
}

.nodeContainerClass .node-drop {
  position: absolute;
  right: 5px;
}
</style>
