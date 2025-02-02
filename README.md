# 📌 T-Shop – E-Commerce Dashboard  
🚀 A modern e-commerce dashboard built with Next.js, Redux Toolkit, Tailwind CSS, and ShadCN.  

![Dashboard Preview](https://via.placeholder.com/1200x600.png?text=T-Shop+Dashboard)  

---

## 🛠 Installation & Setup  

### 1️⃣ Clone the Repository  
```sh
git clone https://github.com/timishot/T-shop.git
cd T-shop


### 2️⃣ Install Dependencies
```sh
npm install

3️⃣ Run the Development Server
```sh
npm run dev
Visit http://localhost:3000 in your browser.

📋 Features
🔹 Product Management Dashboard
sh
Copy
Edit
# Displays sales & analytics with interactive charts
# Uses Chart.js for visual data representation
# Category-wise sales in a pie chart
# Monthly revenue in a bar chart

🔹 Product Table
sh
Copy
Edit
# Paginated product list (10 items per page)
# Sorting by category & price
# Real-time updates from Redux
🔹 Shopping Cart
sh
Copy
Edit
# Add/Remove items with quantity updates
# Cart persists after refresh
# Dynamic cart counter in header
🔹 State Management (Redux)
sh
Copy
Edit
# Redux Toolkit for global state
# Async thunks (fetchCart & persistCart) for API calls
# Loading & error handling with toasts
🔹 Responsive & Accessible UI
sh
Copy
Edit
# ShadCN UI for modals, buttons & forms
# Dark mode support
# Mobile-friendly navigation with a hamburger menu
📌 API Endpoints
sh
Copy
Edit
# GET  /api/cart       -> Fetch cart data
# POST /api/cart       -> Save cart data
🌟 Screenshots
sh
Copy
Edit
# Dashboard Preview: 
![Dashboard](https://via.placeholder.com/600x300.png?text=Dashboard)

# Cart Page Preview:
![Cart](https://via.placeholder.com/600x300.png?text=Cart)
📝 Contribution
sh
Copy
Edit
# Fork the repository
git fork https://github.com/timishot/T-shop.git

# Clone your fork
git clone https://github.com/YOUR_GITHUB_USERNAME/T-shop.git

# Create a new branch
git checkout -b feature-branch

# Make changes and commit
git add .
git commit -m "Added new feature"

# Push to your fork
git push origin feature-branch

# Create a Pull Request on GitHub
🔗 License
sh
Copy
Edit
# This project is licensed under the MIT License.
