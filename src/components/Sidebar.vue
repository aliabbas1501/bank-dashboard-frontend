<template>
  <aside class="sidebar">
    <div class="brand">
      <h2 class="logo">Bank System</h2>
      <p class="tagline">Admin Dashboard</p>
    </div>

    <nav class="nav-menu">
      <router-link to="/" class="nav-link" active-class="active" exact-active-class="active">
        Dashboard
      </router-link>

      <router-link to="/transactions" class="nav-link" active-class="active">
        Transactions
      </router-link>

      <router-link to="/loans" class="nav-link" active-class="active">
        Loans
      </router-link>

      <router-link to="/borrowers" class="nav-link" active-class="active">
        Borrowers
      </router-link>

      <router-link to="/products" class="nav-link" active-class="active">
        Products
      </router-link>
    </nav>
  </aside>
</template>

<style scoped>
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 260px;
  height: 100vh;
  background: linear-gradient(180deg, #0f172a 0%, #1e293b 100%);
  color: white;
  padding: 28px 18px;
  display: flex;
  flex-direction: column;
  box-shadow: 6px 0 24px rgba(15, 23, 42, 0.18);
}

.brand {
  margin-bottom: 32px;
  padding: 8px 10px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.logo {
  margin: 0;
  font-size: 28px;
  font-weight: 700;
  letter-spacing: 0.3px;
}

.tagline {
  margin: 8px 0 0;
  font-size: 14px;
  color: #94a3b8;
}

.nav-menu {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
}

.nav-link {
  text-decoration: none;
  color: #cbd5e1;
  padding: 14px 16px;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 500;
  transition: all 0.25s ease;
}

.nav-link:hover {
  background: rgba(255, 255, 255, 0.08);
  color: #ffffff;
  transform: translateX(4px);
}

.nav-link.active {
  background: linear-gradient(135deg, #2563eb, #1d4ed8);
  color: white;
  font-weight: 600;
  box-shadow: 0 8px 20px rgba(37, 99, 235, 0.28);
}
</style>