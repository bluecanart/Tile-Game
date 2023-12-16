import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Tile from './Tile';
import {wordGenerator, gameTypes} from './Words';

const shuffleArray = array => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

const COLOR_RED = 'red';
const COLOR_BLUE = 'blue';
const COLOR_GREY = 'grey';
const COLOR_BLACK = 'black';
const MODE_GUESS = 'Guess';
const MODE_CLUE = 'Clue';
const STARTING_MODE = MODE_GUESS;

const STARTING_AMOUNTS = {
  [COLOR_RED]: 9,
  [COLOR_BLUE]: 8,
  [COLOR_GREY]: 7,
  [COLOR_BLACK]: 1
};

const COLORS = [COLOR_RED, COLOR_BLUE, COLOR_GREY, COLOR_BLACK];

const tileColors = [
  ...Array(STARTING_AMOUNTS[COLOR_RED]).fill(COLOR_RED),
  ...Array(STARTING_AMOUNTS[COLOR_BLUE]).fill(COLOR_BLUE),
  ...Array(STARTING_AMOUNTS[COLOR_GREY]).fill(COLOR_GREY),
  ...Array(STARTING_AMOUNTS[COLOR_BLACK]).fill(COLOR_BLACK),
];

const getTileArray = (gameType) => {
  const wordGen = wordGenerator(gameType);
  shuffleArray(tileColors);
  return tileColors.map(color => ({
    color, 
    text: wordGen.next().value,
    revealed: false
  }));
}

const GRID_BACKGROUND_DEFAULT = 'rgb(235, 235, 255)';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 1vw;
  background-color: ${GRID_BACKGROUND_DEFAULT};
  padding: 2vw;
`;

const ScoreContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  font-size: 2vw;
`;

const Button = styled.button`
  font-size: 2vw;
  padding: 1vw;
  border-radius: 1vw;
  border: 0;
  box-shadow: 0.2vw 0.2vw 0.35vw 0vw rgba(0, 0, 25, 0.2);
  cursor: pointer;
`;

const TypeSelector = styled.select`
  font-size: 2vw;
  border-radius: 1vw;
  padding: 1vw;
  border: 0;
  box-shadow: 0.2vw 0.2vw 0.35vw 0vw rgba(0, 0, 25, 0.2);
`;

function TileGrid() {
  const [selectedGameType, setSelectedGameType] = useState(gameTypes[0]);
  const [tiles, setTiles] = useState(getTileArray(selectedGameType));
  const [activeView, setActiveView] = useState(STARTING_MODE);

  const revealTile = (index) => {
    if(activeView === MODE_CLUE) {
      return;
    }

    const newTiles = [...tiles];
    newTiles[index].revealed = !newTiles[index].revealed;
    setTiles(newTiles);
  };

  const resetGame = () => {
    setTiles(getTileArray(selectedGameType));
    setActiveView(STARTING_MODE)
  };

  const switchView = () => {
    setActiveView(activeView === MODE_CLUE ? MODE_GUESS : MODE_CLUE);
  }

  useEffect(() => {
    resetGame();
  }, [selectedGameType]);

  return (
    <div>
      <Grid style={{backgroundColor: [...COLORS.filter(color => tiles.filter((tile) => tile.revealed && tile.color === color).length >= STARTING_AMOUNTS[color]), GRID_BACKGROUND_DEFAULT][0]}}>
        {tiles.map((tile, index) => (
          <Tile revealTile={() => revealTile(index)} key={index} color={tile.color} text={tile.text} colorRevealOverride={activeView === MODE_CLUE} revealed={tile.revealed} />
        ))}
      </Grid>
      <ScoreContainer>
        {COLORS.map(color => (
            <p style={{color: color}} key={color}>
            {color.slice(0, 1).toUpperCase() + color.slice(1)}: {tiles.filter((tile) => tile.revealed && tile.color === color).length}/{STARTING_AMOUNTS[color]}
            </p>
        ))}
        <TypeSelector value={selectedGameType} onChange={e => setSelectedGameType(e.target.value)}>
          {gameTypes.map((gameType, index) => (
            <option key={index} value={gameType}>
              {gameType}
            </option>
          ))}
        </TypeSelector>
        <Button onClick={switchView}>Switch to {(activeView === MODE_CLUE ? MODE_GUESS : MODE_CLUE)} View</Button>
        <Button onClick={resetGame}>Reset</Button>
      </ScoreContainer>
    </div>
  );
}

export default TileGrid;
