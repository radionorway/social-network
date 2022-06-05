import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FilterType, requestUsers } from "../../redux/users-reducer.ts";
import {
  getFollowingInProgress,
  getUsers,
  getUsersFilter,
} from "../../redux/users-selectors.ts";
import {
  getCurrentPage,
  getPageSize,
  getTotalUsersCount,
} from "../../redux/users-selectors.ts";
import { UserType } from "../../types/types";
import Paginator from "../common/Paginator/Paginator.tsx";
import User from "./User.tsx";
import { UsersSearchForm } from "./UsersSearchForm.tsx";

type PropsType = {};

export const Users: FC<PropsType> = (props) => {
  const users = useSelector(getUsers);
  const totalUsersCount = useSelector(getTotalUsersCount);
  const currentPage = useSelector(getCurrentPage);
  const pageSize = useSelector(getPageSize);
  const filter = useSelector(getUsersFilter);
  const followingInProgress = useSelector(getFollowingInProgress);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    navigate(
      `/developers/?term=${filter.term}&friends=${filter.friend}&page=${currentPage}`
    );
  }, [filter, currentPage]);

  useEffect(() => {
    dispatch(requestUsers(currentPage, pageSize, filter));
  }, []);

  const onPageChanged = (pageNumber: number) => {
    dispatch(requestUsers(pageNumber, pageSize, filter));
  };

  const onFilterChanged = (filter: FilterType) => {
    dispatch(requestUsers(1, pageSize, filter));
  };
  const follow = (userId: number) => {
    dispatch(follow(userId));
  };
  const unfollow = (userId: number) => {
    dispatch(unfollow(userId));
  };
  return (
    <div>
      <UsersSearchForm onFilterChanged={onFilterChanged} />
      <Paginator
        currentPage={currentPage}
        onPageChanged={onPageChanged}
        totalItemsCount={totalUsersCount}
        pageSize={pageSize}
      />
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
  );
};
