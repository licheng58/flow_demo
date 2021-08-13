let dataB = {
  name: '流程B',
  nodeList: [
    {
      id: 'nodeA',
      name: '开始节点',
      type: 'task',
      left: '18px',
      top: '223px',
      ico: 'el-icon-user-solid',
      state: 'success',
      viewOnly: true
    }
  ],
  lineList: []
}

export function getDataB() {
  return dataB
}
