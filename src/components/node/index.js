import React, { Component } from 'react';
import { Paper, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledGrid = styled(Paper)(({ theme }) => ({
  width: '25px', 
  height:'25px', 
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
    const { row, col, isStart, isDest, isWall, isVisited, isInShortestPath } = this.props.node;

    return (
        <>
          <Tooltip title={isStart ? 'Start Node' : isDest ? 'Destination Node' : isVisited ? 'Visited Node' : ''} >
            <StyledGrid
              sx={{ 
                background: `${isStart ? 'green' : isDest ? 'red' : isInShortestPath ? 'blue' : isVisited ? 'indigo' : 'none'}`,
                cursor: isStart ? 'pointer' : isDest ? 'pointer' : '',
              }} 
            /> 
          </Tooltip>
          
        </>
    )
  }
}