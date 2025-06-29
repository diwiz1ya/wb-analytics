import React, { useState, useMemo } from "react";

export default function Table({ data = [] }) {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  // Вычисляем отсортированный массив
  const sortedData = useMemo(() => {
    const list = Array.isArray(data) ? data : [];
    if (!sortConfig.key) return list;

    return [...list].sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];

      // Строки сравниваем локально, числа — как числа
      if (typeof aVal === "string" && typeof bVal === "string") {
        return sortConfig.direction === "asc"
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      } else {
        return sortConfig.direction === "asc"
          ? (aVal || 0) - (bVal || 0)
          : (bVal || 0) - (aVal || 0);
      }
    });
  }, [data, sortConfig]);

  // Если data не массив — показываем ошибку
  if (!Array.isArray(data)) {
    console.error("Ошибка: Table получил не массив data:", data);
    return (
      <div className="text-red-600 font-semibold mt-4">
        ❌ Ошибка загрузки товаров.
      </div>
    );
  }

  // Переключаем сортировку при клике
  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  // Если после фильтраций пусто
  if (sortedData.length === 0) {
    return (
      <div className="text-gray-600 italic mt-4">
        По выбранным фильтрам ничего не найдено.
      </div>
    );
  }

  // Шаблон стрелок для заголовка
  const SortIcon = ({ columnKey }) => {
    if (sortConfig.key !== columnKey) return null;
    return sortConfig.direction === "asc" ? " ▲" : " ▼";
  };

  return (
    <div className="overflow-x-auto mt-6">
      <table className="min-w-full table-auto border-collapse border border-gray-300 text-sm">
        <thead className="bg-gray-100">
          <tr>
            {[
              { key: "name", label: "Название товара" },
              { key: "price", label: "Цена (₽)" },
              { key: "discounted_price", label: "Цена со скидкой (₽)" },
              { key: "rating", label: "Рейтинг" },
              { key: "feedbacks", label: "Кол-во отзывов" },
            ].map(({ key, label }) => (
              <th
                key={key}
                onClick={() => handleSort(key)}
                className="cursor-pointer border px-4 py-2 text-left select-none hover:bg-gray-200"
              >
                {label}
                <SortIcon columnKey={key} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item, i) => (
            <tr
              key={item.id ?? i}
              className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}
            >
              <td className="border px-4 py-2">{item.name}</td>
              <td className="border px-4 py-2">{item.price}</td>
              <td className="border px-4 py-2">{item.discounted_price}</td>
              <td className="border px-4 py-2">{item.rating}</td>
              <td className="border px-4 py-2">{item.feedbacks}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}