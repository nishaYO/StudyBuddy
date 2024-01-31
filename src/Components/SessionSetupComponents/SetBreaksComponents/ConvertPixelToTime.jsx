const ConvertPixelToTime = ({totalMinutes}) => {
    const hours = Math.floor(totalMinutes / 60);
    const remainingMinutes = totalMinutes % 60;
  
    return {
      hours: hours,
      minutes: remainingMinutes,
      seconds: 0,
    };
};

export default ConvertPixelToTime;
