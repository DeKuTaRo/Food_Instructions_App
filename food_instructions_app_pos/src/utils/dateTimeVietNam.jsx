const currentDate = new Date(); // Get current date and time

// Options for formatting the date and time
const options = {
  timeZone: "Asia/Ho_Chi_Minh",
  hour12: false,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
};

// Format the date and time according to the options
const getCurrentDateTimeInVietnam = currentDate.toLocaleString("en-US", options).replace(",", "");

export { getCurrentDateTimeInVietnam };
