import "./Chart.css";
import {
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
} from "recharts";

export default function Chart({ title, data }) {

  return (
      <div className="featuredChart">
      <h3 className="chartTitle">{title}</h3>
      <ResponsiveContainer width="100%" height="80%">
        <PieChart width={400} height={400}>
          <Pie
            dataKey="value"
            isAnimationActive={false}
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
          />
          <Legend />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
      </div>
  );
}
