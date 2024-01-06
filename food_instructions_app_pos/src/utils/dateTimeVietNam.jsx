const currentDate = new Date(); // Get current date and time

// Options for formatting the date and time
const options = {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  fractionalSecondDigits: 3,
  hour12: false,
  timeZone: "Asia/Ho_Chi_Minh", // Set the time zone to Vietnam
};

// Format the date and time according to the options
const getCurrentDateTimeInVietnam = currentDate.toLocaleString("en-US", options);

export { getCurrentDateTimeInVietnam };
