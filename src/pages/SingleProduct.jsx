import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

export default function SingleProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [convertedPrice, setConvertedPrice] = useState(null);
  const [currency, setCurrency] = useState(localStorage.getItem("currency") || "inr");
  const [quantity, setQuantity] = useState(1); // ✅ quantity state

  useEffect(() => {
    fetchProduct();
  }, [id]);

  // Listen for currency change
  useEffect(() => {
    const handleChange = () => setCurrency(localStorage.getItem("currency") || "inr");
    window.addEventListener("currencyChange", handleChange);
    return () => window.removeEventListener("currencyChange", handleChange);
  }, []);

  async function fetchProduct() {
    const response = await axios.get("https://fakestoreapi.com/products/" + id);
    if (response.data && response.data.id) {
      setProduct(response.data);
      setNotFound(false);

      // USD → INR conversion
      const conversion = await axios.get("https://api.exchangerate.host/latest?base=USD&symbols=INR");
      const rate = conversion.data?.rates?.INR || 88;
      setConvertedPrice((response.data.price * rate).toFixed(2));
    } else {
      setNotFound(true);
    }
  }

  // ✅ Add to Cart with Quantity
  function addToCart() {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

    // check if product already exists
    const index = existingCart.findIndex((item) => item.id === product.id);
    if (index !== -1) {
      // update quantity
      existingCart[index].quantity += quantity;
    } else {
      // add new product with selected quantity
      existingCart.push({
        id: product.id,
        title: product.title,
        image: product.image,
        priceUsd: product.price,
        priceInr: convertedPrice,
        quantity: quantity,
      });
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));
    alert(`🛒 ${quantity} item(s) added to cart!`);
  }

  // quantity increment/decrement
  function increase() {
    setQuantity((prev) => prev + 1);
  }

  function decrease() {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1)); // minimum 1
  }

  if (notFound)
    return (
      <div className="flex items-center justify-center h-120 bg-gradient-to-b from-gray-100 to-gray-200">
        <p className="text-gray-600 text-2xl">Product not Found</p>
      </div>
    );

  if (!product)
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-b from-gray-100 to-gray-200">
        <p className="text-gray-600 text-xl animate-pulse">Loading product...</p>
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
            {currency === "inr" ? "₹" + convertedPrice : "$" + product.price}
          </p>

          <p className="text-gray-700 leading-relaxed mb-8">{product.description}</p>

          <span className="inline-block bg-emerald-100 text-amber-700 px-4 py-1 rounded-full text-sm font-medium mb-6 capitalize">
            {product.category}
          </span>

          {/* ✅ Quantity Selector */}
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={decrease}
              className="px-3 py-2 bg-gray-200 text-gray-800 rounded-full text-lg font-bold hover:bg-gray-300 transition"
            >
              -
            </button>
            <span className="text-xl font-semibold">{quantity}</span>
            <button
              onClick={increase}
              className="px-3 py-2 bg-gray-200 text-gray-800 rounded-full text-lg font-bold hover:bg-gray-300 transition"
            >
              +
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={addToCart}
              className="bg-amber-500 text-amber-900 px-6 py-3 rounded-full font-semibold shadow-sm hover:bg-amber-400 transition-all duration-300"
            >
              Add to Cart
            </button>

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
// import { useParams, Link, useNavigate } from "react-router-dom";
// import axios from "axios";

// export default function SingleProduct() {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const [notFound, setNotFound] = useState(false);
//   const [convertedPrice, setConvertedPrice] = useState(null);
//   const [currency, setCurrency] = useState(localStorage.getItem("currency") || "inr");
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchProduct();
//   }, [id]);

//   // Listen for currency change
//   useEffect(() => {
//     const handleChange = () => setCurrency(localStorage.getItem("currency") || "inr");
//     window.addEventListener("currencyChange", handleChange);
//     return () => window.removeEventListener("currencyChange", handleChange);
//   }, []);

//   async function fetchProduct() {
//     const response = await axios.get("https://fakestoreapi.com/products/" + id);
//     if (response.data && response.data.id) {
//       setProduct(response.data);
//       setNotFound(false);

//       // USD → INR conversion
//       const conversion = await axios.get("https://api.exchangerate.host/latest?base=USD&symbols=INR");
//       const rate = conversion.data?.rates?.INR || 88;
//       setConvertedPrice((response.data.price * rate).toFixed(2));
//     } else {
//       setNotFound(true);
//     }
//   }

//   // ✅ Add to Cart Function
//   function addToCart() {
//     const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
//     // Prevent duplicate entries
//     if (!existingCart.includes(product.id)) {
//       existingCart.push(product.id);
//       localStorage.setItem("cart", JSON.stringify(existingCart));
//     }

//     alert("🛒 Product added to cart!");
//     // Optionally navigate to cart page:
//     // navigate("/cart");
//   }

//   if (notFound)
//     return (
//       <div className="flex items-center justify-center h-120 bg-gradient-to-b from-gray-100 to-gray-200">
//         <p className="text-gray-600 text-2xl">Product not Found</p>
//       </div>
//     );

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
//             {currency === "inr" ? "₹" + convertedPrice : "$" + product.price}
//           </p>

//           <p className="text-gray-700 leading-relaxed mb-8">{product.description}</p>

//           <span className="inline-block bg-emerald-100 text-amber-700 px-4 py-1 rounded-full text-sm font-medium mb-6 capitalize">
//             {product.category}
//           </span>

//           <div className="flex flex-wrap items-center gap-4">
//             <button
//               onClick={addToCart}
//               className="bg-amber-500 text-amber-900 px-6 py-3 rounded-full font-semibold shadow-sm hover:bg-amber-400 transition-all duration-300"
//             >
//               Add to Cart
//             </button>

//             <Link
//               to="/cart"
//               className="bg-emerald-500 text-white px-6 py-3 rounded-full font-semibold shadow-sm hover:bg-emerald-400 transition-all duration-300"
//             >
//               Go to Cart
//             </Link>

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
