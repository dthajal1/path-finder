import React, { Component } from 'react';
import { Grid, Button } from '@mui/material';
import Node from '../node';
import BFSAlgo from '../../algorithms/bfs';
import { Stack } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const ANIMATION_SPEED = 10;
const BFS = 'BFS';
const DFS = 'DFS';
const DIJKSTRA = 'Dijkstra';
const ASTAR = 'Astar';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

export default class PathFinder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nodes: [],
            start: [4, 4],
            dest: [12, 12],
            isSnackbarOpen: false,
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
            if (i === visitedNodesInOrder.length) {
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

    visualize(TYPE) {
        const { nodes, start, dest } = this.state;
        let startNode = nodes[start[0]][start[1]];
        let destNode = nodes[dest[0]][dest[1]];
        switch (TYPE) {
            case BFS:
                let [visitedNodesInOrder, shortestPath] = BFSAlgo(nodes, startNode, destNode);
                this.animate(visitedNodesInOrder, shortestPath);
                break;
            case DFS:
            case DIJKSTRA:
            case ASTAR:
                this.setState({isSnackbarOpen: true});
                setTimeout(() => {
                    this.setState({isSnackbarOpen: false});
                }, 3000)
            default:
                break;
        }
    }

  render() {
    const { nodes } = this.state;

    return (
        <>
            <Snackbar open={this.state.isSnackbarOpen}>
                <Alert severity="warning" sx={{ width: '100%' }}>
                This algorithm hasn't been implemented yet. Stay tuned!
                </Alert>
            </Snackbar>

            <Grid container justifyContent='center' alignItems='center' padding='20px'>
                <Stack direction='row' spacing={2}>
                    <Button variant='contained' onClick={() => this.visualize(BFS)}>
                        BFS
                    </Button>
                    <Button variant='contained' onClick={() => this.visualize(DFS)}>
                        DFS
                    </Button>
                    <Button variant='contained' onClick={() => this.visualize(DIJKSTRA)}>
                        Dijkstra
                    </Button>
                    <Button variant='contained' onClick={() => this.visualize(ASTAR)}>
                        A*
                    </Button>
                </Stack>
            </Grid>
            <Grid container justifyContent='center' alignItems='center'>
                {nodes.map((row, rowIdx) => (
                    <div key={rowIdx}>
                        {row.map((node, nodeIdx) => {
                            return <Node key={nodeIdx} node={node}/>
                        })}
                    </div>
                ))}
            </Grid>
        </>
    )
  }
}

const initializeGrids = (start, dest) => {
    let nodes = [];
    let num_rows = window.innerHeight / 25;
    let num_cols = window.innerWidth / 25;
    for (let row = 0; row < num_rows * 0.6; row++) {
        let currentRow = [];
        for (let col = 0; col < num_cols * 0.8; col++) {
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
