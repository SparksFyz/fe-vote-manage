import React, { Component } from "react"

import { Breadcrumb, Icon } from 'antd'


import { post, get } from '../../http/index'

Component.prototype.post = post
Component.prototype.get = get

class NewProduct extends Component {
  // constructor(props) {
  //   super(props)

  // }

  render() {
    return (
      <div style={{ margin: 30 }}>
        <Breadcrumb>
          <Breadcrumb.Item href="">
            <Icon type="home" />
          </Breadcrumb.Item>
          <Breadcrumb.Item href="">
            <Icon type="credit-card" />
            <span>投票管理</span>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            新增产品
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
    )
  }

}

export default NewProduct
