<script setup>
import Sidebar from "./components/Sidebar.vue";
</script>

<template>
  <div class="app-shell">
    <Sidebar />
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<style>
* {
  box-sizing: border-box;
}

html,
body,
#app {
  margin: 0;
  min-height: 100%;
  font-family: Arial, Helvetica, sans-serif;
  background: #f8fafc;
}

.app-shell {
  min-height: 100vh;
}

.main-content {
  margin-left: 260px;
  min-height: 100vh;
  padding: 28px;
}

@media (max-width: 768px) {
  .app-shell {
    flex-direction: column !important;
  }

  .sidebar {
    width: 100% !important;
    min-height: auto !important;
    height: auto !important;
    position: relative !important;
    padding: 18px !important;
  }

  .sidebar h1,
  .sidebar .logo,
  .sidebar-title {
    font-size: 22px !important;
  }

  .sidebar nav,
  .nav-links {
    display: grid !important;
    grid-template-columns: repeat(2, 1fr) !important;
    gap: 10px !important;
  }

  .sidebar a,
  .nav-link {
    padding: 12px !important;
    font-size: 14px !important;
    text-align: center !important;
  }

  .main-content {
    width: 100% !important;
    margin-left: 0 !important;
    padding: 0 !important;
  }
}

</style>
