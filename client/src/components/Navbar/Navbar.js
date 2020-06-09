import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Affix, Menu, Drawer, Typography } from 'antd';
import { UpOutlined, MenuOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { logoutUser } from '../../actions/authActions';

import './styles.css';

const { Title } = Typography;

const UnauthenticatedNavbar = () => {
  const [visible, setVisible] = useState(false);
  const showDrawer = () => setVisible(true);
  const closeDrawer = () => setVisible(false);

  return (
    <Affix offsetTop={2}>
      <nav className="menu">
        <div className="menu__logo">
          <Link to="/" className="menu-name">
            Planet Code
          </Link>
        </div>
        <div className="menu__container">
          <div className="menu_left">{/* Left Menu */}</div>
          <div className="menu_right">
            {/* Right Menu */}
            <Menu mode="horizontal">
              <Menu.Item key="log-in" className="menu-no-hover">
                <Link to="/login" className="menu-text">
                  Log in
                </Link>
              </Menu.Item>
              <Menu.Item key="register" className="menu-no-hover">
                <Link to="/register" className="menu-text">
                  Sign up
                </Link>
              </Menu.Item>
            </Menu>
          </div>
          <Button
            className="menu__mobile-button"
            type="primary"
            onClick={showDrawer}
          >
            <MenuOutlined />
          </Button>
          <Drawer
            height={400}
            drawerStyle={{ height: '200%' }}
            placement="top"
            closable={false}
            onClose={closeDrawer}
            visible={visible}
            title={
              <div style={{ width: '100%', textAlign: 'center' }}>
                <UpOutlined
                  style={{ display: 'inline-block' }}
                  onClick={closeDrawer}
                />
              </div>
            }
          >
            <div className="drawer-label">
              <Button type="link">
                <Link to="/register">
                  <Title level={3}>Sign Up</Title>
                </Link>
              </Button>
            </div>
            <div className="drawer-label">
              <Button type="link">
                <Link to="/login">
                  <Title level={3}>Login</Title>
                </Link>
              </Button>
            </div>
          </Drawer>
        </div>
      </nav>
    </Affix>
  );
};

const AuthenticatedNavbar = () => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const showDrawer = () => setVisible(true);
  const closeDrawer = () => setVisible(false);

  return (
    <Affix offsetTop={2}>
      <nav className="menu">
        <div className="menu__logo">
          <Link to="/" className="menu-name">
            Planet Code
          </Link>
        </div>
        <div className="menu__container">
          <div className="menu_left">
            {/* Left Menu */}
            <Menu mode="horizontal">
              <Menu.Item key="editor" className="menu-no-hover">
                <Link to="/practice" className="menu-text">
                  Practice
                </Link>
              </Menu.Item>
            </Menu>
          </div>
          <div className="menu_right">
            {/* Right Menu */}
            <Menu mode="horizontal">
              <Menu.Item key="log-in" className="menu-no-hover">
                <Link to="/dashboard" className="menu-text">
                  Dashboard
                </Link>
              </Menu.Item>
              <Menu.Item key="register" className="menu-no-hover">
                <Link
                  onClick={() => dispatch(logoutUser())}
                  className="menu-text"
                >
                  Logout
                </Link>
              </Menu.Item>
            </Menu>
          </div>
          <Button
            className="menu__mobile-button"
            type="primary"
            onClick={showDrawer}
          >
            <MenuOutlined />
          </Button>
          <Drawer
            height={400}
            drawerStyle={{ height: '200%' }}
            placement="top"
            closable={false}
            onClose={closeDrawer}
            visible={visible}
            title={
              <div style={{ width: '100%', textAlign: 'center' }}>
                <UpOutlined
                  style={{ display: 'inline-block' }}
                  onClick={closeDrawer}
                />
              </div>
            }
          >
            <div className="drawer-label">
              <Button type="link">
                <Link to="/register">
                  <Title level={3}>Sign Up</Title>
                </Link>
              </Button>
            </div>
            <div className="drawer-label">
              <Button type="link">
                <Link to="/login">
                  <Title level={3}>Login</Title>
                </Link>
              </Button>
            </div>
          </Drawer>
        </div>
      </nav>
    </Affix>
  );
};

const Navbar = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (isAuthenticated) return <AuthenticatedNavbar />;
  return <UnauthenticatedNavbar />;
};

export default Navbar;
