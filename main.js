const prompt = require("prompt-sync")({ sigint: true });

const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";

class Field {
  constructor(array) {
    this.array = array;
  }

  // Static method so it can be called directly on the class Field instead of an instance of it, eg. Field.generateField() instead of const myField = new Field -> myField.generateField() this can be seen in action at the bottom of the file

  static generateField(height, width, percent) {
    let field = [];
    let playerIsSurrounded = false;
    let hatIsSurrounded = false;
    const percentDecimal = percent / 100;

    // This "do" loop generates a new field until both playerIsSurrounded and hatIsSurrounded are false
    do {
      // This outer loop will push each row into the "field" array
      for (let y = 0; y < height + 1; y++) {
        // Initialize fieldRow here so that it creates a new row for each loop
          let fieldRow = [];
          // Inner loop for each row 
        for (let x = 0; x < width + 1; x++) {
          const randomizer = Math.random(); // This generates a random number between 0 and 1
          fieldRow.push(randomizer <= percentDecimal ? hole : fieldCharacter); // If the random number is less than or equal to the percentage given, add a hole. Otherwise, add a fieldCharacter.
        }
        field.push(fieldRow);
      }

      // Change top left tile to character
      field[0][0] = pathCharacter;

      // Get random index in last row and place hat
      const hatIndex = Math.floor(Math.random() * width);
      field[field.length - 1][hatIndex] = hat;

      // Check if player is surrounded
      if (field[0][1] === hole && field[1][0] === hole)
        playerIsSurrounded = true;

      // Check if hat is surrounded
      if (
        field[field.length - 1][hatIndex - 1] === hole &&
        field[field.length - 1][hatIndex + 1] === hole &&
        field[field.length - 2][hatIndex] === hole
      ) {
        hatIsSurrounded = true;
      }
      // The "do" loop continues while this below condition is true
    } while (playerIsSurrounded && hatIsSurrounded);

    return field;
  }

  print() {
    this.array.forEach((row) => {
      console.log(row.join(" "));
    });
  }

  playGame() {
    let lose = false;
    let win = false;
    let moves = 0;
    let currentRow = 0;
    let currentTile = 0;

    while (!lose && !win) {
      this.print();
      let move = prompt("Where do you want to go? Use w/a/s/d to move: ");

      // Process input and update current position if input is valid, by having separate variables for row/tile we can always use this.array[currentRow][currentTile] to get current position
      if (move === "s") {
        currentRow++;
      } else if (move === "a") {
        currentTile--;
      } else if (move === "d") {
        currentTile++;
      } else if (move === "w") {
        currentRow--;
      } else {
          // If input is not w/a/s/d, log an error message and terminate loop with "continue"
          console.log("Invalid move, try again. Use w/a/s/d to move.")
          continue;
      }

      // Increment moves by 1 before checking lose/win conditions, otherwise moves will be one less than actual moves
      moves++;

      // Check win/lose conditions
      if (this.array[currentRow][currentTile] === hat) {
        console.log("You found the hat!");
        win = true;
      }
      if (this.array[currentRow][currentTile] === hole) {
        console.log("You fell in a hole!");
        lose = true;
      }

      if (
        currentRow < 0 ||
        currentRow >= this.array.length ||
        currentTile < 0 ||
        currentTile >= this.array[0].length
      ) {
        console.log("Out of bounds! Game over.");
        lose = true;
      }

      // Still in the "while" loop, update current position to pathCharacter before restarting the loop
      this.array[currentRow][currentTile] = pathCharacter;
      }
      
    if (win) {
      console.log(`You won the game in ${moves} moves!`);
    } else if (lose) {
      console.log(`Game over! You lost in ${moves} move(s).`);
    }
  }
}
const myField = Field.generateField(10, 10, 30);
const field = new Field(myField);
field.playGame();
