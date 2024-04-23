export const getUserInfo = () => {
  const name = localStorage.getItem("name") || "";
  const streakGoal = localStorage.getItem("streakGoal") || '{"hours":"1","minutes":"0"}';
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const userAgent = navigator.userAgent;
  const deviceSize = handleResponsiveDesign();
  return { name, streakGoal, timezone, userAgent, deviceSize };
};

const handleResponsiveDesign = () => {
  const deviceWidth = window.innerWidth;

  const smallDeviceWidth = 600;
  const mediumDeviceWidth = 992;

  if (deviceWidth < smallDeviceWidth) {
    return "Small device";
  } else if (deviceWidth < mediumDeviceWidth) {
    return "Medium device";
  }
  return "Large device";
};
