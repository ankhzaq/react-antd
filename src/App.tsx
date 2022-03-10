import React from 'react';
import Filters from 'components/Filters';
import { Layout } from 'antd';
import Hammurabi from './screens/Hammurabi';

const { Content, Sider } = Layout;

function App() {
  return (
    <Layout className="site-layout-background width100 height100">
      <Sider className="site-layout-background" width={200}>
        <Filters filters={[
          {
            placeholder: "Basic usage"
          }
        ]} />
      </Sider>
      <Content>
        <Hammurabi />
      </Content>
    </Layout>
  );
}

export default App;
