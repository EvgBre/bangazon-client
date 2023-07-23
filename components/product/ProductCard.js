import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';

export default function ProductCard({ productObj }) {
  return (
    <Card style={{ width: '18rem' }} className="productCard">
      <Card.Img variant="top" src={productObj.image_url} />
      <Card.Body>
        <Card.Title>{productObj.title}</Card.Title>
        <Card.Text>{productObj.price}</Card.Text>
        <Card.Text>{productObj.seller.first_name}</Card.Text>
        <Link href={`/products/${productObj.id}`} passHref>
          <Button variant="primary">Product Details</Button>
        </Link>
        <Button variant="primary">Add to Cart</Button>
      </Card.Body>
    </Card>
  );
}

ProductCard.propTypes = {
  productObj: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    seller: PropTypes.shape({
      first_name: PropTypes.string,
      last_name: PropTypes.string,
    }),
    image_url: PropTypes.string,
  }).isRequired,
};
