import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function MainSection() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    const response = await axios.get("https://fakestoreapi.com/products");
    setProducts(response.data);
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-100 py-12">
      <section className="max-w-7xl mx-auto px-5">
       
        <h2 className="text-center text-4xl font-extrabold text-amber-800 mb-12 tracking-tight drop-shadow-sm">
         Products
        </h2>

       
        <div className="flex flex-wrap justify-center gap-8">
          {products.map((obj) => (
            <Link
              key={obj.id}
              to={"/product/" + obj.id}
              className="group w-72 bg-white rounded-3xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-blue-100 overflow-hidden"
            >
              
              <div className="bg-gradient-to-t from-blue-50 to-white flex justify-center items-center h-64 p-6">
                <img
                  src={obj.image}
                  alt={obj.title}
                  className="h-full w-auto object-contain transition-transform duration-300 group-hover:scale-110"
                />
              </div>

              
              <div className="p-5 text-center">
                <h3 className="text-gray-800 font-semibold text-base mb-2 h-12 overflow-hidden group-hover:text-amber-700 transition-colors duration-300">
                  {obj.title}
                </h3>
                <p className="text-amber-700 font-bold text-lg group-hover:text-amber-900">
                  ₹{obj.price}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

export default MainSection;



// import React, { useEffect, useState } from 'react'
// import axios from "axios"
// import { Link } from 'react-router-dom';




// export default function MainSection() {

//     const [products, setProducts] = useState([]);

//     useEffect(() => {
//         fetchProducts()
//     }, [])

//     async function fetchProducts() {
//         const response = await axios.get("https://fakestoreapi.com/products");
//         setProducts(response.data)
//     }
//     console.log(products);

//     return (
//         <>
//             <main>
//                <div className="products p-6 bg-gray-50">
//   <h2 className="text-center text-3xl font-semibold text-gray-800 mb-10">
//     Products
//   </h2>

//   <div className="products-wrapper flex flex-wrap justify-center gap-6">
//    {products.map((obj) => {
//   return (
//     <Link to={"/product/" + obj.id} key={obj.id}>
//       <div
//         className="product  bg-white p-4 rounded-2xl 
//                    shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 text-center"
//       >
//         <img
//           src={obj.image}
//           alt=""
//           className="w-full h-56 object-contain rounded-xl mb-3"
//         />
//         <h3 className="text-base font-medium text-gray-700 mb-1 truncate">
//           {obj.title}
//         </h3>
//         <p className="text-lg font-semibold text-emerald-600">
//           ${obj.price}
//         </p>
//       </div>
//     </Link>
//   );
// })}

//   </div>
// </div>


//             </main>
//         </>
//     )
// }
