import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { getSingleProduct, deleteProduct } from '../../api/productData';
import { useAuth } from '../../utils/context/authContext';

const ViewProduct = () => {
  const router = useRouter();
  const [productDetails, setProductDetails] = useState({});
  const { id } = router.query;
  const { user } = useAuth();
  const deleteThisProduct = () => {
    if (window.confirm('Delete Product?')) {
      deleteProduct(id).then(() => {
        alert('Product Deleted'); // Show a success message if needed
        router.push('/products/'); // Redirect to '/products/' after deletion
      });
    }
  };

  useEffect(() => {
    getSingleProduct(id).then((productData) => {
      setProductDetails(productData);
    });
  }, [id]);

  return (
    <>
      <div className="mt-5 d-flex flex-wrap">
        <div className="d-flex flex-column">
          <h3>
            {productDetails.name}
          </h3>
          <h5>{productDetails.description}</h5>
          <p>Category: {productDetails.category_id?.label}</p>
          <p>Seller: {productDetails.seller_id?.username}</p>
          <p>Qty: {productDetails.quantity}</p>
          <p>Price: ${productDetails.price}</p>
          <p>Added On: {productDetails.added_on}</p>
        </div>
      </div>
      <div className="d-flex">
        {user.uid === productDetails.seller_id?.uid
          ? (
            <>
              <Button
                style={{ margin: '10px', backgroundColor: '#003049' }}
                onClick={() => {
                  router.push(`/products/edit/${id}`);
                }}
              >
                Edit Product
              </Button>
              <Button
                style={{ margin: '10px', backgroundColor: '#003049' }}
                onClick={deleteThisProduct}
              >
                Delete Product
              </Button>
            </>
          )
          : (
            <Button
              onClick={() => {
                router.push('/cart');
              }}
              style={{
                margin: '10px', backgroundColor: '#6699CC', fontSize: '10px', width: '90px',
              }}
            >
              Add To Cart
            </Button>
          )}
      </div>
    </>
  );
};

export default ViewProduct;
