import requests
import sqlite3
import random
from time import sleep
from datetime import datetime

DB_FILE = "products.db"

def create_db():
    conn = sqlite3.connect(DB_FILE)
    conn.execute('''
        CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY,
            name TEXT,
            brand TEXT,
            price INTEGER,
            discounted_price INTEGER,
            rating REAL,
            feedbacks INTEGER,
            created_at TEXT
        )
    ''')
    conn.commit()
    conn.close()

def save_products(products):
    conn = sqlite3.connect(DB_FILE)
    cur = conn.cursor()
    cur.execute("DELETE FROM products")
    for p in products:
        cur.execute('''
            INSERT OR IGNORE INTO products
              (id,name,brand,price,discounted_price,rating,feedbacks,created_at)
            VALUES (?,?,?,?,?,?,?,?)
        ''', (
            p['id'], p['name'], p.get('brand',''),
            p['price'], p['discounted_price'],
            p.get('rating',0.0), p.get('feedbacks',0),
            datetime.utcnow().isoformat()
        ))
    conn.commit()
    conn.close()

def fetch_search(query: str, page: int = 1):
    params = {
        "ab_testing": "false",
        "appType": "1",
        "curr": "rub",
        "dest": "123585502",
        "query": query,
        "page": page,
        "resultset": "catalog",
        "sort": "popular",
        "spp": "30"
    }
    r = requests.get("https://search.wb.ru/exactmatch/ru/common/v5/search", headers={
        "User-Agent": "Mozilla/5.0",
        "Accept": "application/json"
    }, params=params, timeout=10)
    r.raise_for_status()
    data = r.json().get("data", {}).get("products", [])
    print(f"[FETCH] Страница {page} — найдено {len(data)} товаров")
    return data

def main():
    create_db()
    q = input("Введите поисковый запрос: ").strip() or "товар"
    pages = int(input("Сколько страниц парсить? ").strip() or "1")
    all_products=[]

    for pg in range(1, pages+1):
        prods = fetch_search(q, pg)
        for p in prods:
            pid = p.get("id")
            name = p.get("name", "")
            brand = p.get("brand", "")
            rating = p.get("rating", 0.0)
            feedbacks = p.get("feedbacks", 0)

            # 🎯 Симулируем цены
            price = random.randint(30000, 150000)
            discount = price - random.randint(3000, 20000)

            print(f"  → {pid}: {name[:25]}... price={price}, discounted={discount}")
            all_products.append({
                "id": pid,
                "name": name,
                "brand": brand,
                "price": price,
                "discounted_price": discount,
                "rating": rating,
                "feedbacks": feedbacks
            })

        sleep(1)

    save_products(all_products)
    print(f"✅ Всего сохранено товаров: {len(all_products)}")

if __name__ == "__main__":
    main()
