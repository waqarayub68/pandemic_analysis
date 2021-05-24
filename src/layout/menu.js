// import logo from './logo.svg';
import "../App.css";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import { GlobalOutlined, BarChartOutlined } from "@ant-design/icons";

function MenuTop() {
  return (
    <Menu theme={"dark"} mode="horizontal">
      {/* <Menu.Item key="home" icon={<GlobalOutlined />}>
        <Link to={"/home"}>
          <span>Home</span>
        </Link>
      </Menu.Item> */}
      <Menu.Item key="mail" icon={<GlobalOutlined />}>
        <Link to={"/maps"}>
          <span>Geographical Presentation</span>
        </Link>
      </Menu.Item>
      <Menu.Item key="app" icon={<BarChartOutlined />}>
        <Link to={"/graphs"}>
          <span>Effected Countries</span>
        </Link>
      </Menu.Item>
      <Menu.Item key="countries_comparison" icon={<BarChartOutlined />}>
        <Link to={"/countries-comparison"}>
          <span>Comparison Between Countries</span>
        </Link>
      </Menu.Item>
      <Menu.Item key="comparison" icon={<BarChartOutlined />}>
        <Link to={"/comparisons"}>
          <span>Comparison with Pandemics</span>
        </Link>
      </Menu.Item>
      <Menu.Item key="overall" icon={<GlobalOutlined />}>
        <Link to={"/overall-summary"}>
          <span>COVID Overall Summary</span>
        </Link>
      </Menu.Item>
    </Menu>
  );
}

export default MenuTop;
