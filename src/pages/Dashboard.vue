<script setup>
import { ref, computed, onMounted } from "vue";

const transactions = ref([]);
const loans = ref([]);
const loading = ref(true);

const borrowers = ref([
  { id: 1, name: "Ali Raza", status: "Active" },
  { id: 2, name: "Sara Khan", status: "Active" },
  { id: 3, name: "Ahmed Bilal", status: "Active" },
  { id: 4, name: "Hina Malik", status: "Inactive" },
  { id: 5, name: "Usman Tariq", status: "Active" },
  { id: 6, name: "Fatima Noor", status: "Active" },
  { id: 7, name: "Danish Javed", status: "Inactive" },
  { id: 8, name: "Ayesha Siddiqui", status: "Active" },
  { id: 9, name: "Hamza Imran", status: "Active" },
  { id: 10, name: "Mariam Saeed", status: "Inactive" }
]);

const products = ref([
  { id: 1, name: "Personal Loan Basic", status: "Available" },
  { id: 2, name: "Home Finance Standard", status: "Available" },
  { id: 3, name: "Car Loan Starter", status: "Available" },
  { id: 4, name: "Education Support Loan", status: "Available" },
  { id: 5, name: "Small Business Growth", status: "Available" },
  { id: 6, name: "Gold Savings Account", status: "Available" },
  { id: 7, name: "Current Account Standard", status: "Available" },
  { id: 8, name: "Fixed Deposit 12 Months", status: "Available" }
]);

const fetchDashboardData = async () => {
  try {
    const [transactionsRes, loansRes] = await Promise.all([
      fetch("https://69c1362b085e1a9fae406626.mockapi.io/transactions"),
      fetch("https://69c1362b085e1a9fae406626.mockapi.io/loans")
    ]);

    const transactionsData = await transactionsRes.json();
    const loansData = await loansRes.json();

    transactions.value = transactionsData;
    loans.value = loansData;
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchDashboardData();
});

const totalTransactions = computed(() => transactions.value.length);
const totalLoans = computed(() => loans.value.length);
const totalBorrowers = computed(() => borrowers.value.length);
const totalProducts = computed(() => products.value.length);

const approvedLoans = computed(() =>
  loans.value.filter((loan) => loan.status?.toLowerCase() === "approved").length
);

const pendingLoans = computed(() =>
  loans.value.filter((loan) => loan.status?.toLowerCase() === "pending").length
);

const rejectedLoans = computed(() =>
  loans.value.filter((loan) => loan.status?.toLowerCase() === "rejected").length
);

const totalTransactionAmount = computed(() => {
  return transactions.value.reduce((sum, item) => {
    return sum + Number(item.amount || 0);
  }, 0);
});

const recentTransactions = computed(() => {
  return [...transactions.value].slice(-5).reverse();
});

const recentLoans = computed(() => {
  return [...loans.value].slice(-5).reverse();
});

const loanApprovalRate = computed(() => {
  if (loans.value.length === 0) return 0;
  return Math.round((approvedLoans.value / loans.value.length) * 100);
});
</script>

