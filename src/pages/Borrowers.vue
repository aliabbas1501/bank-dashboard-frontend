<script setup>
import { ref, computed, watch } from "vue";

const borrowers = ref([
  {
    id: 1,
    name: "Ali Raza",
    phone: "0301 1234567",
    email: "ali.raza@email.com",
    loanType: "Personal Loan",
    status: "Active"
  },
  {
    id: 2,
    name: "Sara Khan",
    phone: "0302 2345678",
    email: "sara.khan@email.com",
    loanType: "Home Finance",
    status: "Active"
  },
  {
    id: 3,
    name: "Ahmed Bilal",
    phone: "0303 3456789",
    email: "ahmed.bilal@email.com",
    loanType: "Car Loan",
    status: "Active"
  },
  {
    id: 4,
    name: "Hina Malik",
    phone: "0304 4567890",
    email: "hina.malik@email.com",
    loanType: "Education Loan",
    status: "Inactive"
  },
  {
    id: 5,
    name: "Usman Tariq",
    phone: "0305 5678901",
    email: "usman.tariq@email.com",
    loanType: "Business Loan",
    status: "Active"
  },
  {
    id: 6,
    name: "Fatima Noor",
    phone: "0306 6789012",
    email: "fatima.noor@email.com",
    loanType: "Personal Loan",
    status: "Active"
  },
  {
    id: 7,
    name: "Danish Javed",
    phone: "0307 7890123",
    email: "danish.javed@email.com",
    loanType: "Home Finance",
    status: "Inactive"
  },
  {
    id: 8,
    name: "Ayesha Siddiqui",
    phone: "0308 8901234",
    email: "ayesha.siddiqui@email.com",
    loanType: "Car Loan",
    status: "Active"
  },
  {
    id: 9,
    name: "Hamza Imran",
    phone: "0309 9012345",
    email: "hamza.imran@email.com",
    loanType: "Business Loan",
    status: "Active"
  },
  {
    id: 10,
    name: "Mariam Saeed",
    phone: "0310 0123456",
    email: "mariam.saeed@email.com",
    loanType: "Education Loan",
    status: "Inactive"
  }
]);

const loading = ref(false);
const currentPage = ref(1);
const itemsPerPage = 5;
const searchQuery = ref("");

watch(searchQuery, () => {
  currentPage.value = 1;
});

const filteredBorrowers = computed(() => {
  const query = searchQuery.value.toLowerCase().trim();

  if (!query) {
    return borrowers.value;
  }

  return borrowers.value.filter((item) => {
    return (
      item.id.toString().includes(query) ||
      item.name.toLowerCase().includes(query) ||
      item.phone.toLowerCase().includes(query) ||
      item.email.toLowerCase().includes(query) ||
      item.loanType.toLowerCase().includes(query) ||
      item.status.toLowerCase().includes(query)
    );
  });
});

const paginatedBorrowers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredBorrowers.value.slice(start, end);
});

const totalPages = computed(() => {
  return Math.ceil(filteredBorrowers.value.length / itemsPerPage) || 1;
});
</script>

<template>
  <div class="borrowers-page">
    <div class="page-header">
      <div>
        <h1 class="title">Borrowers</h1>
        <p class="subtitle">Manage and review all borrower records in one place.</p>
      </div>

      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search by name, phone, email, loan type, or status..."
        class="search"
      />
    </div>

    <div v-if="loading" class="loading-wrapper">
      <div class="spinner"></div>
      <p>Loading borrowers...</p>
    </div>

    <div v-else class="table-card">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Borrower</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Loan Type</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          <tr v-if="paginatedBorrowers.length === 0">
            <td colspan="6" class="no-data">No borrowers found.</td>
          </tr>

          <tr v-for="item in paginatedBorrowers" :key="item.id">
            <td>#{{ item.id }}</td>
            <td class="name">{{ item.name }}</td>
            <td>{{ item.phone }}</td>
            <td>{{ item.email }}</td>
            <td>
              <span class="type-badge">
                {{ item.loanType }}
              </span>
            </td>
            <td>
              <span
                class="status-badge"
                :class="{
                  active: item.status === 'Active',
                  inactive: item.status === 'Inactive'
                }"
              >
                {{ item.status }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="pagination">
        <button @click="currentPage--" :disabled="currentPage === 1">
          Prev
        </button>

        <span>Page {{ currentPage }} of {{ totalPages }}</span>

        <button
          @click="currentPage++"
          :disabled="currentPage === totalPages"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.borrowers-page {
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
  font-size: 30px;
  font-weight: 700;
  color: #0f172a;
  margin: 0;
}

.subtitle {
  margin-top: 6px;
  color: #64748b;
  font-size: 15px;
}

.search {
  width: 390px;
  max-width: 100%;
  padding: 12px 14px;
  border: 1px solid #cbd5e1;
  border-radius: 10px;
  outline: none;
  font-size: 14px;
  background: white;
  transition: 0.2s ease;
}

.search:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.12);
}

.table-card {
  background: white;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
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

.name {
  font-weight: 600;
  color: #0f172a;
}

.type-badge {
  display: inline-block;
  padding: 6px 10px;
  border-radius: 999px;
  background: #dbeafe;
  color: #1d4ed8;
  font-size: 13px;
  font-weight: 600;
}

.status-badge {
  display: inline-block;
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 600;
}

.active {
  background: #dcfce7;
  color: #15803d;
}

.inactive {
  background: #e2e8f0;
  color: #475569;
}

.no-data {
  text-align: center;
  padding: 24px;
  color: #94a3b8;
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

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

button {
  padding: 10px 16px;
  border: none;
  background: #2563eb;
  color: white;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
  transition: 0.2s ease;
}

button:hover:not(:disabled) {
  background: #1d4ed8;
}

button:disabled {
  background: #94a3b8;
  cursor: not-allowed;
}
</style>