import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import Tile from './Tile';
import {wordGenerator, gameTypes} from './Words';
import { BRAND_COLORS, SCORE_COLORS } from '../constants/colors';

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

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 1vw;
  background-color: rgba(255, 255, 255, 0.4);
  padding: 1.5vw;
  margin: auto;
  max-width: 96vw;
  border-radius: 2vw;
  box-shadow: 0 2vw 4vw rgba(0, 0, 0, 0.15);
  border: 0.1vw solid rgba(255, 255, 255, 0.8);
`;

const ScoreContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  max-width: 96vw;
  border-radius: 2vw;
  font-size: 2vw;
  flex-wrap: wrap;
  background-color: rgba(255, 255, 255, 0.4);
  margin: 1.5vw auto 0 auto;
  gap: 1.5vw;
  padding: 1.5vw;
  color: white;
  font-weight: 600;
  box-shadow: 0 2vw 4vw rgba(0, 0, 0, 0.15);
  border: 0.1vw solid rgba(255, 255, 255, 0.8);
  p {
    margin: 0;
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ColorContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2vw;
  padding: 1vw 2vw;
  align-items: flex-start;
  background: rgba(255, 255, 255, 1);
  border-radius: 1vw;
  box-shadow: 0.2vw 0.4vw 0.8vw rgba(0, 0, 0, 0.15);
  font-weight: 600;
  font-size: 2vw;
`;

const Color = styled.div`
  color: ${props => props.color || 'black'};
  font-weight: 600;
  font-size: 2vw;
`;

const Button = styled.button`
  font-size: 2vw;
  padding: 1vw 2vw;
  border-radius: 1vw;
  border: 0;
  background: linear-gradient(135deg, ${BRAND_COLORS.primary} 0%, ${BRAND_COLORS.primaryDark} 100%);
  color: white;
  font-weight: 600;
  box-shadow: 0.2vw 0.4vw 0.8vw rgba(0, 0, 0, 0.25);
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover:not(:disabled) {
    transform: translateY(-0.2vw);
    box-shadow: 0.2vw 0.6vw 1.2vw rgba(0, 0, 0, 0.35);
  }
  &:active:not(:disabled) {
    transform: translateY(0.1vw);
  }
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
  background: white;
  color: #333;
  font-weight: 600;
  box-shadow: 0.2vw 0.4vw 0.8vw rgba(0, 0, 0, 0.15);
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover:not(:disabled) {
    transform: translateY(-0.2vw);
    box-shadow: 0.2vw 0.6vw 1.2vw rgba(0, 0, 0, 0.25);
  }
  &:active:not(:disabled) {
    transform: translateY(0.1vw);
  }
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
  background: white;
  color: #333;
  box-shadow: 0.2vw 0.4vw 0.8vw rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
  &:focus {
    outline: none;
    box-shadow: 0.2vw 0.6vw 1.2vw rgba(102, 126, 234, 0.4);
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Spinner = styled.div`
  border: 0.4vw solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  width: 5vw;
  height: 5vw;
  animation: spin 1s linear infinite;
  margin: 5vw auto;

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

function TileGrid({ onWinner }) {
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

  useEffect(() => {
    // Check if any team has reached their max
    const redCount = tiles.filter((tile) => tile.revealed && tile.color === COLOR_RED).length;
    const blueCount = tiles.filter((tile) => tile.revealed && tile.color === COLOR_BLUE).length;
    const blackCount = tiles.filter((tile) => tile.revealed && tile.color === COLOR_BLACK).length;

    if (redCount === STARTING_AMOUNTS[COLOR_RED]) {
      onWinner?.(COLOR_RED);
    } else if (blueCount === STARTING_AMOUNTS[COLOR_BLUE]) {
      onWinner?.(COLOR_BLUE);
    } else if (blackCount === STARTING_AMOUNTS[COLOR_BLACK]) {
      onWinner?.(COLOR_BLACK);
    } else {
      onWinner?.(null);
    }
  }, [tiles, onWinner]);

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <Grid>
          {tiles.map((tile, index) => (
            <Tile revealTile={() => revealTile(index)} key={index} color={tile.color} text={tile.text} colorRevealOverride={activeView === MODE_CLUE} revealed={tile.revealed} />
          ))}
        </Grid>
      )}
      <ScoreContainer>
        <ColorContainer>
          {COLORS.filter(color => color !== COLOR_GREY).map(color => (
              <Color color={color} key={color}>
                {color.slice(0, 1).toUpperCase() + color.slice(1)}: {tiles.filter((tile) => tile.revealed && tile.color === color).length}/{STARTING_AMOUNTS[color]}
              </Color>
          ))}
        </ColorContainer>
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
