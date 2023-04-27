import React, { useState } from 'react';
import Welcome from './Welcome';
import Main from './Main';

function App() {
  const [name, setName] = useState('');

  const handleNameSubmit = (name) => {
    setName(name);
  };

  return (
    <div>
      {name ? (
        <Main name={name} />
      ) : (
        <Welcome onNameSubmit={handleNameSubmit} />
      )}
    </div>
  );
}

export default App;
