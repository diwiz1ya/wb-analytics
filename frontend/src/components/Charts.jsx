import { Bar, Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip);

export default function Charts({ data }) {
  const prices = data.map(d => d.discounted_price);
  const max = Math.max(...prices);
  const bins = 10;
  const step = Math.ceil(max / bins);
  const counts = Array(bins).fill(0);
  prices.forEach(p => counts[Math.min(Math.floor(p / step), bins - 1)]++);

  const barData = {
    labels: counts.map((_, i) => `${i * step}–${(i + 1) * step}`),
    datasets: [{ label: "Кол-во товаров", data: counts }]
  };

  const lineData = {
    labels: data.map(d => d.rating),
    datasets: [{
      label: "Скидка (₽)",
      data: data.map(d => d.price - d.discounted_price),
    }]
  };

  return (
    <div className="space-y-8 p-4">
      <div className="bg-white rounded shadow p-4">
        <h3 className="mb-2">Распределение цен</h3>
        <Bar data={barData} />
      </div>
      <div className="bg-white rounded shadow p-4">
        <h3 className="mb-2">Скидка vs Рейтинг</h3>
        <Line data={lineData} />
      </div>
    </div>
  );
}
