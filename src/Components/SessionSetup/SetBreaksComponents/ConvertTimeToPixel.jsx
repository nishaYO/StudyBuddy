
const ConvertTimeToPixel = ({timeObject}) => {
  const totalMinutes = parseInt(timeObject.hours) * 60 + parseInt(timeObject.minutes);
  return `${totalMinutes}px`;
};

export default ConvertTimeToPixel;
