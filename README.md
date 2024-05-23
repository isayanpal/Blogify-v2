# Blogify

Blogify is a full-stack web application for creating and managing blog posts. It consists of a client-side developed with React and a server-side built with Node.js and Express.

## Tech Stack

### Frontend

- React
- Axios (HTTP Requests)
- React Router (Routing)
- Tailwind CSS (Styling)

### Backend

- Node.js
- Express.js
- MongoDB (Database)
- Mongoose (ORM)
- JWT (Authentication)
- bcrypt (Password Hashing)

## Installation

Follow these steps to set up and run Blogify on your local machine.

### Prerequisites

Ensure you have the following installed:

- Node.js (v14.x or later)
- npm (v6.x or later)
- MongoDB

### Clone the Repository

```bash
git clone https://github.com/isayanpal/Blogify-v2.git
cd Blogify-v2
```

### Server Setup

1. Navigate to the `server` directory:

   ```bash
   cd server
   ```

2. Install server dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the `server` directory and add your MongoDB URI and other environment variables:

   ```plaintext
   MONGODB_URI=your_mongodb_url
   JWT_SECRET=your_jwt_secret
   VITE_URL=http://localhost:3000
   ```

4. Start the server:
   ```bash
   npm run server
   ```

### Client Setup

1. Open a new terminal window and navigate to the `client` directory:

   ```bash
   cd client
   ```

2. Install client dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the `client` directory and add your environment variables:

   ```plaintext
   VITE_API_BASE_URL=http://localhost:5000
   ```

4. Start the client:
   ```bash
   npm run dev
   ```

### Running the Application

The client will be running on `http://localhost:3000` and the server on `http://localhost:5000`.

## Contributing

If you want to contribute to Blogify-v2, please follow these steps:

1. Fork the repository.

2. Create a new branch:

   ```bash
   git checkout -b feature-branch
   ```

3. Make your changes and commit them:

   ```bash
   git commit -m 'Add some feature'
   ```

4. Push to the branch:

   ```bash
   git push origin feature-branch
   ```

5. Open a pull request.
