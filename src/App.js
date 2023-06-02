import React from 'react';
import TileGrid from './components/TileGrid';
import HostGrid from './components/HostGrid';

function App() {
  const queryParameters = new URLSearchParams(window.location.search);
  const type = queryParameters.get("type");

  if(type === 'host') {
    return (
      <div className="App">
        <HostGrid />
      </div>
    );
  } else {
    return (
      <div className="App">
        <TileGrid />
      </div>
    );
  }
}

export default App;
