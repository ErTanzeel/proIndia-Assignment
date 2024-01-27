import React, { useEffect, useState } from 'react'
import './home.css'
import axios from 'axios'
import Header from './header/header'

export default function Home() {
  const [product, setProduct] = useState()

  async function fetchData() {

    let response = await axios.get('https://uiexercise.onemindindia.com/api/Product')
    let responseData = await response.data
    console.log(responseData);
    setProduct(responseData)

  }

  useEffect(() => {
    fetchData()
  }, [])


  return (
    <>

      <Header />
      <div className='listing-Product m-3'>

        <h1>  Listing Product </h1>

        <div className='table m-3'>
          <table class="table m-3">
            <thead>
              <tr>
                <th scope="col">S.no</th>
                <th scope="col"> productId </th>
                <th scope="col">productName </th>
                <th scope="col">availableQuantity</th>
              </tr>
            </thead>

            <tbody>

              {product && product.map((item, i) => {
                return (
                  <tr key={i}>
                    <th scope="row">{i}</th>
                    <td>{item.productId}</td>
                    {item.productName == null ? <td> null </td> : <td> {item.productName} </td>}

                    <td>{item.availableQuantity} </td>
                  </tr>

                )
              })}


            </tbody>
          </table>

        </div>



      </div>
    </>
  )
}
