from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import sqlite3

DB_PATH = "products.db"

class Product(BaseModel):
    id: int
    name: str
    brand: str
    price: int
    discounted_price: int  # <— раньше называлось sale
    rating: float
    feedbacks: int
    created_at: str

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], allow_credentials=True,
    allow_methods=["*"], allow_headers=["*"],
)

def get_conn():
    c = sqlite3.connect(DB_PATH)
    c.row_factory = sqlite3.Row
    return c

@app.get("/api/products/", response_model=List[Product])
def get_products(
    min_price: int = Query(0, ge=0),
    max_price: int = Query(1_000_000, ge=0),
    min_rating: float = Query(0.0, ge=0.0, le=5.0),
    min_feedbacks: int = Query(0, ge=0),
):
    conn = get_conn()
    cur = conn.cursor()
    cur.execute(
        """
        SELECT
          id,
          name,
          brand,
          price,
          discounted_price,
          rating,
          feedbacks,
          created_at
        FROM products
        WHERE price BETWEEN ? AND ?
          AND rating >= ?
          AND feedbacks >= ?
        """,
        (min_price, max_price, min_rating, min_feedbacks),
    )
    rows = cur.fetchall()
    conn.close()
    return [dict(r) for r in rows]
