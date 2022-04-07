import React from 'react';
import styled from 'styled-components';
import { Button } from 'antd';


interface FilterFooterProps {
  onClearClick: () => void;
  onFilterClick: () => void;
};


const defaultProps: FilterFooterProps = {
  onClearClick: () => {},
  onFilterClick: () => {}
}

const DivStyled = styled.div`
  position: absolute;
  bottom: 5px;
  justify-content: space-between;
  padding: 0px 10px;
`;

const FooterFilter = (props = defaultProps) => {
  const { onClearClick, onFilterClick }  = props;
  return (
    <DivStyled className="flex-row width100">
      <Button onClick={onClearClick}>Clear</Button>
      <Button onClick={onFilterClick}>Filter</Button>
    </DivStyled>)
};

export default FooterFilter;
