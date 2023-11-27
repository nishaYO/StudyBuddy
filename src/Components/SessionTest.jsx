import React from 'react';
import Countdown from './SessionComponents/Countdown';

const SessionTest = () => {
  const timeObject = { hours: '0', minutes: '0', seconds: '05' };

  return (
    <div>
      <div>SessionTest</div>
      <Countdown timeObject={timeObject} />
    </div>
  );
};

export default SessionTest;
