import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './header/header';

export default function OrderProducts() {
    const [products, setProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);

    useEffect(() => {
        // Fetch products from the API when the component mounts
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('https://uiexercise.onemindindia.com/api/Product');
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleCheckBoxChange = (productId, productName, isChecked) => {
        const selectedData = products.find((prod) => prod.productId === productId);

        if (selectedData) {
            const updatedSelectedProduct = {
                orderId: selectedData.productId,
                customerId: selectedData.productId,
                productId: selectedData.productId,
                quantity: selectedData.availableQuantity,
            };

            if (isChecked) {
                setSelectedProducts((prevSelected) => [...prevSelected, updatedSelectedProduct]);
            } else {
                setSelectedProducts((prevSelected) =>
                    prevSelected.filter((item) => item.productId !== productId)
                );
            }
        } else {
            console.warn('Product not found:', productId);
        }
    };

    const handleOrderSubmit = async () => {
        try {
            // Submit each selected product individually
            for (const selectedProduct of selectedProducts) {
                console.log('Selected product:', selectedProduct);

                const response = await axios.post(
                    'https://uiexercise.onemindindia.com/api/OrderProducts',
                    selectedProduct,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );

                console.log('Order submitted successfully:', response.data);
                alert("order Submitted Successfully")
            }

            setSelectedProducts([]);
        } catch (error) {
            console.error('Error submitting order:', error);

            if (error.response && error.response.status === 400) {
                // Log validation errors
                console.error('Validation errors:', error.response?.data?.errors);
                // Handle validation errors as needed
            } else {
                // Handle other errors (e.g., network issues, server errors)
                console.error('Other error:', error);
                // Show an error message to the user or take appropriate action
            }
        }
    };

    return (
        <>
            <Header />
            <div className='orderProducts m-3'>
                <h3>Order Products</h3>
                <div>
                    <ul>
                        {products.map((product) => (
                            <li key={product.productId}>
                                <label>
                                    <input
                                        type='checkbox'
                                        id={product.productId}
                                        checked={selectedProducts.some((item) => item.productId === product.productId)}
                                        onChange={(e) =>
                                            handleCheckBoxChange(product.productId, product.productName, e.target.checked)
                                        }
                                    />
                                    {product.productName}
                                </label>
                            </li>
                        ))}
                    </ul>

                    <button type='button' onClick={handleOrderSubmit} className='btn btn-primary'>
                        Submit Order
                    </button>
                </div>
            </div>
        </>
    );
}
