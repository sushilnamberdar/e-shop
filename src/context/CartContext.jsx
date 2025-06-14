import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { cartAPI } from '../services/api';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // Load cart from API on initial render
  useEffect(() => {
    fetchCart();
  }, []); // Empty dependency array means this runs once on mount

  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await cartAPI.getCart();
      
      if (response && response.items) {
        // Transform the items to match our frontend structure
        const transformedItems = response.items.map(item => {
          return {
            _id: item.product.$oid || item.product, // Handle both ObjectId and string formats
            name: item.name,
            price: item.price,
            image: item.image,
            category: item.category,
            quantity: item.quantity
          };
        });
        
        setCartItems(transformedItems);
        // Calculate total quantity
        const totalQuantity = transformedItems.reduce((total, item) => total + item.quantity, 0);
        setCartCount(totalQuantity);
      } else {
        setCartItems([]);
        setCartCount(0);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
      setCartItems([]);
      setCartCount(0);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (product, quantity = 1) => {
    try {
      console.log('Adding to cart:', product); // Debug log
      // First add to cart via API
      await cartAPI.addToCart({
        _id: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: quantity,
        category: product.category
      });

      // Then refresh the cart to get updated items
      await fetchCart();
      
      toast.success(`${quantity} ${product.name} added to cart!`);
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add item to cart');
    }
  };

  const removeFromCart = async (productId) => {
    try {
      if (!productId) {
        console.error('No product ID provided for removal');
        return;
      }
      await cartAPI.removeFromCart(productId.id);
      await fetchCart(); // Refresh cart after removing item
      toast.success('Item removed from cart');
    } catch (error) {
      console.error('Error removing from cart:', error);
      toast.error('Failed to remove item from cart');
    }
  };

  const updateQuantity = async (productId, quantity) => {
    if (quantity < 1) return;
    
    try {
      if (!productId) {
        console.error('No product ID provided for quantity update');
        return;
      }
      await cartAPI.updateCartQuantity(productId._id, quantity);
      await fetchCart(); // Refresh cart after updating quantity
    } catch (error) {
      console.error('Error updating quantity:', error);
      toast.error('Failed to update quantity');
    }
  };

  const clearCart = async () => {
    try {
      // Remove each item from the cart
      await Promise.all(cartItems.map(item => cartAPI.removeFromCart(item._id)));
      setCartItems([]);
      setCartCount(0);
      toast.success('Cart cleared');
    } catch (error) {
      console.error('Error clearing cart:', error);
      toast.error('Failed to clear cart');
    }
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        loading,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext; 