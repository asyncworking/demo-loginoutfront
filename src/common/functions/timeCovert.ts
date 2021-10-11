const timeConvert = (createdTime: string) => {
  const minuteThreshold = 60 * 1000;
  const hourThreshold = 60 * minuteThreshold;
  const dayThreshold = 24 * hourThreshold;
  let processedDiff: number;
  const cTime: Date = new Date(createdTime);
  const now = Date.now();
  const diff = now - cTime.getTime();
  const dateArr = cTime.toString().split(' ');
  if (diff < minuteThreshold) {
    processedDiff = Math.floor(diff / 1000);
    return { timeDisplay: processedDiff <= 1 ? 'a second ago' : `${processedDiff} seconds ago`, interval: 2 * 1000 };
  }
  if (diff < hourThreshold) {
    processedDiff = Math.floor(diff / minuteThreshold);
    return { timeDisplay: processedDiff <= 1 ? 'a minute ago' : `${processedDiff} minutes ago`, interval: minuteThreshold };
  }
  if (diff < dayThreshold) {
    processedDiff = Math.floor(diff / hourThreshold);
    return { timeDisplay: processedDiff <= 1 ? '1 hour ago' : `${processedDiff} hours ago`, interval: hourThreshold };
  }
  if (new Date().getUTCFullYear() - cTime.getUTCFullYear() < 1) {
    return { timeDisplay: `${dateArr[1]} ${dateArr[2]}`, interval: null };
  }
  return { timeDisplay: `${dateArr[1]} ${dateArr[2]} ${dateArr[3]}`, interval: null };
};
export default timeConvert;
