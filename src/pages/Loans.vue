<script setup>
import { ref, computed, watch, onMounted } from "vue";

const loans = ref([]);
const loading = ref(true);
const currentPage = ref(1);
const itemsPerPage = 5;
const searchQuery = ref("");

watch(searchQuery, () => {
  currentPage.value = 1;
});

const filteredLoans = computed(() => {
  const query = searchQuery.value.toLowerCase().trim();

  if (!query) {
    return loans.value;
  }

  return loans.value.filter((item) => {
    return (
      item.id.toString().includes(query) ||
      item.borrowerName.toLowerCase().includes(query) ||
      item.type.toLowerCase().includes(query) ||
      item.status.toLowerCase().includes(query) ||
      item.amount.toString().includes(query) ||
      item.date.toLowerCase().includes(query) ||
      item.duration.toLowerCase().includes(query)
    );
  });
});

const paginatedLoans = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredLoans.value.slice(start, end);
});

const totalPages = computed(() => {
  return Math.ceil(filteredLoans.value.length / itemsPerPage) || 1;
});

const fetchLoans = async () => {
  try {
    const response = await fetch("https://69c1362b085e1a9fae406626.mockapi.io/loans");
    const data = await response.json();
    loans.value = data;
  } catch (error) {
    console.error("Error fetching loans:", error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchLoans();
});
</script>

<template>
  <div class="loans-page">
    <div class="page-header">
      <div>
        <h1 class="title">Loans</h1>
        <p class="subtitle">Review, search, and monitor all loan records.</p>
      </div>

      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search by borrower, type, status, amount, date..."
        class="search"
      />
    </div>

    <div v-if="loading" class="loading-wrapper">
      <div class="spinner"></div>
      <p>Loading loans...</p>
    </div>

    <div v-else class="table-card">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Borrower</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Date</th>
            <th>Duration</th>
          </tr>
        </thead>

        <tbody>
          <tr v-if="paginatedLoans.length === 0">
            <td colspan="7" class="no-data">No loans found.</td>
          </tr>

          <tr v-for="item in paginatedLoans" :key="item.id">
            <td>#{{ item.id }}</td>
            <td>{{ item.borrowerName }}</td>
            <td>
              <span class="type-badge">
                {{ item.type }}
              </span>
            </td>
            <td class="amount">Rs {{ item.amount }}</td>
            <td>
              <span
                class="status-badge"
                :class="{
                  approved: item.status === 'Approved',
                  pending: item.status === 'Pending',
                  rejected: item.status === 'Rejected'
                }"
              >
                {{ item.status }}
              </span>
            </td>
            <td>{{ item.date }}</td>
            <td>{{ item.duration }}</td>
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
.loans-page {
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
  width: 340px;
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