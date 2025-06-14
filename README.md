# E-Commerce Website

A full-stack e-commerce application built with React, Node.js, and MongoDB. This project provides a complete shopping experience with features like product browsing, cart management, user authentication, and order processing.

## Features

- 🛍️ **Product Management**
  - Browse products by categories
  - Search products
  - View product details
  - Product filtering and sorting

- 🛒 **Shopping Cart**
  - Add/remove items
  - Update quantities
  - Real-time cart updates
  - Persistent cart data

- 👤 **User Features**
  - User authentication
  - Profile management
  - Order history
  - Wishlist

- 💳 **Checkout Process**
  - Secure payment integration
  - Order confirmation
  - Shipping information
  - Order tracking

## Tech Stack

### Frontend
- React.js
- React Router for navigation
- Context API for state management
- Tailwind CSS for styling
- React Icons
- Axios for API calls

### Backend
- Node.js
- Express.js
- MongoDB
- JWT for authentication
- RESTful API architecture

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/sushilnamberdar/e-shop.git
```

2. Install frontend dependencies
```bash
cd frontend
npm install
```

3. Install backend dependencies
```bash
cd ../backend
npm install
```

4. Create a `.env` file in the backend directory with the following variables:
```env
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=5000
```

5. Start the backend server
```bash
npm run dev
```

6. Start the frontend development server
```bash
cd ../frontend
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `GET /api/products/categories` - Get all categories

### Cart
- `GET /api/cart` - Get user's cart
- `POST /api/cart/add` - Add item to cart
- `DELETE /api/cart/:productId` - Remove item from cart
- `PUT /api/cart/:productId/quantity` - Update item quantity

### Orders
- `GET /api/orders` - Get user's orders
- `POST /api/orders` - Create new order
- `GET /api/orders/:id` - Get order details

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Sushil Namberdar - [@sushilnamberdar](https://github.com/sushilnamberdar)

Project Link: [https://github.com/sushilnamberdar/e-shop](https://github.com/sushilnamberdar/e-shop)
