// App.js
import React, { useState } from 'react';
import Welcome from './Welcome';
import Main from './Main';
import SeeReports from './SeeReports';

function App() {
  const [name, setName] = useState('');
  const [streak, setStreak] = useState(0);
  const [showSeeReports, setShowSeeReports] = useState(false);

  const handleNameSubmit = (name) => {
    setName(name);
  };

  const handleReportsClick = () => {
    setShowSeeReports(true);
  };

  const handleReportsClose = () => {
    setShowSeeReports(false);
  };

  return (
    <div>

      {showSeeReports ? (
        <SeeReports onClose={handleReportsClose} />
      ) : (
        <Main name={name} streak={streak} />
      )}
      <button id="reports-button" onClick={handleReportsClick}>See Today's Reports</button>
    </div>
  );
}

export default App;

// add the welcome page as well then build the focus music componenet and startSession componenet and add them as well
// name should be taken by the main page from lcoal storage itself