import { useState, useEffect } from "react";

export default function Filters({ onChange, minPrice, maxPrice }) {
  const [priceRange, setPriceRange] = useState([minPrice, maxPrice]);
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState(0);

  useEffect(() => {
    onChange({
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      rating,
      reviews,
    });
  }, [priceRange, rating, reviews, onChange]);

  return (
    <div className="space-y-4 p-4 bg-white rounded shadow">
      <div>
        <label className="block mb-1">Цена: {priceRange[0]}–{priceRange[1]} ₽</label>
        <input
          type="range"
          min={minPrice} max={maxPrice}
          value={priceRange[0]}
          onChange={e => setPriceRange([+e.target.value, priceRange[1]])}
        />
        <input
          type="range"
          min={minPrice} max={maxPrice}
          value={priceRange[1]}
          onChange={e => setPriceRange([priceRange[0], +e.target.value])}
        />
      </div>
      <div>
        <label>Мин. рейтинг:</label>
        <input
          type="number" min="0" max="5" step="0.1"
          value={rating}
          onChange={e => setRating(+e.target.value)}
          className="ml-2 w-16"
        />
      </div>
      <div>
        <label>Мин. отзывов:</label>
        <input
          type="number" min="0"
          value={reviews}
          onChange={e => setReviews(+e.target.value)}
          className="ml-2 w-24"
        />
      </div>
    </div>
  );
}
