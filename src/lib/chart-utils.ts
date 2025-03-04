
/**
 * Format numbers for chart Y-axis display
 */
export const formatChartYAxis = (value: number, chartMetric: string): string => {
  if (chartMetric === "tokens") {
    return value >= 1000 ? `${(value / 1000).toFixed(1)}K` : value.toString();
  }
  
  // Format currency values
  if (chartMetric === "revenue" || chartMetric === "cost") {
    return value >= 1000000
      ? `$${(value / 1000000).toFixed(1)}M`
      : value >= 1000
      ? `$${(value / 1000).toFixed(1)}K`
      : `$${value}`;
  }
  
  // Format percentage values
  if (chartMetric === "percentage") {
    return `${value}%`;
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

/**
 * Format data for markdown tables
 */
export const formatMarkdownTable = (data: any[], columns: string[]): string => {
  if (!data || data.length === 0) return '';
  
  // Create header row
  let table = '| ' + columns.join(' | ') + ' |\n';
  
  // Add separator row
  table += '| ' + columns.map(() => '---').join(' | ') + ' |\n';
  
  // Add data rows
  data.forEach(row => {
    table += '| ' + columns.map(col => String(row[col] || '')).join(' | ') + ' |\n';
  });
  
  return table;
};

/**
 * Create a markdown bullet list from an array
 */
export const formatMarkdownList = (items: string[]): string => {
  return items.map(item => `* ${item}`).join('\n');
};

