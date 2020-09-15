import { useEffect } from "react";
import Moment from "moment";

export const useMoment = () => {
  const updateTime = () => {
    const time = document.getElementById("clock__Time");
    const now = Moment();
    const ticking = now.format("h:mm:ss a");
    time.innerHTML = ticking;
  };

  useEffect(() => {
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);
};
