/* Bread First Search Algorithm. Returns visited nodes in order. */
export default function BFS(grid, startNode, destNode) {

    let queue = []; // FIFO
    let visited =  [];
    queue.push(startNode);

    while (queue.length > 0) {
        // pop front of queue
        let currNode = queue.shift();

        // terminate after finding destination node
        if (currNode === destNode) {
            visited.push(currNode);
            return visited;
        }
        // do nothing if already visited
        if (visited.includes(currNode)) continue;
        // mark currrent node as visited
        visited.push(currNode);
        // add all currNode's neighbors to the queue
        // update previous node
        let allNeighbors = getAllNeighbors(currNode, grid);
        for (const neighbor of allNeighbors) {
            neighbor.previousNode = currNode;
            queue.push(neighbor);
        }
    }
    return visited;
}

function getAllNeighbors(currNode, grid) {
    let allNeighbors = [];
    let currRow = currNode.row;
    let currCol = currNode.col;

    if (currRow > 0) allNeighbors.push(grid[currRow - 1][currCol]);
    if (currRow < grid.length - 1) allNeighbors.push(grid[currRow + 1][currCol]);
    if (currCol > 0) allNeighbors.push(grid[currRow][currCol - 1]);
    if (currCol < grid[0].length - 1) allNeighbors.push(grid[currRow][currCol + 1]);
    return allNeighbors;
}

export function getShortestPath(startNode, destNode) {
    let shortestPath = [];
    let ptr = destNode;
    while (ptr.previousNode != startNode) {
        shortestPath.push(ptr);
        ptr = ptr.previousNode;
    }
    return shortestPath;
}