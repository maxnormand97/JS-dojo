/**
 * Charlie the Dog challenge (guided boilerplate)
 *
 * Goal:
 * Return the minimum number of moves required for Charlie (C) to collect all food (F)
 * and then reach home (H) on a 4x4 grid. Allowed moves: up, down, left, right.
 *
 * Important rule:
 * Charlie cannot step on H until all food has been collected.
 * 
 * Input: ["FOOF", "OCOO", "OOOH", "FOOO"]
 * Expected Output: 11
 * Your Output: 11
 * Result: CORRECT
 */

// TODO: study the core concepts realted to this problem such as brute
// force TSP (traveling salesman problem

// TYPES:

// Type to represent position in grid
type Position = { row: number, col: number}

// Helper variable used to map out the difference directions Charlie
// can traverse on the grid
const directions: Position[] = [
  {row: -1, col: 0}, // up
  {row: 1, col: 0}, // down
  {row: 0, col: -1}, // left
  {row: 0, col: 1} // right
]

// Used to track what to check next in our BFS algorithm
type QueueNode = {row: number, col: number, steps: number}

function CharlieTheDog(strArr: string[]): string | number { 
  // Set variables to reference where charlie is, home and the food.
  let charlie: Position | null = null;
  let home: Position | null = null;
  let food: Position[] = [];

  // STEP 1: we need to normalize the input and turn it into a 2D array, then
  // we need to set where Charlie is, home and the food coordinates.
  const grid = strArr.map(row => row.split(''));

  validateGridSize(grid)

  // Variable to help validate our char inputs
  const validChars = new Set(['C', 'H', 'F', 'O']);
  let cCount = 0, hCount = 0, fCount = 0;

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      const cell = grid[row][col]
      // Check if its a valid character
      if (!validChars.has(cell)) {
        throw new Error(`Invalid character '${cell}' at (${row},${col})`);
      }

      // Set our positions and validation variables
      if (cell === 'C') {
        charlie = {row, col}
        cCount++
      } else if (cell === 'H') {
        home = {row, col}
        hCount++
      } else if (cell === 'F') {
        food.push({row,col})
        fCount++
      }
    }
  }

  // Validate our character count
  validateCharacters(cCount, hCount, fCount)

  // STEP 2 Calc Permutations: we need to be able to determine all possible orders
  // of the food positions
  // we can define a generic function for this
  const possiblePaths = permute(food)

  // STEP 3 BFS: this is used to just calc the shortest difference between
  // two points, but we need to get all the possible paths (permutations) first, this 
  // function will be called thousands of times based on how many food have

  let minSteps = Infinity;

  for (const order of possiblePaths) {
    let steps = 0
    let current = charlie!;
    // For every possible path permutation we must calculate the shortest distance 
    // using our BFS search algorithm
    for (const foodPos of order) {
      steps += bfs(grid, current, foodPos)
      current = foodPos
    }
    // when we have finished all we calculate home
    steps += bfs(grid, current, home!)
    if (steps < minSteps) minSteps = steps
  }
  return minSteps; 
}

// Recursive function to map out all the possible paths to the food
// for each element in an array generate all the permutations 
// we use this to calculate all the possible orders in which charlie
// could collect the food
function permute<T>(arr: T[]): T[][]{
  // if the array is empty return an empty array (no permutations)
  if (arr.length === 0) return [[]];
  const result: T[][] = []
  for (let index = 0; index < arr.length; index++) {
    // take the current element out to be picked
    // then the 'rest' of the array is everything except the picked element
    const rest = arr.slice(0,index).concat(arr.slice(index +1))
    // recursively get all permutations of the rest of the array
    for (const perm of permute(rest)) {
      // add the picked element to the front of each permutation
      result.push([arr[index], ...perm]);
    }
  }

  return result
}

// Breadth First Search (BFS) to find the shortest path from one position to another on the
// grid, moving up / down / left / right and not going back to cells
// takes in the gird, the start and end position and returns a number
function bfs(grid: string[][], start: Position, end: Position): number{
  const numRows = grid.length;
  const numCols = grid[0].length;
  // Creates an array of booleans to map to each index to know whether we have visited
  // there
  const visited = Array.from({length: numRows}, () => Array(numCols).fill(false))
  const queue: QueueNode[] = [{row: start.row, col: start.col, steps: 0}]

  // we need to ensure that the start is covered
  visited[start.row][start.col] = true
  while (queue.length > 0) {
    const {row, col, steps} = queue.shift()!

    // if you are at the end, return the number of steps
    if (row === end.row && col === end.col) {
      return steps;
    }

    // try all four directions
    for (const dir of directions) {
      const newRow = row + dir.row;
      const newCol = col + dir.col;

      // check if we are in bounds of the grid if its not been visited
      if (
        inBounds(newRow, newCol, numRows, numCols) &&
        !isVisited(visited, newRow, newCol)
      ) {
        markVisited(visited, newRow, newCol)
        // add the result to the queue
        queue.push({row: newRow, col: newCol, steps: steps +1})
      }
    }
  }
  return -1;
}

// Utility and helper functions

// Validate we are still in the grid
function inBounds(row: number, col: number, numRows: number, numCols: number): boolean {
  return row >= 0 && row < numRows && col >= 0 && col < numCols;
}

// Check if we have visited this cell
function isVisited(visited: boolean[][], row: number, col: number): boolean {
  return visited[row][col]
}

// Mark a cell as visited
function markVisited(visited: boolean[][], row: number, col: number): void {
  visited[row][col] = true;
}

// Validate grid
function validateGridSize(grid: string[][]): any {
  if (grid.length !== 4 || grid.some(row => row.length !== 4)) {
    throw new Error("Grid must be 4 x 4")
  }
}

// Validate characters
function validateCharacters(cCount:number, hCount:number, fCount:number): any {
  if (cCount !== 1) throw new Error("There must be exactly one 'C'.");
  if (hCount !== 1) throw new Error("There must be exactly one 'H'.");
  if (fCount < 1 || fCount > 8) throw new Error("There must be 1 to 8 'F' cells.");
}

const testArr = ["FOOF", "OCOO", "OOOH", "FOOO"]

console.log(CharlieTheDog(testArr)) // should = 11
   