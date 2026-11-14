
import { useEffect, useState } from "react";

const emptyForm = {
  name: "",
  category: "Ethnic",
  price: "",
  condition: "Like New",
  size: "M",
  type: "Sell",
  image: "",
  description: "",
};

function ProductForm({ onSave, editingProduct, onCancel }) {
  const [formData, setFormData] = useState(emptyForm);

  useEffect(() => {
    if (editingProduct) {
      setFormData({
        ...emptyForm,
        ...editingProduct,
        price: editingProduct.type === "Donate"
          ? "0"
          : String(editingProduct.price),
      });
    } else {
      setFormData(emptyForm);
    }
  }, [editingProduct]);

  const handleChange = (event) => {
  const { name, value } = event.target;

  setFormData((previous) => ({
    ...previous,
    [name]: value,
    ...(name === "type" && value === "Donate"
      ? { price: "0" }
      : name === "type" && previous.type === "Donate"
        ? { price: "" }
        : {}),
  }));
};

  const handleSubmit = (event) => {
    event.preventDefault();

    onSave({
      ...formData,
      price: formData.type === "Donate" ? 0 : Number(formData.price),
      id: editingProduct?.id || Date.now(),
    });

    setFormData(emptyForm);
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <h2>{editingProduct ? "Edit Your Listing" : "List Your Outfit"}</h2>
      <p className="form-intro">
        Give your outfit another life with ClosetCycle.
      </p>

      <label>Product Name</label>
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Example: Floral Anarkali"
        required
      />

      <label>Category</label>
      <select
        name="category"
        value={formData.category}
        onChange={handleChange}
      >
        <option>Ethnic</option>
        <option>Dresses</option>
        <option>Western</option>
        <option>Accessories</option>
      </select>

      <label>Listing Type</label>
      <div className="radio-options">
        {["Sell", "Rent", "Donate"].map((type) => (
          <label key={type}>
            <input
              type="radio"
              name="type"
              value={type}
              checked={formData.type === type}
              onChange={handleChange}
            />
            {type === "Sell" ? "Buy / Sell" : type}
          </label>
        ))}
      </div>

      {formData.type !== "Donate" ? (
        <>
          <label>
            {formData.type === "Rent"
              ? "Rental Price per Day (₹)"
              : "Selling Price (₹)"}
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            min="1"
            placeholder="Enter amount in rupees"
            required
          />
        </>
      ) : (
        <p className="donation-note">
          This item will be listed as FREE. No price is required.
        </p>
      )}

      <label>Condition</label>
      <select
        name="condition"
        value={formData.condition}
        onChange={handleChange}
      >
        <option>Like New</option>
        <option>Excellent</option>
        <option>Good</option>
      </select>

      <label>Size</label>
      <select
        name="size"
        value={formData.size}
        onChange={handleChange}
      >
        <option>XS</option>
        <option>S</option>
        <option>M</option>
        <option>L</option>
        <option>XL</option>
        <option>Free Size</option>
      </select>

      <label>Image URL</label>
      <input
        type="url"
        name="image"
        value={formData.image}
        onChange={handleChange}
        placeholder="Paste an image URL"
      />

      <label>Description</label>
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Describe the outfit, material, occasion..."
        rows="4"
      />

      <div className="form-actions">
        <button type="submit">
          {editingProduct ? "Update Listing" : "Add Listing"}
        </button>

        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default ProductForm;
