import { Button, Col, Layout, Row, Typography } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectIsAuth } from '../../redux/auth-selectors'
import { logout } from '../../redux/auth-reducer'
import s from './Header.module.css'

export const Header: React.FC = () => {
  const isAuth = useSelector(selectIsAuth)
  const dispatch = useDispatch()
  const logoutCallback = () => {
    dispatch(logout())
  }

  const { Header } = Layout
  const { Text } = Typography
  return (
    <Header className={s.header}>
      <Row>
        <Col span={21}>
          <img
            className={s.image}
            src='https://cdn0.iconfinder.com/data/icons/business-and-finance-colored-3/64/business-and-finance-colored-3-11-512.png'
          />
          <Text strong>
            <span className={s.title}>Social Network</span>
          </Text>
        </Col>

        {isAuth ? (
          <>
            <Col span={1}>
              <Button onClick={logoutCallback}>Log out</Button>
            </Col>
          </>
        ) : (
          <Col span={1}>
            <Button>
              <Link to={'/login'}>Login</Link>
            </Button>
          </Col>
        )}
      </Row>
    </Header>
  )
}
