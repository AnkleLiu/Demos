import React, { Component } from 'react'
import { Menu, Icon, Form, Row, Col, Input } from 'antd';
import './Navbar.css'

const FormItem = Form.Item

class Navbar extends Component {
  state = {
    current: 'index',
  }
  handleClick = (e) => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  }
  render() {
    return (
      <div>
        <Row>
          <Col span={12}>
            <Form layout="inline">
              <FormItem>
                <Input placeholder="没做搜索" />
              </FormItem>
            </Form>
          </Col>
          <Col span={12}>
            <Menu
              onClick={this.handleClick}
              selectedKeys={[this.state.current]}
              mode="horizontal"
            >

              <Menu.Item key="login">
                <Icon type="appstore" />登录
              </Menu.Item>

              <Menu.Item key="register">
                <Icon type="link" />注册
              </Menu.Item>

              <Menu.Item key="blogpost">
                <Icon type="plus-circle" />写博客
              </Menu.Item>
              
              <Menu.Item key="yourself">
                <a href="" rel="noopener noreferrer"><Icon type="user" />个人中心</a>
              </Menu.Item>

            </Menu>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Navbar