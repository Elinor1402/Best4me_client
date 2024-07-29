import { Chart } from "react-google-charts";
import randomColor from "randomcolor";
import "./Chart.css";

//The charts in the admin main page
export default function Charts({ csvData }) {
  const generateChartData = (columnIndex) => {
    const colors = {};
    const chartData = [["Value", "Frequency"]];
    const uniqueValues = new Set();

    // Iterate over the CSV data
    csvData.slice(1).forEach((row) => {
      const value = row[columnIndex];

      // Check if the value is not already added
      if (!uniqueValues.has(value)) {
        uniqueValues.add(value);

        // Assign a random color to the value
        colors[value] = randomColor();

        // Add the value to the chart data
        chartData.push([value, 1]);
      } else {
        // If the value is already added, increase its frequency
        const existingIndex = chartData.findIndex(
          ([existingValue]) => existingValue === value
        );
        chartData[existingIndex][1]++;
      }
    });

    return { chartData, colors };
  };

  return (
    <div className="py-10">
      <div className="chart-container">
        {csvData.length > 0 && (
          <div>
            {csvData[0]
              .slice(1, csvData.length - 2)
              .map((columnName, columnIndex) => {
                // Skip the first column and its header
                const { chartData, colors } = generateChartData(
                  columnIndex + 1
                ); // Adjust column index
                return (
                  <div key={columnName} className="chart-wrapper">
                    <h2>{columnName}</h2>
                    <Chart
                      chartType="PieChart"
                      width="100%"
                      height="400px"
                      data={chartData}
                      options={{
                        title: columnName,
                        pieHole: 0.4,
                        colors: Object.values(colors), // Assign colors to values
                      }}
                    />
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
}
