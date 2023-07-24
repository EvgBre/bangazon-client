import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { getAllProducts } from '../../api/productData';
import ProductCard from '../../components/product/ProductCard';

function AllProducts() {
  const [products, setProducts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    getAllProducts().then((data) => setProducts(data));
  }, []);

  const displayProducts = () => {
    getAllProducts().then((data) => setProducts(data));
  };

  return (
    <>
      <h1 style={{ marginTop: '30px', marginLeft: '20px' }}>All Products</h1>
      <div>
        <div>
          <Button
            style={{
              marginTop: '20px', marginBottom: '20px', marginLeft: '20px', width: '200px', backgroundColor: '#6699CC',
            }}
            className="create-product-button"
            onClick={() => {
              router.push('/products/new');
            }}
          >
            Create Product
          </Button>
        </div>
      </div>
      <div className="text-center my-4 d-flex">
        {products.map((product) => (

          <section key={`product--${product.id}`}>
            <ProductCard id={product.id} name={product.name} productImageUrl={product.product_image_url} price={product.price} onUpdate={displayProducts} UserId={product.seller_id} />
          </section>

        ))}
      </div>
    </>
  );
}

export default AllProducts;
