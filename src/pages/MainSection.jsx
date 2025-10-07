import React, { useEffect, useState } from 'react'
import axios from "axios"




export default function MainSection() {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts()
    }, [])

    async function fetchProducts() {
        const response = await axios.get("https://fakestoreapi.com/products");
        setProducts(response.data)
    }
    console.log(products);

    return (
        <>
            <main>
               <div className="products p-6 bg-gray-50">
  <h2 className="text-center text-3xl font-semibold text-gray-800 mb-10">
    Products
  </h2>

  <div className="products-wrapper flex flex-wrap justify-center gap-6">
    {products.map((obj) => {
      return (
        <div
          className="product w-full sm:w-[47%] md:w-[30%] lg:w-[23%] bg-white p-4 rounded-2xl 
                     shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 text-center"
        >
          <img
            src={obj.image}
            alt=""
            className="w-full h-56 object-contain rounded-xl mb-3"
          />
          <h3 className="text-base font-medium text-gray-700 mb-1 truncate">
            {obj.title}
          </h3>
          <p className="text-lg font-semibold text-emerald-600">${obj.price}</p>
        </div>
      );
    })}
  </div>
</div>


            </main>
        </>
    )
}
