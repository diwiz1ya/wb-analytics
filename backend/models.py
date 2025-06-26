from sqlalchemy import Column, Integer, String, Float, DateTime
from datetime import datetime
from db import Base

class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    price = Column(Float)
    discounted_price = Column(Float)
    rating = Column(Float)
    reviews_count = Column(Integer)
    created_at = Column(DateTime, default=datetime.utcnow)

    def as_dict(self):
        return {
            "name": self.name,
            "price": self.price,
            "discounted_price": self.discounted_price,
            "rating": self.rating,
            "reviews_count": self.reviews_count
        }
