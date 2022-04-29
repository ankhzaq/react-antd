import { useSelector } from 'react-redux';
import { Button, Dropdown, Menu } from 'antd';

import styled from 'styled-components';

import { Capsule } from '../Capsule/Capsule';
import { COLORS } from '../../helpers/consts';

const { Item } = Menu;

const DivRule = styled.div`
  padding: 5px 0px;
`;

const BolderRule = styled.span`
  font-weight: bold;
  padding: 0px 3px;
`;

const RulesGuide = () => {

  const { data } = useSelector((state: any) => state.common.rules);

  console.log("data: ", data);

  const menu = (
    <Menu theme="dark" style={{ width: '800px' }}>
      <Item>
        {data.map((rule: any) => {
          const { principleType, principleDesc, ruleType, ruleTypeShortDesc, ruleMvpType } = rule;
          const ruleKey = `${principleType}.${ruleType}`;
          const bgColor = ruleMvpType ? COLORS.GREEN : COLORS.YELLOW;
          return (
            <DivRule>
              <Capsule bgColor={bgColor} color='black' label={ruleKey} padding='4px 2px' />
              <BolderRule>Principle: </BolderRule>
              <span>{principleDesc}</span>
              <BolderRule>Type: </BolderRule>
              <span>{ruleTypeShortDesc}</span>
            </DivRule>
          )
        })}
      </Item>
    </Menu>
  );

  console.log("data: ", data);

  return (
    <Dropdown overlay={menu} placement="bottom" arrow>
      <Button>Rules guide</Button>
    </Dropdown>
  );
}
export default RulesGuide;
