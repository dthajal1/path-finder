import React, { Component } from 'react';
import { Grid } from '@mui/material';
import Node from '../node';

export default class PathFinder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nodes: [],
            start: [3, 3],
            end: [5, 5]
        }
    }

    componentDidMount() {
        // initialize grids
        let nodes = [];
        for (let row = 0; row < 15; row++) {
            let currentRow = [];
            for (let col = 0; col < 30; col++) {
                currentRow.push({row, col});
            }
            nodes.push(currentRow);
        }
        this.setState({nodes})
    }

  render() {
    const { nodes } = this.state;

    return (
      <Grid container justifyContent='center' alignItems='center'>
        {nodes.map((row, rowIdx) => (
            <div key={rowIdx}>
                {row.map((node, nodeIdx) => {
                    // destructure node states
                    const { row, col } = node;
                    const { start, end } = this.state;
                    const isStart = start[0] == row && start[1] == col;
                    const isEnd = end[0] == row && end[1] == col;

                    return <Node key={nodeIdx} row={row} col={col} isStart={isStart} isEnd={isEnd} />
                })}
            </div>
        ))}
      </Grid>
    )
  }
}

// Possible states for each node in the grid
// row, col => where in the grid I am
// isStart, isEnd => start and end nodes
