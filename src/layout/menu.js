// import logo from './logo.svg';
import "../App.css";
import { Menu } from "antd";
import { Link } from "react-router-dom";
// import { GlobalOutlined, BarChartOutlined } from "@ant-design/icons";

function MenuTop() {
  return (
    <Menu theme={"dark"} mode="horizontal">
      <Menu.Item key="mail" /* icon={<GlobalOutlined />} */>
        <Link to={"/maps"}>
          <span>Global Statistics</span>
        </Link>
      </Menu.Item>
      <Menu.Item key="app" /* icon={<BarChartOutlined />} */>
        <Link to={"/graphs"}>
          <span>Effected Countries</span>
        </Link>
      </Menu.Item>
      <Menu.Item key="countries_comparison" /* icon={<BarChartOutlined />} */>
        <Link to={"/countries-comparison"}>
          <span>Countries Comparison</span>
        </Link>
      </Menu.Item>
      <Menu.Item key="vaccination" /* icon={<BarChartOutlined />} */>
        <Link to={"/vaccination"}>
          <span>Vaccination</span>
        </Link>
      </Menu.Item>
      <Menu.Item key="comparison" /* icon={<BarChartOutlined />} */>
        <Link to={"/comparisons"}>
          <span>Pandemics Comparison</span>
        </Link>
      </Menu.Item>
      {/* <Menu.Item key="overall">
        <Link to={"/overall-summary"}>
          <span>COVID Overall Summary</span>
        </Link>
      </Menu.Item> */}
      <Menu.Item key="home" /* icon={<GlobalOutlined />} */>
        <Link to={"/home"}>
          <span>About</span>
        </Link>
      </Menu.Item>
      {/* <Menu.Item key="about" >
        <Link to={"/overall-summary"}>
          <span>About</span>
        </Link>
      </Menu.Item> */}
    </Menu>
  );
}

export default MenuTop;
