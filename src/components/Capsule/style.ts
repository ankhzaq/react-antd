import styled from 'styled-components';

interface Props {
  bgColor?: string;
  color?: string;
  padding?: string;
}

export const CapsuleStyled = styled.span<Props>`
  color: ${({ color }) => `${color}`};
  background-color: ${({ bgColor }) => `${bgColor}`};
  border-radius: 5px;
  font-weight: bolder;
  margin: 2px;
  padding: ${({ padding }) => padding ? `${padding}` : `0px 3px`};
  font-size: 11px;
`;
