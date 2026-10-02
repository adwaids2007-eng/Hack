'use client';

import React, { useState } from 'react';
import { Product, Profile } from '../types';

interface AddProductModalProps {
  currentUser: Profile;
  onClose: () => void;
  onProductAdded: (product: Omit<Product, 'id' | 'created_at'>) => void;
}

const CATEGORIES = ['Art', 'Handmade', 'Gifts', 'Fashion', 'Food', 'Digital', 'Customized'];

export const AddProductModal: React.FC<AddProductModalProps> = ({
  currentUser,
  onClose,
  onProductAdded,
}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(CATEGORIES[1]);
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('5');
  const [customizationAvailable, setCustomizationAvailable] = useState(true);
  const [imageUrl, setImageUrl] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !price) return;

    const finalImage =
      imageUrl.trim() ||
      imagePreview ||
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80';

    onProductAdded({
      maker_id: currentUser.id,
      maker_name: currentUser.name,
      maker_rating: 5.0,
      maker_verified: currentUser.verified,
      maker_image: currentUser.profile_image,
      name: name.trim(),
      description: description.trim() || 'Handmade creation by student creator on campus.',
      price: parseFloat(price) || 199,
      category,
      image_url: finalImage,
      available_quantity: parseInt(quantity, 10) || 1,
      customization_available: customizationAvailable,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-on-background/40 backdrop-blur-xs animate-fade-in">
      <div
        className="bg-surface-container-lowest max-w-lg w-full rounded-2xl border border-outline-variant shadow-xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b border-outline-variant/40 bg-surface">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[22px]">add_circle</span>
            <h3 className="text-title-lg font-title-lg text-on-surface">Publish New Creation</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="overflow-y-auto p-5 space-y-4">
          {/* Image Upload / Preview */}
          <div className="space-y-1.5">
            <label className="block text-label-md font-semibold text-on-surface">Product Image</label>
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="w-24 h-24 rounded-xl bg-surface-container border border-dashed border-outline flex items-center justify-center overflow-hidden shrink-0">
                {imagePreview || imageUrl ? (
                  <img
                    src={imagePreview || imageUrl}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="material-symbols-outlined text-outline text-[32px]">photo_camera</span>
                )}
              </div>
              <div className="flex-1 w-full space-y-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="text-xs text-on-surface-variant file:mr-2 file:py-1 file:px-3 file:rounded-lg file:border file:border-primary-container file:bg-surface file:text-primary file:font-medium file:cursor-pointer hover:file:bg-surface-container"
                />
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => {
                    setImageUrl(e.target.value);
                    setImagePreview(null);
                  }}
                  placeholder="Or paste an image web link"
                  className="w-full p-2 text-xs rounded-lg bg-surface border border-outline-variant focus:border-primary-container outline-none"
                />
              </div>
            </div>
          </div>

          {/* Name */}
          <div className="space-y-1">
            <label className="block text-label-md font-semibold text-on-surface">Item Title</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder='e.g., "Customized Resin Name Keychain"'
              className="w-full p-2.5 rounded-lg bg-surface border border-outline-variant focus:border-primary-container text-body-md outline-none"
            />
          </div>

          {/* Description */}
          <div className="space-y-1">
            <label className="block text-label-md font-semibold text-on-surface">Description & Materials</label>
            <textarea
              rows={3}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe what makes this special, materials used, size, and care instructions..."
              className="w-full p-2.5 rounded-lg bg-surface border border-outline-variant focus:border-primary-container text-body-sm outline-none"
            />
          </div>

          {/* Category & Price */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="block text-label-md font-semibold text-on-surface">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2.5 rounded-lg bg-surface border border-outline-variant focus:border-primary-container text-body-sm outline-none"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="block text-label-md font-semibold text-on-surface">Price (₹)</label>
              <input
                type="number"
                required
                min="10"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="₹ 299"
                className="w-full p-2.5 rounded-lg bg-surface border border-outline-variant focus:border-primary-container text-body-md font-semibold text-primary outline-none"
              />
            </div>
          </div>

          {/* Quantity & Customization */}
          <div className="grid grid-cols-2 gap-3 items-center">
            <div className="space-y-1">
              <label className="block text-label-md font-semibold text-on-surface">Available Quantity</label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full p-2.5 rounded-lg bg-surface border border-outline-variant focus:border-primary-container text-body-sm outline-none"
              />
            </div>

            <div className="pt-5 flex items-center gap-2">
              <input
                type="checkbox"
                id="customization"
                checked={customizationAvailable}
                onChange={(e) => setCustomizationAvailable(e.target.checked)}
                className="w-4 h-4 rounded text-primary border-outline-variant focus:ring-primary"
              />
              <label htmlFor="customization" className="text-body-sm text-on-surface cursor-pointer select-none">
                Accepts Customizations
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-primary text-on-primary rounded-lg font-semibold text-label-md hover:bg-primary-container transition-colors shadow-sm active:scale-95"
          >
            Publish Product to Campus Marketplace
          </button>
        </form>
      </div>
    </div>
  );
};
