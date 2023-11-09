import { useState, useEffect } from "react";

function UserPage({ username }) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [alarmTime, setAlarmTime] = useState("");
  const [alarmSet, setAlarmSet] = useState(false);

  // Update the current time every second
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  // Function to handle alarm input change
  const handleAlarmChange = (event) => {
    setAlarmTime(event.target.value);
  };

  // Function to set the alarm
  const setAlarm = () => {
    setAlarmSet(true);
  };

  // Function to clear the alarm
  const clearAlarm = () => {
    setAlarmSet(false);
  };

  // Check for alarm trigger
  useEffect(() => {
    if (
      alarmSet &&
      alarmTime === `${currentTime.getHours()}:${currentTime.getMinutes()}`
    ) {
      alert("Alarm! Wake up!");
      clearAlarm();
    }
  }, [alarmSet, alarmTime, currentTime]);

  return (
    <div className="flex flex-col items-center py-16">
      <h2>Current Time: {currentTime.toLocaleTimeString()}</h2>
      <label>
        Set Alarm:
        <input type="time" className="foucs:outline-none p-2 rounded-lg bg-transparent" value={alarmTime} onChange={handleAlarmChange} />
      </label>
     <div className="flex gap-2 items-center mt-4">
     <button onClick={setAlarm} className="px-5 py-1.5 bg-[#BEADFA] rounded-lg ">Set Alarm</button>
      <button onClick={clearAlarm} className="px-5 py-1.5 bg-[#BEADFA] rounded-lg">Clear Alarm</button>
     </div>
    </div>
  );
}

export default UserPage;
