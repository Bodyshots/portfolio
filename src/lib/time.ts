export const msToSeconds = (milliseconds: number) => milliseconds / 1000;
export const secondsToMs = (seconds: number) => seconds * 1000;
export const getElapsedSeconds = (startTime: number, endTime: number) =>
  msToSeconds(endTime - startTime);
export const getElapsedMs = (startTime: number, endTime: number) =>
  endTime - startTime;
