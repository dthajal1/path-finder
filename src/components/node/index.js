import React, { Component } from 'react';
import { Grid } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledGrid = styled(Grid)(({ theme }) => ({
  width: '40px', 
  height:'40px', 
  border: '1px solid grey', 
  display: 'inline-block'
}));

export default class Node extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

  render() {
    const { row, col, isStart, isEnd } = this.props;

    return (
      <StyledGrid sx={{ background: `${isStart ? 'green' : isEnd ? 'red' : 'none'}` }} >
      </StyledGrid>
    )
  }
}