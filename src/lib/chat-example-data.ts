
export const richFormattedMessages = [
  {
    id: "rich-1",
    content: "# Can you create a summary of our Q2 financial results?\n\nI need to prepare a presentation for the executive team.",
    sender: "user" as const,
    timestamp: "10:30 AM"
  },
  {
    id: "rich-2",
    content: "# Q2 Financial Results Summary\n\n## Key Metrics\n\n* **Revenue**: $4.2M (+15% YoY)\n* **Operating Expenses**: $2.8M (-5% QoQ)\n* **Net Profit**: $1.4M (+22% YoY)\n* **Cash Reserves**: $8.5M\n\n## Performance by Department\n\n| Department | Revenue | Growth (YoY) | Cost | Efficiency |\n| ---------- | ------- | ------------ | ---- | ---------- |\n| Digital Services | $2.1M | +22% | $1.2M | 175% |\n| Consulting | $1.3M | +12% | $0.9M | 144% |\n| Products | $0.8M | +8% | $0.7M | 114% |\n\n## Key Insights\n\n1. Digital services continue to be our strongest growth area\n2. Cost reduction initiatives in Q1 are showing results (-5% OpEx)\n3. Customer acquisition cost decreased by 18%\n\n## Recommendations\n\n* Increase investment in digital services team\n* Continue optimization of consulting delivery\n* Review product pricing strategy\n\n![Example Chart](https://via.placeholder.com/600x300)",
    sender: "ai" as const,
    timestamp: "10:32 AM"
  },
  {
    id: "rich-3",
    content: "This is really helpful. Can you add some notes about the regional performance as well?",
    sender: "user" as const,
    timestamp: "10:34 AM"
  },
  {
    id: "rich-4",
    content: "## Regional Performance Breakdown\n\n```javascript\n// Revenue contribution by region\nconst regions = {\n  northAmerica: '45%',\n  europe: '30%',\n  asiaPacific: '20%',\n  latinAmerica: '5%'\n};\n```\n\n### Growth Leaders\n* **Asia Pacific**: +28% YoY (strongest growth)\n* **North America**: +12% YoY\n* **Europe**: +8% YoY\n* **Latin America**: +15% YoY (from small base)\n\n### Regional Insights\n* North America remains our largest market but growth is slowing\n* APAC investments paying off with accelerating growth\n* European growth affected by economic conditions\n* LATAM showing promise as emerging market\n\n### Market Share by Region\n<div style=\"width:100%;background:#f0f0f0;padding:10px;border-radius:5px;\">\n  <div style=\"width:45%;height:20px;background:#4CAF50;display:inline-block;\">NA (45%)</div>\n  <div style=\"width:30%;height:20px;background:#2196F3;display:inline-block;\">EU (30%)</div>\n  <div style=\"width:20%;height:20px;background:#FFC107;display:inline-block;\">APAC (20%)</div>\n  <div style=\"width:5%;height:20px;background:#9C27B0;display:inline-block;\">LATAM (5%)</div>\n</div>",
    sender: "ai" as const,
    timestamp: "10:37 AM"
  }
];
