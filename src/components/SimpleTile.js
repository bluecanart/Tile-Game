import React from 'react';
import styled from 'styled-components';

const TileContainer = styled.div`
  width: 16vw;
  height: 6vw;
  border: 1px solid black;
  margin: 0.2vw;
  padding: 1vw 1vw;
  background-color: ${props => props.color};
`;

function SimpleTile({ color, text, onColorChange }) {
  return (
    <TileContainer color={color}>
    </TileContainer>
  );
}

export default SimpleTile;
