import Products from "./components/products";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        🛍️ Products Listing Page
      </h1>

      <Products />
    </div>
  );
}

export default App;