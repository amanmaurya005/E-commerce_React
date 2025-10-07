import React from 'react'

export default function Contact() {
  return (
    <div className="contact py-16 px-6 bg-gray-50">
      <div className="max-w-5xl mx-auto text-center mb-10">
        <h2 className="text-3xl font-semibold text-gray-800 mb-3">Contact Us</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Have questions or need help? We’d love to hear from you.  
          Our team is here to assist you with any queries regarding products, orders, or support.
        </p>
      </div>

      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-2xl p-8 md:p-10">
        <form className="flex flex-col gap-6">
          <div className="flex flex-col md:flex-row gap-6">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <input
            type="text"
            placeholder="Subject"
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />

          <textarea
            rows="5"
            placeholder="Your Message"
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
          ></textarea>

          <button
            type="submit"
            className="bg-emerald-600 text-white py-3 px-6 rounded-full w-fit mx-auto hover:bg-emerald-700 transition-all duration-300"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  )
}
