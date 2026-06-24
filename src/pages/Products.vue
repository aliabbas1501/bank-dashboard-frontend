<script setup>
import { ref, computed, watch } from "vue";

const products = ref([
  {
    id: 1,
    name: "Personal Loan Basic",
    category: "Loan",
    interestRate: "12%",
    duration: "12 Months",
    status: "Available"
  },
  {
    id: 2,
    name: "Home Finance Standard",
    category: "Loan",
    interestRate: "10%",
    duration: "20 Years",
    status: "Available"
  },
  {
    id: 3,
    name: "Car Loan Starter",
    category: "Loan",
    interestRate: "11%",
    duration: "5 Years",
    status: "Available"
  },
  {
    id: 4,
    name: "Education Support Loan",
    category: "Loan",
    interestRate: "8%",
    duration: "4 Years",
    status: "Available"
  },
  {
    id: 5,
    name: "Small Business Growth",
    category: "Loan",
    interestRate: "14%",
    duration: "3 Years",
    status: "Available"
  },
  {
    id: 6,
    name: "Gold Savings Account",
    category: "Account",
    interestRate: "6%",
    duration: "Flexible",
    status: "Available"
  },
  {
    id: 7,
    name: "Current Account Standard",
    category: "Account",
    interestRate: "0%",
    duration: "Flexible",
    status: "Available"
  },
  {
    id: 8,
    name: "Fixed Deposit 12 Months",
    category: "Deposit",
    interestRate: "9%",
    duration: "12 Months",
    status: "Available"
  }
]);

const loading = ref(false);
const currentPage = ref(1);
const itemsPerPage = 5;
const searchQuery = ref("");

watch(searchQuery, () => {
  currentPage.value = 1;
});

const filteredProducts = computed(() => {
  const query = searchQuery.value.toLowerCase().trim();

  if (!query) {
    return products.value;
  }

  return products.value.filter((item) => {
    return (
      item.id.toString().includes(query) ||
      item.name.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query) ||
      item.interestRate.toLowerCase().includes(query) ||
      item.duration.toLowerCase().includes(query) ||
      item.status.toLowerCase().includes(query)
    );
  });
});

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredProducts.value.slice(start, end);
});

const totalPages = computed(() => {
  return Math.ceil(filteredProducts.value.length / itemsPerPage) || 1;
});
</script>

<template>
  <div class="products-page">
    <div class="page-header">
      <div>
        <h1 class="title">Products</h1>
        <p class="subtitle">View and search all available banking products.</p>
      </div>

      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search by product, category, rate, duration, or status..."
        class="search"
      />
    </div>

    <div v-if="loading" class="loading-wrapper">
      <div class="spinner"></div>
      <p>Loading products...</p>
    </div>

    <div v-else class="table-card">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Product Name</th>
            <th>Category</th>
            <th>Interest Rate</th>
            <th>Duration</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          <tr v-if="paginatedProducts.length === 0">
            <td colspan="6" class="no-data">No products found.</td>
          </tr>

          <tr v-for="item in paginatedProducts" :key="item.id">
            <td>#{{ item.id }}</td>
            <td class="product-name">{{ item.name }}</td>
            <td>
              <span class="category-badge">
                {{ item.category }}
              </span>
            </td>
            <td class="rate">{{ item.interestRate }}</td>
            <td>{{ item.duration }}</td>
            <td>
              <span
                class="status-badge"
                :class="{
                  available: item.status === 'Available',
                  unavailable: item.status === 'Unavailable'
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
.products-page {
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

.product-name {
  font-weight: 600;
  color: #0f172a;
}

.category-badge {
  display: inline-block;
  padding: 6px 10px;
  border-radius: 999px;
  background: #dbeafe;
  color: #1d4ed8;
  font-size: 13px;
  font-weight: 600;
}

.rate {
  font-weight: 600;
  color: #0f172a;
}

.status-badge {
  display: inline-block;
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 600;
}

.available {
  background: #dcfce7;
  color: #15803d;
}

.unavailable {
  background: #fee2e2;
  color: #b91c1c;
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