import React, { useState } from 'react';
import TileGrid from './components/TileGrid';
import { BACKGROUND_GRADIENTS } from './constants/colors';
import styled from 'styled-components';

const AppStyle = styled.div`
  background-image: ${props => BACKGROUND_GRADIENTS[props.winningColor] || BACKGROUND_GRADIENTS.default};
  min-height: 100vh;
  padding: 1vw;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function App() {
  const [winningColor, setWinningColor] = useState(null);

  return (
    <AppStyle winningColor={winningColor}>
      <TileGrid onWinner={setWinningColor} />
    </AppStyle>
  );
}

export default App;
