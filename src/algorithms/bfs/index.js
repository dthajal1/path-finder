import { getAllNeighbors } from "../utils";

/* Breadth First Search Algorithm. 
    Returns visited nodes in order along with the path taken to reach the destNode.
    The path returned by BFS is guranteed to be the shortest path. 
*/
export default function BFSAlgo(grid, startNode, destNode) {
    let queue = []; // FIFO
    let visited =  [];
    // keep track of path taken to the node along with the node itself
    queue.push([startNode, [startNode]]);

    while (queue.length > 0) {
        // pop front of queue
        let [currNode, pathToCurr] = queue.shift();
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
        // add all currNode's neighbors to the queue
        let allNeighbors = getAllNeighbors(currNode, grid);
        for (const neighbor of allNeighbors) {
            let pathToNeighbor = pathToCurr.slice();
            pathToNeighbor.push(neighbor);
            queue.push([neighbor, pathToNeighbor]);
        }
    }
    return [visited, []];
}