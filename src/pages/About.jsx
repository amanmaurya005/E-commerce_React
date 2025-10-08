import React from 'react'

export default function About() {
  return (
    <div className="about py-16 px-6 bg-white">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
        
      
        <div className="w-full md:w-1/2">
          <img
            src="https://images.unsplash.com/photo-1523275335684-37898b6baf30"
            alt="About our store"
            className="w-full h-[400px] object-cover rounded-2xl shadow-lg"
          />
        </div>

     
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">About Our Store</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Welcome to <span className="font-semibold text-amber-600">ShopEase</span> — your one-stop destination
            for all your shopping needs! We bring you a wide range of high-quality products,
            from fashion to electronics, all at affordable prices.
          </p>
          <p className="text-gray-600 leading-relaxed mb-6">
            Our mission is to make online shopping simple, secure, and enjoyable.
            We believe in providing exceptional customer service and delivering
            products that bring value to your everyday life.
          </p>

          <button className="bg-amber-600 text-white px-6 py-3 rounded-full hover:bg-amber-700 transition-all duration-300">
            Shop Now
          </button>
        </div>
      </div>
    </div>
  )
}
