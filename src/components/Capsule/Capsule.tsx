import 'antd/dist/antd.css';

import { CapsuleStyled } from './style';

interface CapsuleProps {
  bgColor?: string;
  color?: string;
  label: string
};

const defaultProps: CapsuleProps = {
  bgColor: 'black',
  color: 'white',
  label: 'capsule'
}

export const Capsule = (props = defaultProps) => {
  const { bgColor, color, label } = props;
  return (
    <CapsuleStyled bgColor={bgColor} color={color}>{label}</CapsuleStyled>
  );
}
