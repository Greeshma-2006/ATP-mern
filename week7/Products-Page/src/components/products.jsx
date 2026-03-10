import Product from "./product";

function Products() {

  const products = [
    {
      productId: 1,
      name: "AirPods Pro",
      price: 249,
      brand: "Apple",
      description: "Active noise cancellation with adaptive transparency mode and spatial audio.",
      image: "https://picsum.photos/seed/airpodspro/400/400"
    },
    {
      productId: 2,
      name: "Galaxy Watch 6",
      price: 299,
      brand: "Samsung",
      description: "Advanced health monitoring with 40 hour battery life.",
      image: "https://picsum.photos/seed/galaxywatch/400/400"
    },
    {
      productId: 3,
      name: "MX Master 3S",
      price: 99,
      brand: "Logitech",
      description: "Ultra-fast scrolling and ergonomic design.",
      image: "https://picsum.photos/seed/mxmaster/400/400"
    },
    {
      productId: 4,
      name: "MacBook Air M3",
      price: 1299,
      brand: "Apple",
      description: "Supercharged by M3 chip with 18-hour battery life.",
      image: "https://picsum.photos/seed/macbookair/400/400"
    },
    {
      productId: 5,
      name: "Sony WH-1000XM5",
      price: 349,
      brand: "Sony",
      description: "Industry-leading noise cancellation.",
      image: "https://picsum.photos/seed/sonywh/400/400"
    },
    {
      productId: 6,
      name: "iPad Mini 6",
      price: 499,
      brand: "Apple",
      description: "Portable with A15 Bionic chip.",
      image: "https://picsum.photos/seed/ipadmini/400/400"
    },
    {
      productId: 7,
      name: "Mechanical Keyboard K3",
      price: 89,
      brand: "Keychron",
      description: "Compact wireless mechanical keyboard.",
      image: "https://picsum.photos/seed/keychron/400/400"
    },
    {
      productId: 8,
      name: "Dell UltraSharp 27\"",
      price: 579,
      brand: "Dell",
      description: "4K IPS display with color accuracy.",
      image: "https://picsum.photos/seed/dellultra/400/400"
    },
    {
      productId: 9,
      name: "Pixel 8 Pro",
      price: 999,
      brand: "Google",
      description: "Google AI built-in with pro camera.",
      image: "https://picsum.photos/seed/pixel8pro/400/400"
    },
    {
      productId: 10,
      name: "Portable SSD T9",
      price: 119,
      brand: "Samsung",
      description: "Blazing-fast 2000MB/s transfer speeds.",
      image: "https://picsum.photos/seed/samsungssd/400/400"
    }
  ];

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {products.map(product => (
        <Product key={product.productId} product={product} />
      ))}
    </div>
  );
}

export default Products;