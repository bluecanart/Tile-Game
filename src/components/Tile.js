import React from 'react';
import styled from 'styled-components';

const colors = ['red', 'blue', 'grey', 'black'];

const TileContainer = styled.div`
  overflow: hidden;
  width: 16vw;
  height: 6vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  border-radius: 2rem;
  margin: 0.2vw;
  padding: 0.5vw 1vw;
  background-color: ${props => props.color};
  box-shadow: 10px 10px 15px 1px rgba(0, 0, 25, 0.2);
  color: ${props => isDark(props.color) ? 'white' : 'black'};
`;

const TextContainer = styled.p`
  font-size: 2vw;
  margin: 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
`;

const Button = styled.button`
  width: 20%;
  border-radius: 1rem;
  height: 2vw;
  background-color: ${props => props.color};
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

function Tile({ color, text, onColorChange }) {
  return (
    <TileContainer color={color}>
      <TextContainer>{text}</TextContainer>
      <ButtonContainer>
        {colors.map((color, index) => (
          <Button key={index} color={color} onClick={() => onColorChange(color)} />
        ))}
      </ButtonContainer>
    </TileContainer>
  );
}

export default Tile;
