/**
 * Determines the state of cells in the next generation based on Conway's Game of Life rules.
 * 
 * The rules are:
 * 1. Any live cell with 2 or 3 neighbors survives
 * 2. Any dead cell with exactly 3 neighbors becomes alive
 * 3. All other cells die or stay dead
 * 
 * First, creates a new state array by mapping through each cell in the current state.
 * Then, updates the grid's visual representation based on the new state.
 * Each cell's appearance is determined by the number of its live neighbors.
 * 
 * @function nextGeneration
 * @returns {void}
 */
const rows = Math.floor(window.innerHeight / 11);
const cols = Math.floor(window.innerWidth / 11);
const grid = document.getElementById('grid');
grid.style.gridTemplateColumns = `repeat(${cols}, 10px)`;

let cells = [];
let state = Array(rows).fill().map(() => 
    Array(cols).fill().map(() => Math.random() > 0.7 ? 1 : 0)
);

// Create grid
for(let i = 0; i < rows; i++) {
    for(let j = 0; j < cols; j++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        grid.appendChild(cell);
        cells.push(cell);
    }
}

function countNeighbors(x, y) {
    let count = 0;
    for(let i = -1; i <= 1; i++) {
        for(let j = -1; j <= 1; j++) {
            if(i === 0 && j === 0) continue;
            const row = (x + i + rows) % rows;
            const col = (y + j + cols) % cols;
            if(state[row][col]) count++;
        }
    }
    return count;
}

function updateCellClass(cell, neighbors, isAlive) {
    cell.className = 'cell';
    if(isAlive) {
        const level = Math.min(Math.floor(neighbors), 4);
        cell.classList.add(`level-${level}`);
    } else {
        cell.classList.add('level-0');
    }
}

function nextGeneration() {
    const newState = state.map((row, i) => 
        row.map((cell, j) => {
            const neighbors = countNeighbors(i, j);
            const willLive = neighbors === 3 || (cell && neighbors === 2);
            return willLive ? 1 : 0;
        })
    );

    state = newState;
    cells.forEach((cell, idx) => {
        const i = Math.floor(idx / cols);
        const j = idx % cols;
        const neighbors = countNeighbors(i, j);
        updateCellClass(cell, neighbors, state[i][j]);
    });
}

setInterval(nextGeneration, 500);
