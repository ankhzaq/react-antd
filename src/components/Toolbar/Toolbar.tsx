import 'antd/dist/antd.css';

import { ToolbarStyled } from './style';

interface ToolbarProps {
  children?: any
};

const defaultProps: ToolbarProps = {}

export const Toolbar = (props = defaultProps) => {
  const { children } = props;
  return (
    <ToolbarStyled>
      {children}
    </ToolbarStyled>
  );
}
