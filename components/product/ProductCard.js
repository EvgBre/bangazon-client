/* eslint-disable react/forbid-prop-types */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import PropTypes from 'prop-types';
import React from 'react';
import { useRouter } from 'next/router';
import { Card, Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { deleteProduct } from '../../api/productData';

const ProductCard = ({
  id,
  name,
  productImageUrl,
  description,
  price,
  addedOn,
  categoryId,
  sellerId,
  quantity,
  onUpdate,
}) => {
  const router = useRouter();
  const { user } = useAuth();

  const deletethisProduct = () => {
    if (window.confirm('Delete your Product?')) {
      deleteProduct(id).then(() => onUpdate());
    }
  };
  return (
    <>
      <div>
        <Card className="product-card">
          <Card.Header>{name}</Card.Header>
          <Card.Body>
            <img src={productImageUrl} style={{ width: '200px' }} />
            <div>description:{description}</div>
            <div>price:{price}</div>
            <div>quantity:{quantity}</div>
            <div>datedAdded:{addedOn}</div>
            <div>category: {categoryId.label}</div>
            <div>seller: {sellerId.username}</div>
          </Card.Body>
          <Card.Footer className="text-white">Seller: {sellerId.username} </Card.Footer>
          <Button
            className="product-card-button"
            onClick={() => {
              router.push(`/products/${id}`);
            }}
          >
            Product Details
          </Button>

          {sellerId.uid === user.uid
            ? (
              <>
                <Button
                  onClick={deletethisProduct}
                  className="product-card-button"
                >
                  Delete
                </Button>
                <Button
                  className="product-card-button"
                  onClick={() => {
                    router.push(`/products/edit/${id}`);
                  }}
                >
                  Edit
                </Button>
              </>
            ) : ''}
        </Card>
      </div>
    </>
  );
};

ProductCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  productImageUrl: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
  addedOn: PropTypes.string.isRequired,
  categoryId: PropTypes.object.isRequired,
  sellerId: PropTypes.object.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default ProductCard;
