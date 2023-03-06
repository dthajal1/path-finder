import React, { Component } from 'react';
import { Grid, Button, Stack, Radio, Tooltip } from '@mui/material';
import Node from '../node';
import BFSAlgo from '../../algorithms/bfs';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import DFSAlgo from '../../algorithms/dfs';

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
            start: [],
            dest: [],

            isSnackbarOpen: false,

            speedType: 'medium',
            animationSpeed: 20,

        }
    }

    componentDidMount() {
        // initialize grids
        let [nodes, start, dest] = initializeGrids();
        this.setState({nodes, start, dest});
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
            }, this.state.animationSpeed * i );
        }
    }

    animate(visitedNodesInOrder, shortestPath) {
        for (let i = 0; i <= visitedNodesInOrder.length; i++) {
            if (i === visitedNodesInOrder.length) {
                // animate shortest path at the end
                setTimeout(() => {
                    this.animateShortestPath(shortestPath);
                }, this.state.animationSpeed * i );
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
                }, this.state.animationSpeed * i );
            }
        }
    }

    visualize(TYPE) {
        const { nodes, start, dest } = this.state;
        let startNode = nodes[start[0]][start[1]];
        let destNode = nodes[dest[0]][dest[1]];
        let visitedNodesInOrder;
        let pathToDest;
        switch (TYPE) {
            case BFS:
                [visitedNodesInOrder, pathToDest] = BFSAlgo(nodes, startNode, destNode);
                this.animate(visitedNodesInOrder, pathToDest);
                break;
            case DFS:
                [visitedNodesInOrder, pathToDest] = DFSAlgo(nodes, startNode, destNode);
                this.animate(visitedNodesInOrder, pathToDest);
                break;
            case DIJKSTRA:
            case ASTAR:
                this.setState({isSnackbarOpen: true});
                setTimeout(() => {
                    this.setState({isSnackbarOpen: false});
                }, 3000)
                break;
            default:
                break;
        }
    }

    resetGrid() {
        let [nodes, start, dest] = initializeGrids();
        this.setState({nodes, start, dest});
    }

    handleSpeedChange(e) {
        this.setState({speedType: e.target.value})
        switch (this.state.speedType) {
            case "slow":
                this.setState({animationSpeed: 100})
                break;
            case "medium":
                this.setState({animationSpeed: 20})
                break;
            case "fast":
                this.setState({animationSpeed: 5})
                break;
            default:
                break;
        }
    }

  render() {
    const { nodes } = this.state;

    const controlProps = (type) => ({
        checked: this.state.speedType === type,
        onChange: (e) => this.handleSpeedChange(e),
        value: type,
        name: 'size-radio-button-demo',
        inputProps: { 'aria-label': type },
    });

    return (
        <>
            <Snackbar open={this.state.isSnackbarOpen}>
                <Alert severity="warning" sx={{ width: '100%' }}>
                This algorithm hasn't been implemented yet. Stay tuned!
                </Alert>
            </Snackbar>

            <Grid container justifyContent='center' alignItems='center' mt="20px">
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
                <Tooltip title="Slow" placement="left">
                    <Radio {...controlProps('slow')} size="small" />
                </Tooltip>
                <Tooltip title="Medium">
                    <Radio {...controlProps('medium')} />
                </Tooltip>
                <Tooltip title="Fast" placement="right">
                    <Radio
                        {...controlProps('fast')}
                        sx={{
                        '& .MuiSvgIcon-root': {
                            fontSize: 28,
                        },
                        }}
                    />
                </Tooltip>
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
            <Grid container justifyContent='center' alignItems='center' padding='20px'>
                <Stack direction='row' spacing={2}>
                    <Button variant='contained' color='secondary' onClick={() => this.resetGrid()}>
                        Reset Grid
                    </Button>
                </Stack>
            </Grid>
        </>
    )
  }
}

const initializeGrids = () => {
    let nodes = [];
    let num_rows = (window.innerHeight / 25) * 0.5;
    let num_cols = (window.innerWidth / 25) * 0.8;
    let start = [getRandomInt(num_rows), getRandomInt(num_cols)]
    let dest = [getRandomInt(num_rows), getRandomInt(num_cols)]
    for (let row = 0; row < num_rows; row++) {
        let currentRow = [];
        for (let col = 0; col < num_cols; col++) {
            const isStart = start[0] === row && start[1] === col;
            const isDest = dest[0] === row && dest[1] === col;
            let newNode = { row, col, isStart, isDest, isWall:false, isVisited:false, isInShortestPath: false }
            currentRow.push(newNode);
        }
        nodes.push(currentRow);
    }
    return [nodes, start, dest];
}

// get an interger in range 0 to max (exclusive)
function getRandomInt(max) {
    max = Math.floor(max);
    return Math.floor(Math.random() * (max));
}

// Possible states for each node in the grid
// row, col => where in the grid I am
// isStart, isEnd => start and end nodes
