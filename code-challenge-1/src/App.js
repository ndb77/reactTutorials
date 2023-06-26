import ColorBar from './ColorBar';
import Square from './Square';

import { useState } from 'react';

function App() {
  const [color,setColor] = useState("")
  
  return (
    <div className="App">
      <Square color={color}/>
      <ColorBar color={color} setColor={setColor}/>
    </div>
  );
}

export default App;
