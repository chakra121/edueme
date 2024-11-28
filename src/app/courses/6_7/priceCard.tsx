import React from 'react'

const PriceCard = () => {
  return (
<div className="absolute z-20 p-16 h-screen bg-cover bg-center">
  {/* <!-- Sticky Price Card --> */}
  <div className="sticky top-1/2 left-0 transform -translate-y-1/2 bg-black text-white p-4 rounded-lg shadow-lg w-48">
    <div className="text-center text-2xl font-bold mb-2">₹399</div>
    <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded">
      Add to Cart
    </button>
  </div>
</div>


  )
}

export default PriceCard