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
</style>