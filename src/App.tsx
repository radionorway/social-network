import React, { Component, Suspense } from 'react';
import './App.css';
import 'antd/dist/antd.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { connect, Provider } from 'react-redux';
import { withRouter } from './hoc/withRouter';
import { compose } from 'redux';
import { initializeApp } from './redux/app-reducer';
import Preloader from './components/common/Preloader/Preloader';
import store from './redux/redux-store';

import { AppStateType } from './redux/redux-store';
import { UsersPage } from './components/Users/UsersContainer';
import { LoginPage } from './components/Login/LoginPage';
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Header } from './components/Header/Header';

const { SubMenu } = Menu;
const { Content, Footer, Sider } = Layout;

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
const ChatPage = React.lazy(() => import('./pages/Chat/ChatPage'));

type MapPropsType = ReturnType<typeof mapStateToProps>;
type DispatchPropsType = {
  initializeApp: () => void;
};

class App extends Component<MapPropsType & DispatchPropsType> {
  catchAllUnhandledErrors = (e: PromiseRejectionEvent) => {
    alert('Some error occured');
  };
  componentDidMount() {
    this.props.initializeApp();
    window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors);
  }
  componentWillUnmount() {
    window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors);
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader />;
    }

    return (
      <Layout>
        <Header />
        <Content style={{ padding: '0 50px' }}>
          <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
            <Sider className="site-layout-background" width={200}>
              <Menu mode="inline" style={{ height: '100%' }}>
                <SubMenu key="sub1" icon={<UserOutlined />} title="Profiles">
                  <Menu.Item key="1">
                    <Link to="/profile">My profile</Link>
                  </Menu.Item>
                  <Menu.Item key="2">
                    <Link to="/developers">Users</Link>
                  </Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" icon={<LaptopOutlined />} title="Messages">
                  <Menu.Item key="3">
                    <Link to="/dialogs">Direct messages</Link>
                  </Menu.Item>
                  <Menu.Item key="4">
                    <Link to="/chat">Chat</Link>
                  </Menu.Item>
                </SubMenu>
              </Menu>
            </Sider>
            <Content style={{ padding: '0 24px', minHeight: 280 }}>
              <Suspense fallback={<Preloader />}>
                <Routes>
                  <Route path="/" element={<Navigate to={'/profile'} />} />
                  <Route path="/dialogs/*" element={<DialogsContainer />} />
                  <Route path="/profile/:userId" element={<ProfileContainer />} />
                  <Route path="/developers" element={<UsersPage />} />
                  <Route path="/profile" element={<ProfileContainer />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/chat" element={<ChatPage />} />
                  <Route path="*" element={<div>404 NOT FOUND</div>} />
                </Routes>
              </Suspense>
            </Content>
          </Layout>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Social Network</Footer>
      </Layout>
    );
  }
}

const mapStateToProps = (state: AppStateType) => ({
  initialized: state.app.initialized,
});

let AppContainer = compose<React.ComponentType>(
  withRouter,
  connect(mapStateToProps, { initializeApp }),
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
