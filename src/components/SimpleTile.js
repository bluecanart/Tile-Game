//Merged into Tile and deprecated
import React from 'react';
import styled from 'styled-components';

const TileContainer = styled.div`
  width: 16vw;
  height: 6vw;
  margin: 0.2vw;
  padding: 0.5vw 1vw;
  border-radius: 1vw;
  box-shadow: 0.3vw 0.3vw 0.8vw 0.01vw rgba(0, 0, 25, 0.25);
  background-color: ${props => props.color};
`;

function SimpleTile({ color, text, onColorChange }) {
  return (
    <TileContainer color={color}>
    </TileContainer>
  );
}

export default SimpleTile;
