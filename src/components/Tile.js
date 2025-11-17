import React from 'react';
import styled from 'styled-components';
import { TILE_COLORS, DARK_TEXT_COLORS } from '../constants/colors';

const TileContainer = styled.div`
  overflow: hidden;
  box-shadow: 0.2vw 0.4vw 0.8vw rgba(0, 0, 0, 0.25);
  width: 17vw;
  height: 7vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 1vw;
  margin: 0.1vw;
  padding: 0.3vw 0.6vw;
  border-color: white;
  border-style: solid;
  border-width: 0.2vw; 
  background: ${props => getTileGradient(getColor(props.color, props.colorRevealOverride || props.revealed))};
  box-shadow: rgba(0, 0, 0, 0.35);
  color: ${props => isDark(getColor(props.color, props.colorRevealOverride || props.revealed)) ? 'white' : 'black'};
  cursor: pointer;
  filter: ${props => (props.colorRevealOverride && props.revealed ? 'opacity(30%)' : 'none')}; 
  transition: all 0.2s ease;
  &:hover {
    transform: translateY(-0.2vw);
    box-shadow: 0.2vw 0.6vw 1.2vw rgba(0, 0, 0, 0.35);
  }
  &:active {
    transform: translateY(0.1vw);
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

const getTileGradient = (color) => {
  return TILE_COLORS[color] || TILE_COLORS.white;
}

const isDark = (color) => {
  return DARK_TEXT_COLORS.includes(color);
}

function Tile({ color, text, onColorChange, colorRevealOverride, revealed, revealTile }) {
  return (
    <TileContainer color={color} colorRevealOverride={colorRevealOverride} revealed={revealed} onClick={() => revealTile()}>
      <TextContainer>{text}</TextContainer>
    </TileContainer>
  );
}

export default Tile;
