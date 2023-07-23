/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useAuth } from '../utils/context/authContext';
import ProductCard from '../components/product/ProductCard';
import { getProducts } from '../api/productData';

function Home() {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);

  const getAllProducts = () => {
    getProducts().then((data) => setProducts(data));
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <>
      <div
        className="text-center d-flex flex-column justify-content-center align-content-center"
        style={{
          height: '30vh',
          padding: '30px',
          maxWidth: '400px',
          margin: '0 auto',
        }}
      >
        <h1>Welcome to Bangazon, {user.username}! </h1>
        <img src={user.profile_image_url} alt="user profile" />
      </div>
      <article className="products">
        {products.map((product) => (
          <section key={`product--${product.id}`} className="products">
            <ProductCard productObj={product} onUpdate={getAllProducts} />
          </section>
        ))}
      </article>
      <div />
    </>
  );
}

export default Home;
