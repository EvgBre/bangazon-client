/* eslint-disable react/forbid-prop-types */
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createProduct, updateProduct } from '../../api/productData';

const initialState = {
  name: '',
  productImageUrl: '',
  description: '',
  price: 0,
  categoryId: '',
};

const ProductForm = ({ obj }) => {
  const [currentProduct, setCurrentProduct] = useState(initialState);
  const currentDate = new Date().toISOString().split('T')[0];
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj.id) {
      setCurrentProduct({
        id: obj.id,
        name: obj.name,
        productImageUrl: obj.productImageUrl,
        description: obj.description,
        price: obj.price,
        categoryId: obj.categoryId,
        addedOn: obj.addedOn,
      });
    }
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    // Prevent form from being submitted
    e.preventDefault();
    if (obj.id) {
      const productUpdate = {
        id: currentProduct.id,
        name: currentProduct.name,
        productImageUrl: currentProduct.productImageUrl,
        description: currentProduct.description,
        price: currentProduct.price,
        addedOn: currentProduct.addedOn,
        categoryId: Number(currentProduct.categoryId),
        sellerId: user.uid,
      };
      updateProduct(productUpdate)
        .then(() => router.push(`/products/${obj.id}`));
    } else {
      const product = {
        name: currentProduct.name,
        productImageUrl: currentProduct.productImageUrl,
        description: currentProduct.description,
        price: currentProduct.price,
        addedOn: currentDate,
        categoryId: Number(currentProduct.categoryId),
        sellerId: user.uid,
      };

      // Send currentProduct request to your API
      createProduct(product).then(() => router.push('/products/'));
    }
  };
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">

          <Form.Label>Title</Form.Label>
          <Form.Control
            name="name"
            required
            value={currentProduct.name}
            onChange={handleChange}
          />

          <Form.Label>Image Url</Form.Label>
          <Form.Control
            type="text"
            name="productImageUrl"
            value={currentProduct.productImageUrl}
            onChange={handleChange}
            required
          />
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            style={{ height: '100px' }}
            name="description"
            value={currentProduct.description}
            onChange={handleChange}
            required
          />
          {/* TODO: create the rest of the input fields */}
          <Form.Label>Category</Form.Label>
          {/* <Form.Select
            aria-label="categoryId"
            name="categoryId"
            onChange={handleChange}
            value={currentProduct.categoryId}
          >
            <option value="">Select a Category</option>
            {
                  categories.map((category) => (
                    <option
                      key={category.id}
                      value={category.id}
                    >
                      {category.label}
                    </option>
                  ))
                }
          </Form.Select> */}

          <Form.Label>Price</Form.Label>
          <Form.Control
            type="text"
            style={{ height: '100px' }}
            name="price"
            value={currentProduct.price}
            onChange={handleChange}
            required
          />

        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

ProductForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    productImageUrl: PropTypes.string,
    description: PropTypes.string,
    categoryId: PropTypes.object,
    addedOn: PropTypes.string,
    price: PropTypes.number,
    sellerId: PropTypes.string,
  }),
};

ProductForm.defaultProps = {
  obj: initialState,
};

export default ProductForm;
