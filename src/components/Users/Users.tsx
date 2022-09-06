import { Spin } from 'antd'
import React, { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FilterType, requestUsers } from '../../redux/users-reducer'
import {
  getFollowingInProgress,
  getIsFetching,
  getUsers,
  getUsersFilter,
} from '../../redux/users-selectors'
import { getCurrentPage, getPageSize, getTotalUsersCount } from '../../redux/users-selectors'
import Paginator from '../common/Paginator/Paginator'
import User from './User'
import { UsersSearchForm } from './UsersSearchForm'
import s from './users.module.css'

export const UsersPage: FC = () => {
  const users = useSelector(getUsers)
  const totalUsersCount = useSelector(getTotalUsersCount)
  const currentPage = useSelector(getCurrentPage)
  const pageSize = useSelector(getPageSize)
  const filter = useSelector(getUsersFilter)
  const followingInProgress = useSelector(getFollowingInProgress)
  const isFetching = useSelector(getIsFetching)

  const dispatch = useDispatch()

  const navigate = useNavigate()

  useEffect(() => {
    navigate(`/developers/?term=${filter.term}&friends=${filter.friend}&page=${currentPage}`)
  }, [filter, currentPage])

  useEffect(() => {
    dispatch(requestUsers(currentPage, pageSize, filter))
  }, [])

  const onPageChanged = (pageNumber: number) => {
    dispatch(requestUsers(pageNumber, pageSize, filter))
  }

  const onFilterChanged = (filter: FilterType) => {
    dispatch(requestUsers(1, pageSize, filter))
  }
  const follow = (userId: number) => {
    dispatch(follow(userId))
  }
  const unfollow = (userId: number) => {
    dispatch(unfollow(userId))
  }
  return (
    <div>
      <UsersSearchForm onFilterChanged={onFilterChanged} />
      <div className={s.paginator}>
        <Paginator
          currentPage={currentPage}
          onPageChanged={onPageChanged}
          totalItemsCount={totalUsersCount}
          pageSize={pageSize}
        />
      </div>
      <div className={s.preloader}>{isFetching ? <Spin size='large' /> : null}</div>
      <div>
        {users.map((u) => (
          <User
            user={u}
            followingInProgress={followingInProgress}
            key={u.id}
            unfollow={unfollow}
            follow={follow}
          />
        ))}
      </div>
    </div>
  )
}
