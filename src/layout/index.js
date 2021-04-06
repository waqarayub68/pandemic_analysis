// import logo from './logo.svg';
import '../App.css';
import MenuTop from './menu'
import { BackTop, Layout } from 'antd';

// const { SubMenu } = Menu;

function IndexLayout() {
  // const {
  //   children,
  // } = this.props;
  return (
    
    <Layout >
      <BackTop />
      <MenuTop />
      {/* <Layout>
        <Layout.Content style={{ height: '100%', position: 'relative' }}>
          <div className="utils__content">{children}</div>
        </Layout.Content>

      </Layout> */}
    </Layout>
    
  );
}

export default IndexLayout;
