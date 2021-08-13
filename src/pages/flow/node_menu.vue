<template>
  <div class="flow-menu"
       ref="tool">
    <draggable v-model="menuList"
               :options="draggableOptions"
               @start="move"
               @end="end"
               v-for="menu in menuList"
               :key="menu.id">

      <li class="ef-node-menu-li"
          :type="menu.type"
          style="position: relative">

        <!-- 新节点 -->
        <div class="new-node">
          new
        </div>
      </li>
    </draggable>
  </div>
</template>
<script>
import draggable from 'vuedraggable'

var mousePosition = {
  left: '-1',
  top: '-1',
}

export default {
  data() {
    return {
      draggableOptions: {
        preventOnFilter: false,
        sort: false,
        disabled: false,
        ghostClass: 'tt',
        forceFallback: true,
      },
      menuList: [
        {
          id: '1',
          name: '新建节点',
          type: 'timer',
        },
      ], //页面渲染访视节点
      nodeMenu: {}, //被拖拽的节点
    }
  },

  components: {
    draggable,
  },

  created() {
    /**
     * @param event
     */
    if (this.isFirefox()) {
      document.body.ondrop = function (event) {
        // 解决火狐浏览器无法获取鼠标拖拽结束的坐标问题
        mousePosition.left = event.layerX
        mousePosition.top = event.clientY - 50
        event.preventDefault()
        event.stopPropagation()
      }
    }
  },

  methods: {
    // 根据类型获取左侧菜单对象
    getMenuByType(type) {
      for (let i = 0; i < this.menuList.length; i++) {
        if (this.menuList[i].type === type) {
          return this.menuList[i]
        }
      }
    },
    // 拖拽开始时触发
    move(evt, a, b, c) {
      var type = evt.item.attributes.type.nodeValue
      this.nodeMenu = this.getMenuByType(type)
    },

    // 拖拽结束时触发
    end(evt, e) {
      this.$emit('addNode', evt, this.nodeMenu, mousePosition)
    },

    // 是否是火狐浏览器
    isFirefox() {
      var userAgent = navigator.userAgent
      if (userAgent.indexOf('Firefox') > -1) {
        return true
      }
      return false
    },
  },
}
</script>
<style>
.flow-menu {
  overflow: visible;
  height: auto;
}

.flow-menu .ef-node-menu-li {
  color: #565758;
  height: 34px;
  line-height: 34px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ef-node-menu-li:hover {
  cursor: move;
}

.flow-menu .el-checkbox__input {
  position: absolute !important;
  right: -25px !important;
  top: 3px !important;
}

.flow-menu .el-checkbox:last-of-type {
  position: relative;
  margin-right: 50px;
}

.flow-menu .new-node {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
  color: #67c23a;
  height: 34px;
  line-height: 34px;
}
</style>

