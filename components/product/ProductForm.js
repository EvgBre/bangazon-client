/* eslint-disable react/forbid-prop-types */
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createProduct, updateProduct } from '../../api/productData';
import { getCategories } from '../../api/categoryData';

const initialState = {
  name: '',
  productImageUrl: '',
  description: '',
  price: 0,
  categoryId: '',
  quantity: 0,
};

const ProductForm = ({ obj }) => {
  const [currentProduct, setCurrentProduct] = useState(initialState);
  const currentDate = new Date().toISOString().split('T')[0];
  const [categories, setCategories] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj.id) {
      setCurrentProduct({
        id: obj.id,
        name: obj.name,
        productImageUrl: obj.product_image_url,
        description: obj.description,
        price: obj.price,
        quantity: obj.quantity,
        categoryId: obj.category_id,
        addedOn: obj.added_on,
        sellerId: user.id,
      });
    }
  }, [obj, user]);

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

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
        price: Number(currentProduct.price),
        addedOn: currentProduct.addedOn,
        quantity: Number(currentProduct.quantity),
        categoryId: currentProduct.categoryId,
        sellerId: user.id,
      };
      updateProduct(productUpdate)
        .then(() => router.push(`/products/${obj.id}`));
    } else {
      const product = {
        name: currentProduct.name,
        productImageUrl: currentProduct.productImageUrl,
        description: currentProduct.description,
        price: Number(currentProduct.price),
        addedOn: currentDate,
        quantity: Number(currentProduct.quantity),
        categoryId: currentProduct.categoryId,
        sellerId: user.id,
      };

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
          <Form.Label>Category</Form.Label>
          <Form.Select
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
          </Form.Select>
          <Form.Label>Quantity</Form.Label>
          <Form.Control
            name="quantity"
            type="number"
            required
            value={currentProduct.quantity}
            onChange={handleChange}
          />
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
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
    product_image_url: PropTypes.string,
    description: PropTypes.string,
    category_id: PropTypes.object,
    quantity: PropTypes.number,
    added_on: PropTypes.string,
    price: PropTypes.number,
    sellerId: PropTypes.string,
  }),
};

ProductForm.defaultProps = {
  obj: initialState,
};

export default ProductForm;
