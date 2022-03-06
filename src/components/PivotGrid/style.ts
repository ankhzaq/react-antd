import DataGrid from 'react-data-grid';
import styled from 'styled-components';

interface Props {
  height?: number;
}

export const PivotGridStyled = styled(DataGrid)<Props>`
  height: ${props => `${props.height}px`};
  .filter-cell {
    line-height: 35px;
    padding: 0;
    > div {
      padding-block: 0;
      padding-inline: 8px;
      &:first-child {
        border-block-end: 1px solid var(--rdg-border-color);
      }
    }
  }
`;
