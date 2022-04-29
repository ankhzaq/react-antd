import 'antd/dist/antd.css';

import { CapsuleStyled } from './style';

interface CapsuleProps {
  bgColor?: string;
  color?: string;
  label: string;
  padding?: string;
};

const defaultProps: CapsuleProps = {
  bgColor: 'black',
  color: 'white',
  label: 'capsule'
}

export const Capsule = (props = defaultProps) => {
  const { bgColor, color, label, padding } = props;
  return (
    <CapsuleStyled bgColor={bgColor} color={color} padding={padding}>{label}</CapsuleStyled>
  );
}
