type DateFormatOptions = Intl.DateTimeFormatOptions;

export const formatUnixDateTime = (
  timestamp: number,
  options?: DateFormatOptions,
) => {
  return new Date(timestamp * 1000).toLocaleString('en-US', options);
};

export const formatUnixDate = (
  timestamp: number,
  options?: DateFormatOptions,
) => {
  return new Date(timestamp * 1000).toLocaleDateString('en-US', options);
};

export const formatUnixTime = (
  timestamp: number,
  options?: DateFormatOptions,
) => {
  return new Date(timestamp * 1000).toLocaleTimeString('en-US', options);
};

export const formatUTCDateTime = (
  utcString: string,
  options?: DateFormatOptions,
) => {
  return new Date(utcString).toLocaleString('en-US', options);
};

export const formatUTCDate = (
  utcString: string,
  options?: DateFormatOptions,
) => {
  return new Date(utcString).toLocaleDateString('en-US', options);
};

export const formatUTCTime = (
  utcString: string,
  options?: DateFormatOptions,
) => {
  return new Date(utcString).toLocaleTimeString('en-US', options);
};
