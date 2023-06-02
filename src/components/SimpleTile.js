import React from 'react';
import styled from 'styled-components';

const TileContainer = styled.div`
  width: 16vw;
  height: 6vw;
  margin: 0.2vw;
  padding: 0.5vw 1vw;
  border-radius: 2rem;
  box-shadow: 10px 10px 15px 1px rgba(0, 0, 25, 0.2);
  background-color: ${props => props.color};
`;

function SimpleTile({ color, text, onColorChange }) {
  return (
    <TileContainer color={color}>
    </TileContainer>
  );
}

export default SimpleTile;
