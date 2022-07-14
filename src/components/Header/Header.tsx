import { Avatar, Button, Col, Layout, Menu, Row } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsAuth } from '../../redux/auth-selectors';
import { selectCurrentUserLogin } from '../../redux/auth-selectors';
import { logout } from '../../redux/auth-reducer';

export type MapPropsType = {};

export const Header: React.FC<MapPropsType> = (props) => {
  const isAuth = useSelector(selectIsAuth);
  const login = useSelector(selectCurrentUserLogin);
  const dispatch = useDispatch();
  const logoutCallback = () => {
    dispatch(logout());
  };

  const { Header } = Layout;

  return (
    <Header className="header">
      <Row>
        <Col span={18}>
          <img
            style={{ width: '40px' }}
            src="https://cdn0.iconfinder.com/data/icons/business-and-finance-colored-3/64/business-and-finance-colored-3-11-512.png"
          />
        </Col>

        {isAuth ? (
          <>
            <Col span={6}>
              <Button onClick={logoutCallback}>Log out</Button>
            </Col>
          </>
        ) : (
          <Col span={6}>
            <Button>
              <Link to={'/login'}>Login</Link>
            </Button>
          </Col>
        )}
      </Row>
    </Header>
  );
};
