import React, { Component, Suspense } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar.tsx";
import { Navigate, Route, Routes } from "react-router-dom";
import UsersContainer from "./components/Users/UsersContainer.tsx";
import HeaderContainer from "./components/Header/HeaderContainer.tsx";
import LoginPage from "./components/Login/Login.tsx";
import { connect, Provider } from "react-redux";
import { withRouter } from "./hoc/withRouter";
import { compose } from "redux";
import { initializeApp } from "./redux/app-reducer.ts";
import Preloader from "./components/common/Preloader/Preloader.tsx";
import store from "./redux/redux-store.ts";
import { BrowserRouter } from "react-router-dom";
import { AppStateType } from "./redux/redux-store";

const DialogsContainer = React.lazy(
  () => import("./components/Dialogs/DialogsContainer.tsx")
);
const ProfileContainer = React.lazy(
  () => import("./components/Profile/ProfileContainer.tsx")
);

type MapPropsType = ReturnType<typeof mapStateToProps>;
type DispatchPropsType = {
  initializeApp: () => void;
};

class App extends Component<MapPropsType & DispatchPropsType> {
  catchAllUnhandledErrors = (e: PromiseRejectionEvent) => {
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
              <Route
                path="/users"
                element={<UsersContainer pagetitle={"Name"} />}
              />
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

const mapStateToProps = (state: AppStateType) => ({
  initialized: state.app.initialized,
});

let AppContainer = compose<React.ComponentType>(
  withRouter,
  connect(mapStateToProps, { initializeApp })
)(App);

const MainApp: React.FC = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </BrowserRouter>
  );
};

export default MainApp;
