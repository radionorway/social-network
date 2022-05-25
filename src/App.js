import React, { Component, Suspense } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { Navigate, Route, Routes } from "react-router-dom";

import UsersContainer from "./components/Users/UsersContainer";

import HeaderContainer from "./components/Header/HeaderContainer";
import LoginPage from "./components/Login/Login";
import { connect, Provider } from "react-redux";
import { withRouter } from "./hoc/withRouter";
import { compose } from "redux";
import { initializeApp } from "./redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";
import store from "./redux/redux-store";
import { BrowserRouter } from "react-router-dom";

const DialogsContainer = React.lazy(() =>
  import("./components/Dialogs/DialogsContainer")
);
const ProfileContainer = React.lazy(() =>
  import("./components/Profile/ProfileContainer")
);

class App extends Component {
  catchAllUnhandledErrors = (reason, promise) => {
    alert("Some error occured");
  };
  componentDidMount() {
    this.props.initializeApp();
    window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors);
  }
  componentWillUnmount() {
    window.removeEventListener(
      "unhandledrejection",
      this.catchAllUnhandledErrors
    );
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader />;
    }
    return (
      <div className="app-wrapper">
        <HeaderContainer />
        <Navbar />
        <div className="app-wrapper-content">
          <Suspense fallback={<Preloader />}>
            <Routes>
              <Route path="/" element={<Navigate to={"/profile"} />} />
              <Route path="/dialogs/*" element={<DialogsContainer />} />
              <Route path="/profile/:userId" element={<ProfileContainer />} />
              <Route path="/users" element={<UsersContainer />} />
              <Route path="/profile" element={<ProfileContainer />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="*" element={<div>404 NOT FOUND</div>} />
            </Routes>
          </Suspense>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized,
});

let AppContainer = compose(
  withRouter,
  connect(mapStateToProps, { initializeApp })
)(App);

const MainApp = (props) => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </BrowserRouter>
  );
};

export default MainApp;
