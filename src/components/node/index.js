import React, { Component } from 'react';
import { Grid } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledGrid = styled(Grid)(({ theme }) => ({
  width: '40px', 
  height:'40px', 
  border: '1px solid grey', 
  display: 'inline-block'
}));

/* a node represents a grid.*/
export default class Node extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

  render() {
    const { row, col, isStart, isDest, isWall, isVisited, previousNode, isInShortestPath } = this.props.node;

    return (
        <StyledGrid
          sx={{ 
            background: `${isStart ? 'green' : isDest ? 'red' : isInShortestPath ? 'yellow' : isVisited ? 'indigo' : 'none'}` 
          }} 
        />
    )
  }
}