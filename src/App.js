import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './Welcome';
import Main from './Main';
import Start from './Start';
import SetTimer from './SetTimer';
import SetBreaks from './SetBreaks';
import SetMusic from './SetMusic';
import SessionStarted from './SessionStarted';
import SeeReports from './SeeReports';

function App() {

  const [name, setName] = useState(localStorage.getItem('name'));
  const [totalDuration, setTotalDuration] = useState(`2:30`);

  if (name) {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/main" element={<Main />} />
          <Route path="/start" element={<Start />} />
          <Route path="/set-timer" element={<SetTimer totalDurationProp={setTotalDuration} />} />
          <Route path="/set-breaks" element={<SetBreaks totalDuration={totalDuration} />} />
          <Route path="/set-music" element={<SetMusic />} />
          <Route path="/session-started" element={<SessionStarted />} />
          <Route path="/see-reports" element={<SeeReports />} />
        </Routes>
      </Router>

    );
  } else {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/main" element={<Main />} />
          <Route path="/start" element={<Start />} />
          <Route path="/set-timer" element={<SetTimer />} />
          <Route path="/set-music" element={<SetMusic />} />
          <Route path="/session-started" element={<SessionStarted />} />
          <Route path="/see-reports" element={<SeeReports />} />
        </Routes>
      </Router>

    );
  }

}

export default App;

