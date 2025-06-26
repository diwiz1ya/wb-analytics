import { useState, useEffect } from "react";
import Filters from "./components/Filters";
import Table from "./components/Table";
import Charts from "./components/Charts";

function App() {
  const [filters, setFilters] = useState({
    minPrice: 0, maxPrice: 100000, rating: 0, reviews: 0
  });
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const { minPrice, maxPrice, rating, reviews } = filters;
    fetch(
      `http://127.0.0.1:8000/api/products/?min_price=${minPrice}&max_price=${maxPrice}` +
      `&min_rating=${rating}&min_reviews=${reviews}`
    )
      .then(res => res.json())
      .then(setProducts);
  }, [filters]);

  return (
    <div className="p-8 space-y-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold">📦 Wildberries Аналитика</h1>
      <Filters onChange={setFilters} minPrice={0} maxPrice={100000} />
      <Table data={products} />
      <Charts data={products} />
    </div>
  );
}

export default App;
