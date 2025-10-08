import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

export default function SingleProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [convertedPrice, setConvertedPrice] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  async function fetchProduct() {
    // Fetch product details
    const response = await axios.get(
      "https://fakestoreapi.com/products/" + id
    );

    if (response.data && response.data.id) {
      setProduct(response.data);
      setNotFound(false);

      // Fetch conversion rate USD → INR
      const conversion = await axios.get(
        "https://api.exchangerate.host/latest?base=USD&symbols=INR"
      );

      const rate = conversion.data?.rates?.INR || 88; // fallback rate
      console.log("USD → INR rate:", rate);

      setConvertedPrice((response.data.price * rate).toFixed(2));
    } else {
      setNotFound(true);
    }
  }

  if (notFound)
    return (
      <div className="flex items-center justify-center h-120 bg-gradient-to-b from-gray-100 to-gray-200">
        <p className="text-gray-600 text-2xl ">Product not Found</p>
      </div>
    );

  if (!product)
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-b from-gray-100 to-gray-200">
        <p className="text-gray-600 text-xl animate-pulse">
          Loading product...
        </p>
      </div>
    );

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 py-16 px-6">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
      
        <div className="flex items-center justify-center bg-gray-50 p-10">
          <img
            src={product.image}
            alt={product.title}
            className="h-80 md:h-96 object-contain transition-transform duration-300 hover:scale-105"
          />
        </div>

        
        <div className="p-10 flex flex-col justify-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            {product.title}
          </h1>

          
          <p className="text-amber-600 text-2xl font-semibold mb-6">
            {convertedPrice ? "₹" + convertedPrice :  "$" + product.price}
          </p>

         
          <p className="text-gray-700 leading-relaxed mb-8">
            {product.description}
          </p>

          
          <span className="inline-block bg-emerald-100 text-amber-700 px-4 py-1 rounded-full text-sm font-medium mb-6 capitalize">
            {product.category}
          </span>

          
          <div className="flex flex-wrap items-center gap-4">
            <Link
              to="/"
              className="bg-gray-200 text-gray-700 px-6 py-3 rounded-full font-semibold shadow-sm hover:bg-gray-300 transition-all duration-300"
            >
              Back to Products
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}






































// import React, { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import axios from "axios";

// export default function SingleProduct() {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//    const [notFound, setNotFound] = useState(false);

//  useEffect(() => {
//   fetchProduct();
// }, [id]);

// async function fetchProduct() {
//   const response = await axios.get("https://fakestoreapi.com/products/" + id);
//  if (response.data && response.data.id) {
//       setProduct(response.data);
//       setNotFound(false);
//     } else {
//       setNotFound(true);
//     }
// }


//   if(notFound)
//       return(
//        <div className="flex items-center justify-center h-80 bg-gradient-to-b from-gray-100 to-gray-200">
//         <p className="text-gray-600 text-2xl "> product not Found</p>
//       </div>
//     )

//   if (!product)
//     return (
//       <div className="flex items-center justify-center h-screen bg-gradient-to-b from-gray-100 to-gray-200">
//         <p className="text-gray-600 text-xl animate-pulse">Loading product...</p>
//       </div>
//     );

//   return (
//     <main className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 py-16 px-6">
//       <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
    
//         <div className="flex items-center justify-center bg-gray-50 p-10">
//           <img
//             src={product.image}
//             alt={product.title}
//             className="h-80 md:h-96 object-contain transition-transform duration-300 hover:scale-105"
//           />
//         </div>

       
//         <div className="p-10 flex flex-col justify-center">
//           <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
//             {product.title}
//           </h1>
//           <p className="text-amber-600 text-2xl font-semibold mb-6">
//             ${product.price}
//           </p>
//           <p className="text-gray-700 leading-relaxed mb-8">
//             {product.description}
//           </p>

         
//           <span className="inline-block bg-emerald-100 text-amber-700 px-4 py-1 rounded-full text-sm font-medium mb-6 capitalize">
//             {product.category}
//           </span>

      
//           <div className="flex flex-wrap items-center gap-4">
                
//             <Link
//               to="/"
//               className="bg-gray-200 text-gray-700 px-6 py-3 rounded-full font-semibold shadow-sm hover:bg-gray-300 transition-all duration-300"
//             >
//               Back to Products          
//             </Link>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }
