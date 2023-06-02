import React, { useState } from 'react';
import styled from 'styled-components';
import Tile from './Tile';
import {getRandomNoun} from './Words';

//Todo: Implement colors and show/hide logic

const colors = ['red', 'blue', 'grey', 'black'];
const initialColorCounts = colors.reduce((acc, color) => ({ ...acc, [color]: 0 }), {});

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 1vw;
  background-color: rgb(235, 235, 255);
  padding: 2vw;
`;

const ScoreContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  font-size: 2vw;
`;

const Score = styled.div`
  margin: 1vw 0;
`;

const Button = styled.button`
  font-size: 2vw;
  padding: 1vw;
  border-radius: 2rem;
`;

function TileGrid() {
  const [colorCounts, setColorCounts] = useState(initialColorCounts);
  const [tiles, setTiles] = useState(Array.from({ length: 25 }, () => ({ color: 'white', text: getRandomNoun() })));


  const handleColorChange = (index, color) => {
    const newTiles = [...tiles];
    const prevColor = newTiles[index].color;
  
    if (prevColor !== color) {
      newTiles[index].color = color;

      setColorCounts({
        ...colorCounts,
        [prevColor]: colorCounts[prevColor] - 1,
        [color]: colorCounts[color] + 1
      });
    } else {
      newTiles[index].color = 'white';

      setColorCounts({
        ...colorCounts,
        [prevColor]: colorCounts[prevColor] - 1
      });

    }
    
    setTiles(newTiles);
  };


  const resetTiles = () => {
    const newTiles = tiles.map(tile => ({ ...tile, color: 'white', text: getRandomNoun() }));
    setColorCounts(initialColorCounts);
    setTiles(newTiles);
  };

  return (
    <div>
      <Grid>
        {tiles.map((tile, index) => (
          <Tile key={index} color={tile.color} text={tile.text} onColorChange={color => handleColorChange(index, color)} />
        ))}
      </Grid>
      <ScoreContainer>
        {colors.map(color => (
            <p style={{color: color}} key={color}>
            {color.slice(0, 1).toUpperCase() + color.slice(1)}: {colorCounts[color]}
            </p>
        ))}
        <Button onClick={resetTiles}>Reset</Button>
      </ScoreContainer>
    </div>
  );
}

export default TileGrid;
