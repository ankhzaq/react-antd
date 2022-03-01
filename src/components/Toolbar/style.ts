import styled from 'styled-components';
import { spaces } from '../../helpers/consts'
export const ToolbarStyled = styled.div`
  align-items: center;
  border-bottom: 1px solid lightgray;
  display: flex;
  padding: ${() => `${spaces.standard}px;`}
`;
