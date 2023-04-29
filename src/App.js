import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import Welcome from './Welcome';
import Main from './Main';
import SetTimer from './SetTimer';
import SetMusic from './SetMusic';
import SessionStarted from './SessionStarted';
import SeeReports from './SeeReports';

function App() {
  const [name, setName] = useState('');
  const [nameSubmitted, setNameSubmitted] = useState(false);

  const handleNameSubmit = (name) => {
    setName(name);
    setNameSubmitted(true);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome onNameSubmit={handleNameSubmit} />} />
        <Route path="/main" element={<Main onNameSubmit={handleNameSubmit} name={name} streak={0} />} />
        <Route path="/set-timer" element={<SetTimer />} />
        <Route path="/set-music" element={<SetMusic />} />
        <Route path="/session-started" element={<SessionStarted />} />
        <Route path="/see-reports" element={<SeeReports />} />
      </Routes>
    </Router>
  );
}

export default App;
// fix name local storage thing