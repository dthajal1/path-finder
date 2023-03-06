import React, { Component } from 'react';
import { Grid, Button, Box, TextField } from '@mui/material';
import Node from '../node';
import BFS from '../../algorithms/bfs';

const ANIMATION_SPEED = 10;
const ariaLabel = { 'aria-label': 'description' };


export default class PathFinder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nodes: [],
            start: [4, 4],
            dest: [12, 12],
        }
    }

    componentDidMount() {
        // initialize grids
        let { start, dest } = this.state;
        let nodes = initializeGrids(start, dest);
        this.setState({nodes});
    }

    animateShortestPath(shortestPath) {
        for (let i = 0; i < shortestPath.length; i++) {
            setTimeout(() => {
                let newNodes = this.state.nodes.slice();
                let currNode = shortestPath[i];
                let newVisitedNode = {
                    ...currNode, 
                    isInShortestPath: true
                };
                newNodes[currNode.row][currNode.col] = newVisitedNode;
                this.setState({nodes: newNodes});
            }, ANIMATION_SPEED * i);
        }
    }

    animate(visitedNodesInOrder, shortestPath) {
        for (let i = 0; i <= visitedNodesInOrder.length; i++) {
            if (i == visitedNodesInOrder.length) {
                // animate shortest path at the end
                setTimeout(() => {
                    this.animateShortestPath(shortestPath);
                }, ANIMATION_SPEED * i);
            } else {
                // animate algorithm
                setTimeout(() => {
                    let newNodes = this.state.nodes.slice();
                    let currNode = visitedNodesInOrder[i];
                    let newVisitedNode = {
                        ...currNode, 
                        isVisited: true
                    };
                    newNodes[currNode.row][currNode.col] = newVisitedNode;
                    this.setState({nodes: newNodes});
                }, ANIMATION_SPEED * i);
            }
        }
    }

    visualize() {
        const { nodes, start, dest } = this.state;
        let startNode = nodes[start[0]][start[1]];
        let destNode = nodes[dest[0]][dest[1]];
        let [visitedNodesInOrder, shortestPath] = BFS(nodes, startNode, destNode);
        this.animate(visitedNodesInOrder, shortestPath);
    }

  render() {
    const { nodes } = this.state;

    return (
        <>
            <Grid container justifyContent='center' alignItems='center'>
                {nodes.map((row, rowIdx) => (
                    <div key={rowIdx}>
                        {row.map((node, nodeIdx) => {
                            return <Node key={nodeIdx} node={node}/>
                        })}
                    </div>
                ))}
            </Grid>
            <Box textAlign='center'>
                <Button variant='contained' onClick={() => this.visualize()}>
                    Visualize
                </Button>
            </Box>
        </>
    )
  }
}

const initializeGrids = (start, dest) => {
    let nodes = [];
    for (let row = 0; row < 13; row++) {
        let currentRow = [];
        for (let col = 0; col < 30; col++) {
            const isStart = start[0] === row && start[1] === col;
            const isDest = dest[0] === row && dest[1] === col;
            let newNode = { row, col, isStart, isDest, isWall:false, isVisited:false, isInShortestPath: false }
            currentRow.push(newNode);
        }
        nodes.push(currentRow);
    }
    return nodes;
}

// Possible states for each node in the grid
// row, col => where in the grid I am
// isStart, isEnd => start and end nodes
