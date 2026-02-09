# Agri-AgriManage Marketplace 🌾

A comprehensive full-stack marketplace designed to streamline agriculture trade by connecting Farmers, Buyers, and Brokers on a single platform.

---

## 🚀 Key Features by Role

### 👨‍🌾 Farmer Role
- **Crop Listing:** Farmers can list their crops with details like name, price, and quantity.
- **Dashboard:** Track the status of their listed crops (Pending, Live, or Rejected).
- **Order Management:** View orders received for their specific crops.

### 🛒 Buyer Role
- **Marketplace:** Browse live crop listings approved by the Broker.
- **Shopping Cart:** Add multiple items from different farmers into a single cart.
- **Checkout:** Secure checkout process with shipping address and contact details.
- **Order History:** Track the status of their purchases (Shipped, Delivered).

### ⚖️ Broker Role (The Coordinator)
- **Crop Quality Control:** Review farmer submissions to **Accept (Live)** or **Reject** them.
- **Deal Coordination:** Act as a bridge to manage logistics between Farmers and Buyers.
- **Status Management:** Update order lifecycle (**Pending → Shipped → Delivered**).

---

## 🛠 Tech Stack
- **Frontend:** React.js, Tailwind CSS, Lucide-React
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Local Mongoose Setup)
- **State Management:** Redux / Context API
- **Package Manager:** npm

---

## ⚙️ Setup & Installation

Follow these steps to get the project running on your local machine:

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (Latest LTS)
- [MongoDB Community Server](https://www.mongodb.com/try/download/community) (Running locally)

### 2. Clone the Repository
- `git clone https://github.com/Amna-software-engineer/Agriculture-Crops-Management-System-`
- `cd Agriculture-Crops-Management-System`
### 3. Backend Configuration
1. Open a terminal and navigate to the backend directory:
  - `cd backend`
2. Install the necessary dependencies:
- `npm install ` 
3. Create a .env file in the backend root folder and add the following configuration:
- `npm start`
### 4. Frontend Configuration
1. Open a new terminal and navigate to the frontend directory:
- `cd frontend`
2. Install the frontend dependencies:
- `npm install`
3. Start the React development server:
- `npm run dev`

---

## 📄 Submission Components
* **Screenshots:** A detailed PDF document is included in the repository, showcasing the Farmer, Buyer, and Broker dashboards.
* **Demo Video:** A comprehensive walkthrough video demonstrating the full lifecycle from crop listing to order delivery.
* **GitHub Repository:** Clean, modular code with a descriptive commit history.

---

## 👤 Developer Info
* **Name:** Amna Haq 
* **Submission Date:** 10 February 2026
* **Status:** Final Project Submission for Review

---

## 📝 Notes for Reviewer
> [!IMPORTANT]
> Ensure that your local **MongoDB service** is active before starting the backend.
> The application uses local storage/Mongoose, so the database must be running on `localhost:27017`.