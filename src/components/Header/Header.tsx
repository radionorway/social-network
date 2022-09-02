import { Avatar, Button, Col, Layout, Row, Typography } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getProfilePhoto, selectIsAuth } from '../../redux/auth-selectors'
import { selectCurrentUserLogin } from '../../redux/auth-selectors'
import { logout } from '../../redux/auth-reducer'
import s from './Header.module.css'
import { NavLink } from 'react-router-dom'

export const Header: React.FC = () => {
  const isAuth = useSelector(selectIsAuth)
  const login = useSelector(selectCurrentUserLogin)
  const small = useSelector(getProfilePhoto)
  const dispatch = useDispatch()
  const logoutCallback = () => {
    dispatch(logout())
  }

  const { Header } = Layout
  const { Text } = Typography

  debugger
  return (
    <Header>
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
              <NavLink to={'/profile'}>
                <Avatar
                  alt={login || ''}
                  style={{ border: '2px solid #e7e8ec' }}
                  src={small}
                  size={'large'}
                />
              </NavLink>
            </Col>
            <Col span={1}>
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
  )
}
