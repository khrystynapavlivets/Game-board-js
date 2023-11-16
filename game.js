// Функція removeGroupRecursive видаляє всі елементи з однаковим значенням вказаної комірки та її сусідів, якщо вони також мають однакове значення.
class Cell {
    constructor(value, row, col) {
        this.value = value;
        this.row = row + 1;
        this.col = col + 1;
    }
}

class GameBoard {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.cells = this.generateCells();
    }

    generateCells() {
        return Array.from({ length: this.rows }, (_, row) =>
            Array.from({ length: this.cols }, (_, col) => new Cell(this.getRandomValue(), row, col))
        );
    }

    getRandomValue() {
        const values = ['♥', '♦', '♠', '♠'];
        const randomIndex = Math.floor(Math.random() * values.length);
        return values[randomIndex];
    }

    removeGroup(row, col) {
        const selectedCell = this.cells[row][col];
        const targetValue = selectedCell.value;
        const visited = Array.from({ length: this.rows }, () => Array(this.cols).fill(false));

        const removeGroupRecursive = (row, col) => {
            if (row < 0 || row >= this.rows || col < 0 || col >= this.cols || visited[row][col]) {
                return;
            }

            visited[row][col] = true;
            const currentCell = this.cells[row][col];

            if (currentCell != null && currentCell.value === targetValue) {
                this.cells[row][col] = null;

                removeGroupRecursive(row + 1, col);
                removeGroupRecursive(row - 1, col);
                removeGroupRecursive(row, col + 1);
                removeGroupRecursive(row, col - 1);
            }
        };

        removeGroupRecursive(row, col);
        this.showBoard();
    }

    showBoard() {
        const gameContainer = document.getElementById('game-container');
        gameContainer.innerHTML = '';

        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                const cell = this.cells[row][col];

                const cellElement = document.createElement('div');
                cellElement.className = 'game-cell';
                cellElement.textContent = cell ? cell.value : '';
                cellElement.addEventListener('click', () => this.removeGroup(row, col));

                gameContainer.appendChild(cellElement);
            }
        }
    }
}
const gameBoard = new GameBoard(7, 6);
gameBoard.showBoard();


// Функція removeGroupRecursive проходить по всім значеннях вказаному діапазоні

// class Cell {
//     constructor(value, row, col) {
//         this.value = value;
//         this.row = row + 1;
//         this.col = col + 1;
//     }
// }

// class GameBoard {
//     constructor(rows, cols) {
//         this.rows = rows;
//         this.cols = cols;
//         this.cells = this.generateCells();
//     }

//     generateCells() {
//         return Array.from({ length: this.rows }, (_, row) =>
//             Array.from({ length: this.cols }, (_, col) => new Cell(this.getRandomValue(), row, col))
//         );
//     }

//     getRandomValue() {
//         const values = ['♥', '♦', '♠', '♠'];
//         const randomIndex = Math.floor(Math.random() * values.length);
//         return values[randomIndex];
//     }

//     removeGroup(row, col) {
//         const selectedCell = this.cells[row][col];
//         const targetValue = selectedCell.value;
//         const visited = Array.from({ length: this.rows }, () => Array(this.cols).fill(false));
        
//         const removeGroupRecursive = (row, col) => {
//             if (row < 0 || row >= this.rows || col < 0 || col >= this.cols || visited[row][col]) {
//                 return;
//             }
//             visited[row][col] = true;
//             const currentCell = this.cells[row][col];
//             if (currentCell != null  && currentCell.value === targetValue) {
//                 this.cells[row][col] = null;
//                 for (let i = -7; i <= 7; i++) {
//                     if (this.cells[row + i] && this.cells[row + i][col] && this.cells[row + i][col].value === targetValue) {
//                         removeGroupRecursive(row + i, col);
//                     }
//                 }
//                 for (let i = -6; i <= 6; i++) {
//                     if (this.cells[row][col + i] && this.cells[row][col + i].value === targetValue) {
//                         removeGroupRecursive(row, col + i);
//                     }
//                 }    
//             }
//         };
//         removeGroupRecursive(row, col);
//         this.showBoard();
//     }

//     showBoard() {
//         const gameContainer = document.getElementById('game-container');
//         gameContainer.innerHTML = '';
//         for (let row = 0; row < this.rows; row++) {
//             for (let col = 0; col < this.cols; col++) {
//                 const cell = this.cells[row][col];
//                 const cellElement = document.createElement('div');
//                 cellElement.className = 'game-cell';
//                 cellElement.textContent = cell ? cell.value : '';
//                 cellElement.addEventListener('click', () => this.removeGroup(row, col));
//                 gameContainer.appendChild(cellElement);
//             }
//         }
//     }
// }

// const gameBoard = new GameBoard(7, 6);
// gameBoard.showBoard();