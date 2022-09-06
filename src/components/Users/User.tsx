import React from 'react'
import s from './users.module.css'
import { NavLink } from 'react-router-dom'
import { UserType } from '../../types/types'
import { Avatar, Button, Typography } from 'antd'

type PropsType = {
  user: UserType
  followingInProgress: Array<number>
  unfollow: (userId: number) => void
  follow: (userId: number) => void
}

const User: React.FC<PropsType> = ({ user, followingInProgress, unfollow, follow }) => {
  const { Text } = Typography
  return (
    <div className={s.userBlock}>
      <div className={s.avatar}>
        <NavLink to={'./../profile/' + user.id}>
          {user.photos.small ? (
            <img src={user.photos.small} className={s.userPhoto} />
          ) : (
            <Avatar
              size={64}
              style={{
                fontSize: '30px',
                color: 'rgb(255, 255, 255)',
                backgroundColor: 'rgb(28, 38, 97)',
              }}>
              {user.name[0].toUpperCase()}
            </Avatar>
          )}
        </NavLink>
      </div>

      <span>
        <span className={s.information}>
          <Text strong>{user.name}</Text>
          <div>{user.status}</div>
          <div></div>
        </span>
      </span>
      <div className={s.buttons}>
        {user.followed ? (
          <Button
            disabled={followingInProgress.some((id) => id === user.id)}
            onClick={() => {
              unfollow(user.id)
            }}>
            Unfollow
          </Button>
        ) : (
          <Button
            disabled={followingInProgress.some((id) => id === user.id)}
            onClick={() => {
              follow(user.id)
            }}>
            Follow
          </Button>
        )}
      </div>
    </div>
  )
}

export default User
