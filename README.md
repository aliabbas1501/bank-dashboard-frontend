# 🏦 Bank Dashboard — Admin Banking System

A multi-module banking admin dashboard built with Vue.js. Covers real-time transaction tracking, loan management, borrower records, and product listings — all powered by REST API integration and Vue Router for seamless navigation.

🔗 **Live Demo:** [bank-dashboard-frontend-one.vercel.app](https://bank-dashboard-frontend-one.vercel.app)

---

## Screenshots

### Dashboard Overview
![Dashboard](screenshots/dashboard.png)

### Transactions
![Transactions](screenshots/transactions.png)

### Loans
![Loans](screenshots/loans.png)

---

## Features

- Live dashboard with financial summary — total transactions, loans, approval rates
- Transaction tracking with search, pagination, and type filtering
- Loan management with status indicators (Approved / Pending / Rejected)
- Borrower and product modules with dynamic data rendering
- Vue Router for multi-page navigation without page reloads
- REST API integration for real-time data across all modules
- Fully responsive layout with clean admin UI

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Vue.js, Vue Router, CSS3 |
| API | REST API Integration |
| Architecture | Component-Based, Reusable Vue Components |
| Deployment | Vercel |

---

## Getting Started

### Prerequisites
- Node.js v18+

### Installation

```bash
# Clone the repository
git clone https://github.com/aliabbas1501/bank-dashboard.git
cd bank-dashboard

# Install dependencies
npm install

# Run locally
npm run dev
```

App will run at `http://localhost:5173`

---

## Project Structure

```
bank-dashboard/
├── src/
│   ├── components/       # Reusable Vue components
│   ├── views/            # Page-level views (Dashboard, Transactions, Loans, Borrowers, Products)
│   ├── router/           # Vue Router config
│   └── App.vue
```

---

## Modules

| Module | Description |
|--------|-------------|
| Dashboard | Financial summary, quick insights, live API data |
| Transactions | Full transaction history with search & pagination |
| Loans | Loan records with type, amount, status, and duration |
| Borrowers | Borrower profiles and records |
| Products | Available banking products |

---

## Author

**Ali Abbas Awan** — Frontend Developer  
[LinkedIn](https://linkedin.com/in/ali-abbas-dev1) · [GitHub](https://github.com/aliabbas1501)
