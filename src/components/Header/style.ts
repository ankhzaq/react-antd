import styled from 'styled-components';
import { spaces } from '../../helpers/consts'
export const HeaderStyled = styled.div`
  align-items: center;
  border-bottom: 1px solid lightgray;
  display: flex;
  button {
    margin-right: ${() => `${spaces.standard}px;`}
  }
  {
    font-size: 30px;
  }
  padding: ${() => `${spaces.header}px;`}
`;
