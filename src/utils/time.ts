// Utility function to generate time options in 30-min increments
export const generateTimeOptions = (start = 8, end = 17) => {
  const options = [];
  for (let hour = start; hour <= end; hour++) {
    for (let min = 0; min < 60; min += 30) {
      const hour24 = hour.toString().padStart(2, '0');
      const minStr = min.toString().padStart(2, '0');
      const time24 = `${hour24}:${minStr}`;
      // Format for display
      let hour12 = hour % 12;
      hour12 = hour12 === 0 ? 12 : hour12;
      const period = hour < 12 ? 'AM' : 'PM';
      const display = `${hour12}:${minStr} ${period}`;
      options.push({ value: time24, label: display });
    }
  }
  return options;
};

