import React, { useEffect, useState, useCallback } from 'react';
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

const getTileArray = async (gameType, customCategory, apiKey) => {
  const wordGen = await wordGenerator(gameType, customCategory, apiKey);
  shuffleArray(tileColors);
  const tiles = [];
  for (const color of tileColors) {
    const { value: text } = await wordGen.next();
    tiles.push({ color, text, revealed: false });
  }
  return tiles;
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
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Button = styled.button`
  font-size: 2vw;
  padding: 1vw;
  border-radius: 1vw;
  border: 0;
  box-shadow: 0.2vw 0.2vw 0.35vw 0vw rgba(0, 0, 25, 0.2);
  cursor: pointer;
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const TypeSelector = styled.select`
  font-size: 2vw;
  border-radius: 1vw;
  padding: 1vw;
  border: 0;
  box-shadow: 0.2vw 0.2vw 0.35vw 0vw rgba(0, 0, 25, 0.2);
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const CustomCategorySelector = styled.input`
  font-size: 2vw;
  border-radius: 1vw;
  padding: 1vw;
  border: 0;
  box-shadow: 0.2vw 0.2vw 0.35vw 0vw rgba(0, 0, 25, 0.2);
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Spinner = styled.div`
  border: 0.4vw solid rgba(0, 0, 0, 0.1);
  border-left-color: #000;
  border-radius: 50%;
  width: 5vw;
  height: 5vw;
  animation: spin 1s linear infinite;
  margin: 0 auto; /* Center horizontally */

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

// Debounce function implementation
function debounce(func, wait) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

function TileGrid() {
  const [selectedGameType, setSelectedGameType] = useState(gameTypes[0]);
  const [tiles, setTiles] = useState([]);
  const [activeView, setActiveView] = useState(STARTING_MODE);
  const [loading, setLoading] = useState(true);
  const [apiKey, setApiKey] = useState(new URLSearchParams(window.location.search).get('key'));
  const [customCategory, setCustomCategory] = useState('');
  const [localCustomCategory, setLocalCustomCategory] = useState(customCategory);

  const debouncedSetCustomCategory = useCallback(
    debounce(value => setCustomCategory(value), 1000),
    []
  );

  const handleCustomCategoryChange = (e) => {
    const value = e.target.value;
    setLocalCustomCategory(value);
    debouncedSetCustomCategory(value);
  };

  const revealTile = (index) => {
    if(activeView === MODE_CLUE) {
      return;
    }

    const newTiles = [...tiles];
    newTiles[index].revealed = !newTiles[index].revealed;
    setTiles(newTiles);
  };

  const resetGame = useCallback(
    async () => {
      setLoading(true);
      const newTiles = await getTileArray(selectedGameType, customCategory, apiKey);
      setTiles(newTiles);
      setActiveView(STARTING_MODE);
      setLoading(false);
    },
    [selectedGameType, customCategory, apiKey]
  );

  const switchView = () => {
    setActiveView(activeView === MODE_CLUE ? MODE_GUESS : MODE_CLUE);
  }

  useEffect(() => {
    resetGame();
  }, [selectedGameType, customCategory, apiKey, resetGame]);

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <Grid style={{backgroundColor: [...COLORS.filter(color => tiles.filter((tile) => tile.revealed && tile.color === color).length >= STARTING_AMOUNTS[color]), GRID_BACKGROUND_DEFAULT][0]}}>
          {tiles.map((tile, index) => (
            <Tile revealTile={() => revealTile(index)} key={index} color={tile.color} text={tile.text} colorRevealOverride={activeView === MODE_CLUE} revealed={tile.revealed} />
          ))}
        </Grid>
      )}
      <ScoreContainer>
        {COLORS.filter(color => color !== COLOR_GREY).map(color => (
            <p style={{color: color}} key={color}>
            {color.slice(0, 1).toUpperCase() + color.slice(1)}: {tiles.filter((tile) => tile.revealed && tile.color === color).length}/{STARTING_AMOUNTS[color]}
            </p>
        ))}
        <TypeSelector value={selectedGameType} onChange={e => setSelectedGameType(e.target.value)} disabled={loading}>
          {gameTypes.filter(type => apiKey || type !== 'Custom').map((gameType, index) => (
            <option key={index} value={gameType}>
              {gameType}
            </option>
          ))}
        </TypeSelector>
        {selectedGameType === 'Custom' && (
          <CustomCategorySelector
            type="text"
            value={localCustomCategory}
            onChange={handleCustomCategoryChange}
            placeholder="Enter custom category"
            disabled={loading}
          />
        )}
        <Button onClick={switchView} disabled={loading}>Switch to {(activeView === MODE_CLUE ? MODE_GUESS : MODE_CLUE)} View</Button>
        <Button onClick={resetGame} disabled={loading}>Reset</Button>
      </ScoreContainer>
    </div>
  );
}

export default TileGrid;
