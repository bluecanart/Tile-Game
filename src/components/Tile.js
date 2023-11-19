import React from 'react';
import styled from 'styled-components';

const TileContainer = styled.div`
  overflow: hidden;
  width: 16vw;
  height: 6vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  border-radius: 1vw;
  margin: 0.2vw;
  padding: 0.5vw 1vw;
  background-color: ${props => props.color};
  box-shadow: 0.3vw 0.3vw 0.8vw 0.01vw rgba(0, 0, 25, 0.25);
  color: ${props => isDark(props.color) ? 'white' : 'black'};
  cursor: pointer;
  &:hover {
    filter: brightness(92%);
  }
`;

const TextContainer = styled.p`
  font-size: 2vw;
  font-weight: 400;
  margin: 0;
`;

const isDark = (color) => {
  switch(color){
    case 'red':
    case 'blue':
    case 'black':
      return true;
    case 'grey':
    case 'white':
      return false;
    default:
      return false;
  }
}

function Tile({ color, text, onColorChange, colorRevealOverride, revealed, revealTile }) {
  return (
    <TileContainer onClick={() => revealTile()} color={revealed || colorRevealOverride ? color : 'white'}>
      <TextContainer>{text}</TextContainer>
    </TileContainer>
  );
}

export default Tile;
