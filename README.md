# 🍴 Foody

Foody is a full-stack food discovery platform where users can discover food through short-form videos, like and save their favorite food content, and visit food partner stores. Food partners can register their businesses and showcase their food through videos.

## ✨ Features

### 👤 User Features
- User registration and login
- Discover food through a vertical video feed
- Like food videos
- Save favorite food videos
- View saved videos
- Visit food partner stores
- Secure logout

### 🏪 Food Partner Features
- Food partner registration and login
- Restaurant/business profile
- Upload food videos
- Add food name and description
- Preview videos before publishing
- Showcase food to potential customers
- Partner-specific access

### 🔐 Authentication
- Separate User and Food Partner authentication
- JWT-based authentication
- HTTP-only cookies
- Role-based protected routes
- Secure production authentication

## 🛠️ Tech Stack

**Frontend**
- React.js
- React Router
- Axios
- Vite
- CSS

**Backend**
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- CORS

**Media & Deployment**
- ImageKit
- Vercel
- Render

## 🏗️ Architecture

```text
                    User
                      │
                      ▼
              React + Vite
                 (Vercel)
                      │
                    /api
                      │
                      ▼
             Node.js + Express
                 (Render)
                      │
              ┌───────┴───────┐
              ▼               ▼
           MongoDB         ImageKit
          Database       Media Storage
```
## 📂 Project Structure
```text
foody/
│
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   │   ├── auth/
│   │   │   ├── general/
│   │   │   └── create-food/
│   │   ├── routes/
│   │   ├── services/
│   │   └── styles/
│   ├── vercel.json
│   └── package.json
│
└── backend/
    ├── src/
    │   ├── controllers/
    │   ├── models/
    │   ├── routes/
    │   ├── middleware/
    │   └── db/
    ├── server.js
    └── package.json
```
## 🌐 Live Demo
https://foody-theta-one.vercel.app/

## ⚙️ Run Locally
### Clone the Repository
```text
git clone https://github.com/himanshu-ch-2005/foody.git
cd foody
```
### Backend Setup
```text
cd backend
npm install
npm start
```
Create a .env file inside the backend folder:
```text
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
NODE_ENV=development
```
### Frontend Setup
Open another terminal:
```text
cd frontend
npm install
npm run dev
```
## 🚀 Deployment
### Frontend
- Vercel
- Vite
- Root Directory: frontend
### Backend
- Render
- Node.js
- Root Directory: backend
- Build Command: npm install
- Start Command: npm start
### Database
- MongoDB
### Media Storage
- ImageKit
The production frontend uses a Vercel rewrite to route /api/* requests to the deployed backend.
## 🔮 Future Recommendations
### 🤖 Personalized Food Recommendations
Recommend food and restaurants based on user likes, saves, viewing history, preferences, and location.
### 📍 Location-Based Discovery
Show nearby restaurants and food partners based on the user's location.
### 🔎 Advanced Search & Filtering
Allow users to search and filter food by:
- Food name
- Cuisine
- Price
- Restaurant
- Location
- Rating
### ⭐ Ratings & Reviews
Allow users to rate dishes and restaurants and share reviews.
### ❤️ Follow System
Allow users to follow their favorite food partners and receive updates when new content is published.
### 🔔 Notifications
Notify users about new videos, restaurant updates, offers, likes, and other interactions.
### 📊 Food Partner Analytics
Provide partners with analytics such as:
- Video views
- Likes
- Saves
- Customer engagement
- Most popular dishes
### 🛒 Online Ordering
Allow users to order food directly from food partner stores.
### 💳 Payment Integration
Add secure online payment functionality for food orders.
### 🧠 AI-Powered Features
Potential AI capabilities include:
- Personalized food recommendations
- Intelligent restaurant recommendations
- AI-powered food discovery
- Food image/video analysis
- AI chatbot for food and restaurant queries
## 🤝 Contributing
Contributions are welcome.
```text
git checkout -b feature/your-feature
git add .
git commit -m "Add your feature"
git push origin feature/your-feature
```

Then create a Pull Request.
## 👨‍💻 Author
Himanshu Chaudhary
