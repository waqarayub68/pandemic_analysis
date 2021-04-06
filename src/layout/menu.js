// import logo from './logo.svg';
import '../App.css';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { GlobalOutlined, BarChartOutlined } from '@ant-design/icons';



function MenuTop() {
  return (
    
    <Menu theme={'dark'} mode="horizontal">
      <Menu.Item key="home" icon={<GlobalOutlined />}>
        <Link to={'/home'}>
          <span >Home</span>
        </Link>
      </Menu.Item>
      <Menu.Item key="mail" icon={<GlobalOutlined />}>
        <Link to={'/maps'}>
          <span >Maps</span>
        </Link>
      </Menu.Item>
      <Menu.Item key="app" icon={<BarChartOutlined />}>
        <Link to={'/graphs'}>
          <span >Graphs</span>
        </Link>
      </Menu.Item>

    </Menu>
  );
}

export default MenuTop;
