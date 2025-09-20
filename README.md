# Readify - Online Bookstore

A full-stack e-commerce application for buying books, built with the MERN stack (MongoDB, Express.js, React.js, Node.js).

## Features

### User Features
- User authentication (Sign up, Login)
- Browse books catalog
- View book details
- Add/Remove books to cart
- Add/Remove books to favorites
- Place orders
- View order history
- Update profile settings
- Responsive design

### Admin Features
- Add new books
- Update existing books
- Delete books
- View all orders
- Update order status
- Manage inventory

## Tech Stack

### Frontend
- React.js
- Redux Toolkit (State Management)
- React Router v6
- Tailwind CSS
- Axios

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Bcrypt

## Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/E-Commerce-Store.git
cd E-Commerce-Store
```

2. **Install Backend Dependencies**
```bash
cd backend
npm install
```

3. **Install Frontend Dependencies**
```bash
cd frontend
npm install
```

4. **Environment Setup**
Create a `.env` file in the backend directory:
```env
PORT=5000
URI=mongodb://127.0.0.1:27017/bookstore
```

## Running the Application

1. **Start Backend Server**
```bash
cd backend
npm run dev
```

2. **Start Frontend Development Server**
```bash
cd frontend
npm run dev
```

The application will be available at:
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/v1/sign-up` - Register new user
- `POST /api/v1/sign-in` - Login user

### Books
- `GET /api/v1/get-all-books` - Get all books
- `GET /api/v1/get-book-by-id/:id` - Get specific book
- `POST /api/v1/add-book` - Add new book (Admin only)
- `PUT /api/v1/update-book` - Update book (Admin only)
- `DELETE /api/v1/delete-book` - Delete book (Admin only)

### Cart
- `PUT /api/v1/add-to-cart` - Add book to cart
- `PUT /api/v1/remove-from-cart/:bookid` - Remove book from cart
- `GET /api/v1/get-user-cart` - Get user's cart

### Favorites
- `PUT /api/v1/add-book-to-favourite` - Add to favorites
- `PUT /api/v1/remove-book-from-favourite` - Remove from favorites
- `GET /api/v1/get-favourite-books` - Get user's favorites

### Orders
- `POST /api/v1/place-order` - Place new order
- `GET /api/v1/get-order-history` - Get user's orders
- `GET /api/v1/get-all-orders` - Get all orders (Admin only)
- `PUT /api/v1/update-status/:id` - Update order status (Admin only)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE.md file for details.

## Acknowledgments
- React Icons
- Tailwind CSS
- MongoDB Atlas
- Express.js
