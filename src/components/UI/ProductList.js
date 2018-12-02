import React, { Component } from 'react'
import { 
  Button,
  Input,
  Layout,
  Table,
  Spin,
  Row,
  Col,
  Icon,
  Breadcrumb,
  message,
  Popconfirm
 } from 'antd'
import { Link } from 'react-router-dom'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import { post, get } from '../../http/index'

Component.prototype.post = post
Component.prototype.get = get

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      record: [],
      size: 10,
      current: 1,
      keyword: '',
    };
  }
  UNSAFE_componentWillMount = () => {
    NProgress.start();
    this.fecthProjects()
  };

  componentDidMount = () => {
    NProgress.done();
  };

  fecthProjects = () => {
    this.post('vote/project/listProject').then(res => {
      // console.log(res.data)
      this.setState({
        record: res.data.map(r => ({
          ...r,
          key: r.projectId
        }))
      })

    })
  }

  onSearch = (e) => {
    this.setState({ keyword: e.target.value.trim() });
  }

  emitEmpty = () => {
    this.keywordInput.focus()
    this.setState({ keyword: '' })
  }

  deleteProject = (ev, record) => {
    this.post('vote/project/deleteProject', {projectId: record.projectId}).then(() => {
      message.success('删除项目成功')
      this.fecthProjects()
    })
  }

  render() {

    const { record, keyword } = this.state
    
    const columns = [{
      title: '产品编号',
      dataIndex: 'projectId',
      key: 'projectId',
    }, {
      title: '产品名称',
      dataIndex: 'projectName',
      key: 'projectName',
    }, {
      title: '人气',
      dataIndex: 'heatValue',
      key: 'heatValue',
    },{
      title: '票数',
      dataIndex: 'voteCount',
      key: 'voteCount',
    },{
      title: '操作',
      dataIndex: 'id_actions',
      render: (id, record) => {
        return (<div>
          <Link to={{ pathname: '/vote/product', search: "?id=" + record.projectId, params: record }}>详情</Link>
          <Popconfirm onConfirm={(ev) => this.deleteProject(ev, record)} title={'确认删除' + record.projectName + '吗？'} icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}>
            <a style={{ marginLeft: 20 }} href="#">删除</a>
          </Popconfirm>
        </div>)
      },
    },];

    const suffix = keyword ? <Icon type="close-circle" onClick={this.emitEmpty} /> : null
    const filterRecord = record.filter(r => r.projectName.indexOf(keyword) !== -1)

    return (
      <div style={{ margin:30 }}>
        <div className="product-list-page">
          <Breadcrumb>
            <Breadcrumb.Item href="">
              <Icon type="home" />
            </Breadcrumb.Item>
            <Breadcrumb.Item href="">
              <Icon type="credit-card" />
              <span>投票管理</span>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              产品列表
            </Breadcrumb.Item>
          </Breadcrumb>

          <div className="product-list-page-header">
            <Input
              style={{width: 300}}
              placeholder="搜索产品"
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              suffix={suffix}
              value={keyword}
              onChange={this.onSearch}
              ref={node => this.keywordInput = node}
            />
            <Link to={{ pathname: '/vote/newProduct'}}>
              <Button type="primary" style={{ margin: 20 }}>新增产品</Button>
            </Link>
          </div>
        </div>
        <Table dataSource={filterRecord} columns={columns} />

      </div>

    );
  }
}

export default ProductList;
