import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Header from './header/header';

export default function AddProduct() {
    const [formValue, setformValue] = useState({
        productName: '',
        productId: '',
        availableQuantity: 2
    });

    useEffect(() => {
        // Generate random number when the component is mounted
        const randomChar = generateRandomCharacter();
        setformValue((prevFormValue) => ({
            ...prevFormValue,
            productId: `3fa85f64-5717-4562-b3fc-2c963f66afa${randomChar}`,
        }));
    }, []);

    function generateRandomCharacter() {
        const characters = '0123456789';
        const randomIndex = Math.floor(Math.random() * characters.length);
        return characters[randomIndex];
    }

    function handleInput(e) {
        let name = e.target.name;
        let value = e.target.value;

        setformValue({
            ...formValue,
            [name]: value
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        let obj = {
            productName: formValue.productName,
            productId: formValue.productId,
            availableQuantity: parseInt(formValue.availableQuantity, 10)
        };

        console.log('obj', obj);

        try {
            let res = await axios.post('https://uiexercise.onemindindia.com/api/Product', obj, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            let data = res;
            console.log('res', data);
            window.location.reload();

            
        } catch (error) {
            console.error('Error:', error);
        }
    }

    
    return (
        <>
            <Header />
            <div className='addProducts m-3'>
                <h3>Add Products</h3>
                <div>
                    <form>
                        <div className='mb-3'>
                            <label htmlFor='productName' className='form-label'>
                                Product Name
                            </label>
                            <input
                                type='text'
                                className='form-control'
                                onChange={handleInput}
                                name='productName'
                                aria-describedby='emailHelp'
                            />
                        </div>

                        <div className='mb-3'>
                            <label htmlFor='productId' className='form-label'>
                                Product ID
                            </label>
                            <input
                                type='text'
                                onChange={handleInput}
                                value={formValue.productId}
                                name='productId'
                                className='form-control'
                                readOnly
                            />
                        </div>

                        <div className='mb-3'>
                            <label htmlFor='availableQuantity' className='form-label'>
                                Available Quantity
                            </label>
                            <input
                                type='number'
                                onChange={handleInput}
                                name='availableQuantity'
                                className='form-control'
                                id='availableQuantity'
                            />
                        </div>

                        <button type='submit' onClick={handleSubmit} className='btn btn-primary'>
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
