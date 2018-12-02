import React, { Component } from "react"

import {
  Breadcrumb,
  Icon,
  Form,
  Input,
  Button,
  message,
} from 'antd'

import { post, get } from '../../http/index'

Component.prototype.post = post
Component.prototype.get = get

const FormItem = Form.Item;

class Product extends Component {
  // constructor(props) {
  //   super(props)
  
  // }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const projectId = this.props.location.search.split('=')[1]
        const payload = {
          ...values,
          projectId: Number(projectId)
        }
        
        this.post('vote/project/updateProject', payload).then(res => {
          message.success('更新项目成功');
        })
      }
    });
  }

  componentDidMount = () => {
    const { projectName, voteCount, heatValue } = this.props.location && this.props.location.params

    this.props.form.setFieldsValue({
      projectName: projectName,
      voteCount: voteCount,
      heatValue: heatValue
    });
  };

  render() {
    const formItemLayout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 8 },
    }
    const buttonItemLayout = {
      wrapperCol: { span: 14, offset: 4 },
    }

    const { getFieldDecorator } = this.props.form

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
            产品详情
          </Breadcrumb.Item>
        </Breadcrumb>
        
        <Form layout="horizontal" onSubmit={this.handleSubmit} style={{ marginTop: 60 }}>
          <FormItem
            label="项目名"
            {...formItemLayout}
          >
            {getFieldDecorator('projectName', {
              rules: [{ required: true, message: '请输入项目名称!' }],
            })(
              <Input placeholder="input placeholder" />
            )}
          </FormItem>
          <FormItem
            label="投票数"
            {...formItemLayout}
          >
            {getFieldDecorator('voteCount', {
              rules: [{ required: true, message: '请输入票数!' }],
            })(
              <Input placeholder="input placeholder" />
            )}
          </FormItem>
          <FormItem
            label="热度"
            {...formItemLayout}
          >
            {getFieldDecorator('heatValue', {
              rules: [{ required: true, message: '请输入热度!' }],
            })(
              <Input placeholder="input placeholder" />
            )}
          </FormItem>
          <FormItem {...buttonItemLayout}>
            <Button htmlType="submit" type="primary">提交</Button>
          </FormItem>
        </Form>
      </div>
    )
    
  }
  
  
}
export default Form.create()(Product)

