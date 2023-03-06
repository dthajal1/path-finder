export function getAllNeighbors(currNode, grid) {
    let allNeighbors = [];
    let currRow = currNode.row;
    let currCol = currNode.col;

    if (currRow > 0) allNeighbors.push(grid[currRow - 1][currCol]);
    if (currRow < grid.length - 1) allNeighbors.push(grid[currRow + 1][currCol]);
    if (currCol > 0) allNeighbors.push(grid[currRow][currCol - 1]);
    if (currCol < grid[0].length - 1) allNeighbors.push(grid[currRow][currCol + 1]);
    return allNeighbors;
}