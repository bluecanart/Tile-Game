import React, { useState } from 'react';
import styled from 'styled-components';
import SimpleTile from './SimpleTile';

const colors = ['red', 'blue', 'grey', 'black'];

const shuffleArray = array => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

const tileColors = [
  colors[0],
  colors[0],
  colors[0],
  colors[0],
  colors[0],
  colors[0],
  colors[0],
  colors[0],
  colors[0],
  colors[1],
  colors[1],
  colors[1],
  colors[1],
  colors[1],
  colors[1],
  colors[1],
  colors[1],
  colors[2],
  colors[2],
  colors[2],
  colors[2],
  colors[2],
  colors[2],
  colors[2],
  colors[3]
];

shuffleArray(tileColors);

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 1vw;
  background-color: rgb(235, 235, 255);
  padding: 2vw;
`;

const Button = styled.button`
  font-size: 2vw;
  padding: 1vw;
  margin: 1vw;
  border-radius: 2rem;
`;

function HostGrid() {
  const [tiles, setTiles] = useState(tileColors.map(color => ({color})));

  const resetTiles = () => {
    shuffleArray(tileColors);
    const newTiles = tileColors.map(color => ({color}));
    setTiles(newTiles);
  };

  return (
    <div>
      <Grid>
        {tiles.map((tile, index) => (
          <SimpleTile key={index} color={tile.color} />
        ))}
      </Grid>
      <Button onClick={resetTiles}>Reset</Button>
    </div>
  );
}

export default HostGrid;
