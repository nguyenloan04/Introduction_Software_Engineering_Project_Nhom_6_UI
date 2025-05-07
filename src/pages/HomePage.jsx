import {useEffect, useState} from 'react'

import '../Homepage.css'
import products from '../assets/data/products.js';
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/Card.jsx';
import { Button } from '@/components/ui/Button.jsx';
import Header from "@/components/ui/Header.jsx";
function HomePage() {
  // const [count, setCount] = useState(0)
    useEffect(() => {
        document.title = 'Eyewear Beauty';
    }, []);
  return (
          <div className="list">
              {products.map((product) => (
                  <Card key={product.id} className="shadow-xl m-4">
                      <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-t-2xl" />
                      <CardContent className="p-4">
                          <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                          <p className="text-gray-600 mb-4">Giá: {product.price}</p>
                          <Link to={`/product/${product.id}`}>
                              <Button className="w-full">Xem Chi Tiết</Button>
                          </Link>
                      </CardContent>
                  </Card>
              ))}
          </div>
  );
}

export default HomePage
