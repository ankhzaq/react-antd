import DataGrid from 'react-data-grid';
import styled from 'styled-components';

interface Props {
  height?: number;
  onCopy: any
}

export const PivotGridStyled = styled(DataGrid)<Props>`
  height: ${props => `${props.height}px`};
`;
