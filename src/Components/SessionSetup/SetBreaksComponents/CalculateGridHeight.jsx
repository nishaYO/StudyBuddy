import { useSelector } from "react-redux";

const CalculateGridHeight = () => {
  const sessionDuration = useSelector((state) => state.sessionDuration);
  const totalMinutes = parseInt(sessionDuration.hours) * 60 + parseInt(sessionDuration.minutes);
  return `${totalMinutes}px`;
};

export default CalculateGridHeight;
