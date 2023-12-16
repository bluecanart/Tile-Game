import React from 'react';
import styled from 'styled-components';

const TileContainer = styled.div`
  overflow: hidden;
  width: 16vw;
  height: 6vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 1vw;
  margin: 0.2vw;
  padding: 0.5vw 1vw;
  border-color: white;
  border-style: solid;
  border-width: ${props => (props.revealed ? '0.1vw' : '0')}; 
  background-color: ${props => getColor(props.color, props.colorRevealOverride || props.revealed)};
  box-shadow: 0.3vw 0.3vw 0.8vw 0.01vw rgba(0, 0, 25, 0.25);
  color: ${props => isDark(getColor(props.color, props.colorRevealOverride || props.revealed)) ? 'white' : 'black'};
  cursor: pointer;
  filter: ${props => (props.colorRevealOverride && props.revealed ? 'opacity(30%)' : 'none')}; 
  &:hover {
    filter: brightness(92%);
  }
`;

const TextContainer = styled.p`
  font-size: 2vw;
  font-weight: 400;
  margin: 0;
  text-align: center;
`;

const getColor = (color, isRevealed) => {
  return isRevealed ? color : 'white';
}

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
    <TileContainer color={color} colorRevealOverride={colorRevealOverride} revealed={revealed} onClick={() => revealTile()}>
      <TextContainer>{text}</TextContainer>
    </TileContainer>
  );
}

export default Tile;
