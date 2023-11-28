import { useSelector } from "react-redux";


const FindSessionInterval = () => {
  const breaks = useSelector((state) => state.breaks);
  const sessionDuration = useSelector((state) => state.sessionDuration);
  
};

export default FindSessionInterval;
