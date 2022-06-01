import React from "react";
import Header from "./Header.tsx";
import { connect } from "react-redux";
import { logout } from "../../redux/auth-reducer.ts";
import { AppStateType } from "../../redux/redux-store";
import { MapPropsType, DispatchPropsType } from "./Header";

class HeaderContainer extends React.Component<
  MapPropsType & DispatchPropsType
> {
  render() {
    return <Header {...this.props} />;
  }
}
const mapStateToProps = (state: AppStateType) => ({
  isAuth: state.auth.isAuth,
  login: state.auth.login,
  logout: () => {},
});

export default connect<MapPropsType, DispatchPropsType, {}, AppStateType>(
  mapStateToProps,
  { logout }
)(HeaderContainer);
