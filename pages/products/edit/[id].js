import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getSingleProduct } from '../../../api/productData';
import ProductForm from '../../../components/product/ProductForm';

export default function EditProduct() {
  const router = useRouter();
  const { id } = router.query;

  const [editItem, setEditItem] = useState({});

  useEffect(() => {
    getSingleProduct(id).then((obj) => {
      setEditItem(obj);
    });
  }, [id]);

  return (
    <>
      <Head>
        <title>Edit Product</title>
      </Head>
      <div>
        <ProductForm obj={editItem} />
      </div>

    </>
  );
}
