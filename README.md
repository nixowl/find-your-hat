# Find your hat terminal game

## Overview
This is a project for the full stack path on Codecademy. It focuses on Javascript classes to create a terminal game where the player has to navigate a field filled with holes (O) to find their hat (^). 

## How to play
Create a field with the `.generateField()` function which takes three paramenters: height, width, and percentage of holes:
```js
let myField = new Field(Field.generateField(10, 7, 20));
myField.playGame();
```
The game ends when you:

- Find your hat, winning the game.
- Fall into a hole, losing the game.
- Move outside the field, also resulting in a loss.
