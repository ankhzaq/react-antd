import styled from 'styled-components';

interface Props {
  bgColor?: string;
  color?: string;
}

export const FiltersStyled = styled.span<Props>`
  color: ${({ color }) => `${color}`};
  background-color: ${({ bgColor }) => `${bgColor}`};
  border-radius: 5px;
  font-weight: 500;
  margin: 2px;
  padding: 5px 10px;
`;
