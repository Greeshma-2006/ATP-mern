function Product({ product }) {

  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition">

      <img 
        src={product.image} 
        alt={product.name} 
        className="w-full h-48 object-cover rounded-md mb-4"
      />

      <h2 className="text-xl font-semibold">
        {product.name}
      </h2>

      <p className="text-gray-500 text-sm mb-1">
        Brand: {product.brand}
      </p>

      <p className="text-gray-600 text-sm mb-3">
        {product.description}
      </p>

      <p className="text-lg font-bold text-blue-600">
        ${product.price}
      </p>

    </div>
  );
}

export default Product;