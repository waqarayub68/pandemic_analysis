// import logo from './logo.svg';
import './App.css';
import IndexLayout from './layout/index';
// import { BackTop, Layout } from 'antd';
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import Loadable from 'react-loadable';
import Loader from './layout/loader';
// import Maps from './pages/maps';
const loadable = loader =>
  Loadable({
    loader,
    delay: false,
    loading: () => <Loader />,
  });


const routes = [
  {
    path: '/home',
    component: loadable(() => import('./pages/home')),
    exact: true,
  },
  {
    path: '/maps',
    component: loadable(() => import('./pages/maps')),
    exact: true,
  },
  {
    path: '/graphs',
    component: loadable(() => import('./pages/graphs')),
    exact: true,
  },

]

function App() {
  console.log(routes);
  return (
    <>
    
    <BrowserRouter>
      <IndexLayout />
      <Switch >
        <Route exact path="/" render={() => <Redirect to="/home" />} />
        {routes.map(route => (
          <Route path={route.path} component={route.component} key={route.path} exact={route.exact} />
        ))}
      </Switch>
    </BrowserRouter>
    {/* </IndexLayout> */}
    </>

  );
}

export default App;
