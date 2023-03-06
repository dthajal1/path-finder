import { getAllNeighbors } from "../utils";

/* Depth First Search Algorithm. 
    Returns visited nodes in order along with the path taken to reach the destNode.
    The path returned by DFS is not guranteed to be the shortest path. 
*/
export default function DFSAlgo(grid, startNode, destNode) {
    let stack = []; // LIFO
    let visited =  [];
    // keep track of path taken to the node along with the node itself
    stack.push([startNode, [startNode]]);

    while (stack.length > 0) {
        // pop end of stack
        let [currNode, pathToCurr] = stack.pop();
        // terminate after finding destination node
        if (currNode === destNode) {
            visited.push(currNode);
            let pathToDest = pathToCurr.slice();
            pathToDest.push(destNode);
            return [visited, pathToDest];
        }
        // do nothing if already visited
        if (visited.includes(currNode)) continue;
        // mark currrent node as visited
        visited.push(currNode);
        // add all currNode's neighbors to the stack
        let allNeighbors = getAllNeighbors(currNode, grid);
        for (const neighbor of allNeighbors) {
            let pathToNeighbor = pathToCurr.slice();
            pathToNeighbor.push(neighbor);
            stack.push([neighbor, pathToNeighbor]);
        }
    }
    return [visited, []];
}