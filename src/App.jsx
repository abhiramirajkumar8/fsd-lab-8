
import { useEffect, useState } from "react";
import ProductCard from "./components/ProductCard";
import ProductForm from "./components/ProductForm";
import "./App.css";

const initialProducts = [
  {
    id: 1,
    name: "Floral Anarkali",
    category: "Ethnic",
    price: 850,
    condition: "Like New",
    size: "M",
    type: "Sell",
    image: "https://img.perniaspopupshop.com/catalog/product/c/a/CALMN062317_4.jpg?impolicy=zoomimage",
    description: "A beautiful floral Anarkali, perfect for festive occasions and celebrations.",
  },
  {
    id: 2,
    name: "Elegant Evening Dress",
    category: "Dresses",
    price: 650,
    condition: "Excellent",
    size: "S",
    type: "Rent",
    image: "https://pub-98d071d737284f25a6285c558582c6f1.r2.dev/preview/ab4adbea-da14-4eea-b38d-7aa4bbdf5cb9.jpg",
    description: "An elegant evening dress for parties and special occasions.",
  },
  {
    id: 3,
    name: "Summer Boho Dress",
    category: "Dresses",
    price: 450,
    condition: "Like New",
    size: "M",
    type: "Sell",
    image: "https://img.ltwebstatic.com/v4/j/pi/2026/06/03/60/17804664102b9aada823c8338dc1b544b408fe6c1b_thumbnail_900x.webp",
    description: "A comfortable summer dress for casual outings and holidays.",
  },
  {
    id: 4,
    name: "Pastel Designer Lehenga",
    category: "Ethnic",
    price: 1200,
    condition: "Excellent",
    size: "M",
    type: "Rent",
    image: "https://anushreereddydesign.com/cdn/shop/files/ARMAR2563_600x.jpg?v=1744612256",
    description: "A pastel designer lehenga for weddings and celebrations.",
  },
  {
    id: 5,
    name: "Casual Chic Outfit",
    category: "Western",
    price: 550,
    condition: "Like New",
    size: "S",
    type: "Donate",
    image: "https://thefoldline.com/cdn/shop/files/Barbro1.jpg?v=1771427473&width=1333",
    description: "A stylish casual outfit looking for a new home.",
  },
  {
    id: 6,
    name: "Elegant Beige Co-ord",
    category: "Western",
    price: 700,
    condition: "Excellent",
    size: "L",
    type: "Sell",
    image: "https://dam.elcorteingles.es/producto/www-8431283577910-01.jpg",
    description: "A timeless beige co-ord set for a polished everyday look.",
  },
];

