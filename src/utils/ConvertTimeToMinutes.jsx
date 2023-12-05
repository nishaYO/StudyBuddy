const ConvertTimeToMinutes = ({ timeObject }) => {
  const totalMinutes =
    parseInt(timeObject.hours) * 60 + parseInt(timeObject.minutes);
  return totalMinutes;
};

export default ConvertTimeToMinutes;
