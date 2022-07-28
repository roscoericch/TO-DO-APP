export const ExpiryTime = (currentTime, setTime) => {
  const currentHour = currentTime.getHours();
  const currentMinute = currentTime.getMinutes();
  const expiryHour = setTime[0];
  const expiryMinute = setTime[1];
  let diffMinute = expiryMinute - currentMinute;
  let diffHour = expiryHour - currentHour;
  if (diffMinute < 1 && diffHour > 0) {
    diffHour = diffHour - 1;
    diffMinute = 60 - diffMinute;
  }
  if (
    diffHour < 0 ||
    (diffHour === 0 && diffMinute < 0) ||
    (diffHour === 0 && diffMinute === 0)
  ) {
    return -1;
  }
  const Seconds = diffHour * 3600 + diffMinute * 60;
  return Seconds * 1000;
};
