
/**
 * Format numbers for chart Y-axis display
 */
export const formatChartYAxis = (value: number, chartMetric: string): string => {
  if (chartMetric === "tokens") {
    return value >= 1000 ? `${(value / 1000).toFixed(1)}K` : value.toString();
  }
  return value.toString();
};

/**
 * Format date strings for display on charts
 */
export const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return `${date.getDate()}/${date.getMonth() + 1}`;
};

/**
 * Format time values (e.g., hours and minutes)
 */
export const formatTime = (time: number): string => {
  const hours = Math.floor(time);
  const minutes = Math.round((time - hours) * 60);
  return `${hours}h ${minutes}m`;
};
