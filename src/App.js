// import logo from './logo.svg';
import "./App.css";
import IndexLayout from "./layout/index";
// import { BackTop, Layout } from 'antd';
import { Route, BrowserRouter, Switch, Redirect } from "react-router-dom";
import Loadable from "react-loadable";
import Loader from "./layout/loader";
import Footer from "./pages/footer";
// import Maps from './pages/maps';
const loadable = (loader) =>
  Loadable({
    loader,
    delay: false,
    loading: () => <Loader />,
  });

const routes = [
  {
    path: "/home",
    component: loadable(() => import("./pages/home")),
    exact: true,
  },
  {
    path: "/maps",
    component: loadable(() => import("./pages/maps")),
    exact: true,
  },
  {
    path: "/graphs",
    component: loadable(() => import("./pages/graphs")),
    exact: true,
  },
  {
    path: "/comparisons",
    component: loadable(() => import("./pages/comparison")),
    exact: true,
  },
];

function App() {
  return (
    <>
      <BrowserRouter>
        <IndexLayout />
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/home" />} />
          {routes.map((route) => (
            <Route
              path={route.path}
              component={route.component}
              key={route.path}
              exact={route.exact}
            />
          ))}
        </Switch>
      </BrowserRouter>
      <Footer />
      {/* </IndexLayout> */}
    </>
  );
}

export default App;
