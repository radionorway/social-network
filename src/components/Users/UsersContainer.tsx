import React from "react";
import { connect, useSelector } from "react-redux";
import { follow, unfollow, requestUsers } from "../../redux/users-reducer.ts";

import Preloader from "../common/Preloader/Preloader.tsx";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";
import {
  getCurrentPage,
  getFollowingInProgress,
  getIsFetching,
  getPageSize,
  getTotalUsersCount,
  getUsers,
} from "../../redux/users-selectors.ts";
import { UserType } from "../../types/types";
import { AppStateType } from "../../redux/redux-store";
import { FilterType } from "../../redux/users-reducer";
import { getUsersFilter } from "../../redux/users-selectors.ts";
import { Users } from "./Users.tsx";

type UsersPagePropsType = {
  pageTitle: string;
};

export const UsersPage: React.FC<UsersPagePropsType> = (props) => {
  const isFetching = useSelector(getIsFetching);
  return (
    <>
      {/* <h2>{props.pageTitle}</h2> */}
      {isFetching ? <Preloader /> : null}
      <Users />
    </>
  );
};
