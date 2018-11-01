import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Menu, Icon } from "antd";
import "../App.css";
const SubMenu = Menu.SubMenu;
class Nav extends Component {
  state = {
    theme: "dark",
    current: "",
    open: ""
  };
  changeTheme = value => {
    this.setState({
      theme: value ? "dark" : "light"
    });
  };
  componentDidMount = () => {
    /**
         * @param 获取url 设置当前Select Menu
         */
    let url = window.location.href;
    const selected = url.replace(
      url.substr(0, url.indexOf("/", url.indexOf("://", 0) + 3)).toString(),
      ""
    );
    let Open = selected.substring(
      0,
      selected.indexOf("/", selected.indexOf("/") + 1)
    );
    this.setState({
      open: Open === "" ? "/vote" : Open,
      current: selected === "/" ? "/vote/list" : selected
    });
  };
  openMenu = data => {
    this.setState({
      open: data[data.length - 1]
    });
  };
  handleClick = e => {
    console.log(e);
    this.setState({
      current: e.key
    });
  };
  render() {
    return (
      <Menu
        theme={this.state.theme}
        onClick={this.handleClick}
        style={{ width: "100%" }}
        selectedKeys={[this.state.current]}
        openKeys={[this.state.open]}
        onOpenChange={this.openMenu}
        mode="inline"
      >
        <SubMenu
          key="/vote"
          title={
            <span>
              <Icon type="credit-card" />
              <span>投票管理</span>
            </span>
          }
        >
          <Menu.Item key="/vote/list">
            <Link to={`/vote/list`}>产品列表</Link>
          </Menu.Item>
          <Menu.Item key="/vote/icons">
            <Link to={`/vote/icons`}>活动规则编辑</Link>
          </Menu.Item>
          {/* <Menu.Item key="/vote/dropdown">
            <Link to={`/vote/dropdown`}>dropdown</Link>
          </Menu.Item>
          <Menu.Item key="/vote/pageination">
          <Link to={`/vote/pageination`}>pageination</Link>
        </Menu.Item> */}
        </SubMenu>
        <SubMenu
          key={`/Layout`}
          title={
            <span><Icon type="credit-card"/><span>全局设置</span></span>
          }>
          <Menu.Item>
            <Link to={`/layout/grid`}>Grid</Link>
          </Menu.Item>
        </SubMenu>
      </Menu>
    );
  }
}
export default Nav;
