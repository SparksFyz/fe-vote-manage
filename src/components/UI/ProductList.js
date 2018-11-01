import React, { Component } from "react";
import { 
  Button,
  Layout,
  Table,
  Spin,
  Row,
  Col,
  Icon,
  Breadcrumb
 } from "antd";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { Link } from "react-router-dom";
const { Content } = Layout;
const ButtonGroup = Button.Group;
class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      record: {},
      size: 10,
      current: 1,
    };
  }
  componentWillMount = () => {
    NProgress.start();
  };
  componentDidMount = () => {
    NProgress.done();
  };

  render() {
    const dataSource = [{
      key: '1',
      productName: '美罗',
      id: 32,
      hot: '10184',
      voteNum:'5317'
    }, {
      key: '1',
      productName: '安发',
      id: 32,
      hot: '10184',
      voteNum:'5317'
    }];
    
    const columns = [{
      title: '产品编号',
      dataIndex: 'id',
      key: 'id',
    }, {
      title: '产品名称',
      dataIndex: 'productName',
      key: 'productName',
    }, {
      title: '人气',
      dataIndex: 'hot',
      key: 'hot',
    },{
      title: '票数',
      dataIndex: 'voteNum',
      key: 'voteNum',
    },{
      title: '操作',
      dataIndex: 'id_actions',
      render: (id, record) => {
        // return <span style={{ color:'#1890ff' }} onClick={() => { this.modifyItem(record); }}>详情</span>;
        return <Link to={`/vote/pageination`}>详情</Link>;
      },
    },];
    return (
      <div style={{ margin:30 }}>
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
        <Table dataSource={dataSource} columns={columns} />

      </div>

    );
  }
}

export default ProductList;
