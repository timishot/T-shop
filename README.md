📌 T-Shop – E-Commerce Dashboard
🚀 A modern e-commerce dashboard built with Next.js, Redux Toolkit, Tailwind CSS, and ShadCN.


📋 Features
🔹 Product Management Dashboard
✅ Displays sales & analytics with interactive charts
✅ Uses Chart.js for visual data representation
✅ Category-wise sales in a pie chart
✅ Monthly revenue in a bar chart

🔹 Product Table
✅ Paginated product list (10 items per page)
✅ Sorting by category & price
✅ Real-time updates from Redux

🔹 Shopping Cart
✅ Add/Remove items with quantity updates
✅ Cart persists after refresh
✅ Dynamic cart counter in header

🔹 State Management (Redux)
✅ Redux Toolkit for global state
✅ Async thunks (fetchCart & persistCart) for API calls
✅ Loading & error handling with toasts

🔹 Responsive & Accessible UI
✅ ShadCN UI for modals, buttons & forms
✅ Dark mode support
✅ Mobile-friendly navigation with a hamburger menu

🛠 Tech Stack
Next.js (React Framework)
Redux Toolkit (State Management)
Tailwind CSS (Styling)
ShadCN UI (UI Components)
Chart.js (Data Visualization)
TypeScript (Static Typing)
🚀 Installation & Setup
1️⃣ Clone the Repository
sh
Copy
Edit
git clone https://github.com/timishot/T-shop.git
cd T-shop
2️⃣ Install Dependencies
sh
Copy
Edit
npm install
3️⃣ Run the Development Server
sh
Copy
Edit
npm run dev
Visit http://localhost:3000 in your browser.

🌟 Screenshots
Dashboard	Cart Page
📌 API Endpoints
Method	Endpoint	Description
GET	/api/cart	Fetch cart data
POST	/api/cart	Save cart data
📝 Contribution
Feel free to contribute by forking the repository and submitting a pull request.

🔗 License
This project is licensed under the MIT License.