function App() {
  const [products, setProducts] = useState(() => {
    try {
      const savedProducts = localStorage.getItem("closetcycle-products-v2");
      return savedProducts ? JSON.parse(savedProducts) : initialProducts;
    } catch {
      return initialProducts;
    }
  });

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [listingType, setListingType] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    localStorage.setItem(
      "closetcycle-products-v2",
      JSON.stringify(products)
    );
  }, [products]);

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.category.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || product.category === category;

    const matchesType =
      listingType === "All" || product.type === listingType;

    return matchesSearch && matchesCategory && matchesType;
  });

  const handleSave = (productData) => {
    if (editingProduct) {
      setProducts((previous) =>
        previous.map((product) =>
          product.id === editingProduct.id ? productData : product
        )
      );
      setMessage("Your listing has been updated successfully.");
    } else {
      setProducts((previous) => [productData, ...previous]);
      setMessage("Your new outfit has been added successfully.");
    }

    setShowForm(false);
    setEditingProduct(null);
    setSelectedProduct(null);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowForm(true);
    setSelectedProduct(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this listing?"
    );

    if (confirmed) {
      setProducts((previous) =>
        previous.filter((product) => product.id !== id)
      );
      setSelectedProduct(null);
      setMessage("Listing deleted successfully.");
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  const handleListingAction = (product) => {
    if (product.type === "Sell") {
      alert(
        `You selected "${product.name}" for purchase at ₹${Number(
          product.price
        ).toLocaleString("en-IN")}. This is a demonstration; checkout is not connected.`
      );
    } else if (product.type === "Rent") {
      alert(
        `You selected "${product.name}" for rent at ₹${Number(
          product.price
        ).toLocaleString("en-IN")} per day. This is a demonstration; booking is not connected.`
      );
    } else {
      alert(
        `You selected "${product.name}" for donation. This is a demonstration; donation requests are not connected.`
      );
    }
  };

  const getActionLabel = (type) => {
    if (type === "Rent") return "Rent Now";
    if (type === "Donate") return "Request Donation";
    return "Buy Now";
  };

  return (
    <div className="website">
      <div className="announcement">
        Give fashion a second life. Discover, rent and reuse.
      </div>

      <nav className="navbar">
        <a href="#home" className="brand">
          ClosetCycle<span>.</span>
        </a>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#collection">Explore</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>

        <button
          className="nav-button"
          onClick={() => {
            setEditingProduct(null);
            setShowForm(true);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          + List an Item
        </button>
      </nav>

      <section className="hero" id="home">
        <div className="hero-content">
          <p className="eyebrow">PRE-LOVED. RE-LOVED.</p>

          <h1>
            Fashion has
            <br />
            another <em>life.</em>
          </h1>

          <p className="hero-description">
            Discover beautiful pre-loved outfits, give your
            wardrobe a fresh start and make fashion more
            sustainable.
          </p>

          <a href="#collection" className="primary-button">
            Explore Collection
          </a>

          <p className="hero-note">
            Wear more. Waste less. Repeat.
          </p>
        </div>

        <div className="hero-image-wrap">
          <img
  src="/closetcycle-hero.png"
  alt="Elegant ClosetCycle fashion model"
  className="hero-image"
/>
        </div>
      </section>

      <section className="collection" id="collection">
        <div className="section-heading">
          <p className="eyebrow">THE CLOSET EDIT</p>
          <h2>Find your next favourite.</h2>
          <p>Handpicked styles waiting for a new home.</p>
        </div>

        <div className="collection-controls">
          <div className="category-filters">
            {["All", "Ethnic", "Dresses", "Western", "Accessories"].map(
              (item) => (
                <button
                  key={item}
                  className={
                    category === item
                      ? "filter-button active"
                      : "filter-button"
                  }
                  onClick={() => setCategory(item)}
                >
                  {item}
                </button>
              )
            )}
          </div>

          <input
            className="search-input"
            type="search"
            placeholder="Search outfits..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>

        <div className="type-filters">
          <span>Explore by:</span>
          {["All", "Sell", "Rent", "Donate"].map((item) => (
            <button
              key={item}
              className={
                listingType === item
                  ? "type-filter active"
                  : "type-filter"
              }
              onClick={() => setListingType(item)}
            >
              {item === "Sell" ? "Buy" : item}
            </button>
          ))}
        </div>

        {message && (
          <div className="success-message">
            {message}
            <button onClick={() => setMessage("")}>×</button>
          </div>
        )}

        <div className="product-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onView={setSelectedProduct}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))
          ) : (
            <p className="no-products">
              No outfits found. Try another search or filter.
            </p>
          )}
        </div>
      </section>

      {showForm && (
        <section className="form-section" id="listing-form">
          <ProductForm
            onSave={handleSave}
            editingProduct={editingProduct}
            onCancel={handleCancel}
          />
        </section>
      )}

      {selectedProduct && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="product-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setSelectedProduct(null)}
              aria-label="Close product details"
            >
              ×
            </button>

            <img
              src={selectedProduct.image || "https://placehold.co/600x800?text=ClosetCycle"}
              alt={selectedProduct.name}
              className="modal-image"
            />

            <div className="modal-details">
              <p className="eyebrow">
                {selectedProduct.category}
              </p>

              <h2>{selectedProduct.name}</h2>

              <p className="modal-price">
                {selectedProduct.type === "Donate"
                  ? "FREE"
                  : `₹${Number(selectedProduct.price).toLocaleString("en-IN")}${
                      selectedProduct.type === "Rent" ? " / day" : ""
                    }`}
              </p>

              <p><strong>Condition:</strong> {selectedProduct.condition}</p>
              <p><strong>Size:</strong> {selectedProduct.size}</p>
              <p><strong>Listing:</strong> {selectedProduct.type === "Sell" ? "For Sale" : selectedProduct.type === "Rent" ? "For Rent" : "Free Donation"}</p>

              <p className="modal-description">
                {selectedProduct.description || "A lovely pre-loved outfit waiting for its next owner."}
              </p>

              <button
                className="primary-button modal-action"
                onClick={() => handleListingAction(selectedProduct)}
              >
                {getActionLabel(selectedProduct.type)}
              </button>

              <p className="demo-note">
                Demo application: orders, rental bookings and donation requests
                are not connected to a payment or delivery service.
              </p>
            </div>
          </div>
        </div>
      )}

      <section className="about-section" id="about">
        <div className="about-image">
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=900"
            alt="Fashion boutique"
          />
        </div>

        <div className="about-content">
          <p className="eyebrow">OUR STORY</p>
          <h2>
            Good style.
            <br />
            Better choices.
          </h2>

          <p>
            ClosetCycle is built on a simple idea: fashion
            should be enjoyed, not wasted. We bring together
            people who want to buy, rent, sell and donate
            beautiful outfits.
          </p>

          <p>
            From special occasion wear to everyday fashion,
            give pre-loved clothing another chance to shine.
          </p>

          <a href="#collection" className="primary-button">
            Discover More
          </a>
        </div>
      </section>

      <section className="newsletter" id="contact">
        <p className="eyebrow">STAY IN THE LOOP</p>
        <h2>A little fashion inspiration.</h2>
        <p>
          Subscribe for updates, new arrivals and sustainable fashion inspiration.
        </p>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            alert("Thank you for subscribing to ClosetCycle!");
            event.target.reset();
          }}
        >
          <input
            type="email"
            placeholder="Enter your email address"
            required
          />
          <button type="submit">Subscribe</button>
        </form>
      </section>

      <footer className="footer">
        <div>
          <a href="#home" className="brand">
            ClosetCycle<span>.</span>
          </a>
          <p>Giving fashion another life, one outfit at a time.</p>
        </div>

        <div className="footer-links">
          <a href="#home">Home</a>
          <a href="#collection">Collection</a>
          <a href="#about">About Us</a>
          <a href="#contact">Contact</a>
        </div>

        <p className="copyright">
          © 2026 ClosetCycle. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default App;