<template>
  <div class="dashboard-page">
    <div class="page-header">
      <div>
        <h1 class="title">Dashboard</h1>
        <p class="subtitle">
          A live overview of transactions, loans, borrowers, and products.
        </p>
      </div>

      <button class="primary-btn">Bank Overview</button>
    </div>

    <div v-if="loading" class="loading-wrapper">
      <div class="spinner"></div>
      <p>Loading dashboard data...</p>
    </div>

    <template v-else>
      <div class="stats-grid">
        <div class="stat-card">
          <p class="stat-label">Total Transactions</p>
          <h2 class="stat-value">{{ totalTransactions }}</h2>
          <span class="stat-tag blue">Live API</span>
        </div>

        <div class="stat-card">
          <p class="stat-label">Total Loans</p>
          <h2 class="stat-value">{{ totalLoans }}</h2>
          <span class="stat-tag green">Live API</span>
        </div>

        <div class="stat-card">
          <p class="stat-label">Borrowers</p>
          <h2 class="stat-value">{{ totalBorrowers }}</h2>
          <span class="stat-tag gray">Local Data</span>
        </div>

        <div class="stat-card">
          <p class="stat-label">Products</p>
          <h2 class="stat-value">{{ totalProducts }}</h2>
          <span class="stat-tag purple">Local Data</span>
        </div>
      </div>

      <div class="content-grid">
        <div class="panel">
          <div class="panel-header">
            <h3>Financial Summary</h3>
            <span class="panel-tag">Overview</span>
          </div>

          <div class="overview-grid">
            <div class="overview-box">
              <p class="overview-label">Total Transaction Amount</p>
              <h3>Rs {{ totalTransactionAmount.toLocaleString() }}</h3>
            </div>

            <div class="overview-box">
              <p class="overview-label">Approved Loans</p>
              <h3>{{ approvedLoans }}</h3>
            </div>

            <div class="overview-box">
              <p class="overview-label">Pending Loans</p>
              <h3>{{ pendingLoans }}</h3>
            </div>

            <div class="overview-box">
              <p class="overview-label">Rejected Loans</p>
              <h3>{{ rejectedLoans }}</h3>
            </div>

            <div class="overview-box">
              <p class="overview-label">Loan Approval Rate</p>
              <h3>{{ loanApprovalRate }}%</h3>
            </div>

            <div class="overview-box">
              <p class="overview-label">Active Borrowers</p>
              <h3>
                {{
                  borrowers.filter(
                    (borrower) => borrower.status.toLowerCase() === "active"
                  ).length
                }}
              </h3>
            </div>
          </div>
        </div>

        <div class="panel">
          <div class="panel-header">
            <h3>Quick Insights</h3>
            <span class="panel-tag">Highlights</span>
          </div>

          <div class="insight-list">
            <div class="insight-item">
              <span class="insight-title">Transactions Loaded</span>
              <strong>{{ totalTransactions }}</strong>
            </div>

            <div class="insight-item">
              <span class="insight-title">Loans Loaded</span>
              <strong>{{ totalLoans }}</strong>
            </div>

            <div class="insight-item">
              <span class="insight-title">Products Available</span>
              <strong>{{ totalProducts }}</strong>
            </div>

            <div class="insight-item">
              <span class="insight-title">Approval Rate</span>
              <strong>{{ loanApprovalRate }}%</strong>
            </div>
          </div>
        </div>
      </div>

      <div class="tables-grid">
        <div class="panel table-panel">
          <div class="panel-header">
            <h3>Recent Transactions</h3>
            <span class="panel-tag">Latest 5</span>
          </div>

          <div class="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Date</th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="item in recentTransactions" :key="item.id">
                  <td>#{{ item.id }}</td>
                  <td>
                    <span class="type-badge">{{ item.type }}</span>
                  </td>
                  <td class="amount">Rs {{ item.amount }}</td>
                  <td>{{ item.date }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="panel table-panel">
          <div class="panel-header">
            <h3>Recent Loans</h3>
            <span class="panel-tag">Latest 5</span>
          </div>

          <div class="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Borrower</th>
                  <th>Status</th>
                  <th>Amount</th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="loan in recentLoans" :key="loan.id">
                  <td>#{{ loan.id }}</td>
                  <td>{{ loan.borrowerName }}</td>
                  <td>
                    <span
                      class="status-badge"
                      :class="{
                        approved: loan.status === 'Approved',
                        pending: loan.status === 'Pending',
                        rejected: loan.status === 'Rejected'
                      }"
                    >
                      {{ loan.status }}
                    </span>
                  </td>
                  <td class="amount">Rs {{ loan.amount }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.dashboard-page {
  padding: 32px;
  min-height: 100vh;
  background: #f8fafc;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}

.title {
  margin: 0;
  font-size: 30px;
  font-weight: 700;
  color: #0f172a;
}

.subtitle {
  margin-top: 6px;
  color: #64748b;
  font-size: 15px;
}

.primary-btn {
  border: none;
  background: linear-gradient(135deg, #2563eb, #1d4ed8);
  color: white;
  padding: 12px 18px;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 600;
  box-shadow: 0 10px 20px rgba(37, 99, 235, 0.18);
  transition: 0.2s ease;
}

.primary-btn:hover {
  transform: translateY(-1px);
}

.loading-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  margin-top: 60px;
  color: #64748b;
}

.spinner {
  width: 52px;
  height: 52px;
  border: 5px solid #dbeafe;
  border-top: 5px solid #2563eb;
  border-radius: 50%;
  animation: spin 0.9s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(180px, 1fr));
  gap: 18px;
  margin-bottom: 24px;
}

.stat-card {
  background: white;
  border-radius: 16px;
  padding: 22px;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.07);
}

.stat-label {
  margin: 0 0 10px;
  color: #64748b;
  font-size: 14px;
}

.stat-value {
  margin: 0;
  font-size: 28px;
  color: #0f172a;
}

.stat-tag {
  display: inline-block;
  margin-top: 12px;
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
}

.blue {
  background: #dbeafe;
  color: #1d4ed8;
}

.green {
  background: #dcfce7;
  color: #15803d;
}

.gray {
  background: #e2e8f0;
  color: #475569;
}

.purple {
  background: #ede9fe;
  color: #7c3aed;
}

.content-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
  margin-bottom: 24px;
}

.tables-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.panel {
  background: white;
  border-radius: 18px;
  padding: 22px;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.07);
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-bottom: 18px;
  flex-wrap: wrap;
}

.panel-header h3 {
  margin: 0;
  font-size: 20px;
  color: #0f172a;
}

.panel-tag {
  background: #eff6ff;
  color: #1d4ed8;
  font-size: 13px;
  font-weight: 600;
  padding: 6px 10px;
  border-radius: 999px;
}

.overview-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.overview-box {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  padding: 18px;
}

.overview-label {
  margin: 0 0 10px;
  color: #64748b;
  font-size: 14px;
}

.overview-box h3 {
  margin: 0;
  font-size: 24px;
  color: #0f172a;
}

.insight-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.insight-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 14px 16px;
}

.insight-title {
  color: #475569;
  font-size: 14px;
}

.table-panel {
  overflow: hidden;
}

.table-wrapper {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th {
  text-align: left;
  padding: 14px 12px;
  background: #eff6ff;
  color: #1e3a8a;
  font-size: 14px;
  font-weight: 600;
}

td {
  padding: 14px 12px;
  border-top: 1px solid #e2e8f0;
  color: #334155;
  font-size: 14px;
}

tbody tr:hover {
  background: #f8fafc;
}

.type-badge {
  display: inline-block;
  padding: 6px 10px;
  border-radius: 999px;
  background: #dbeafe;
  color: #1d4ed8;
  font-size: 13px;
  font-weight: 600;
  text-transform: capitalize;
}

.status-badge {
  display: inline-block;
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 600;
}

.approved {
  background: #dcfce7;
  color: #15803d;
}

.pending {
  background: #fef3c7;
  color: #b45309;
}

.rejected {
  background: #fee2e2;
  color: #b91c1c;
}

.amount {
  font-weight: 600;
  color: #0f172a;
}

@media (max-width: 1100px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .content-grid,
  .tables-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 700px) {
  .stats-grid,
  .overview-grid {
    grid-template-columns: 1fr;
  }

  .title {
    font-size: 26px;
  }
}
</style>