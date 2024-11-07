<template>
  <div v-if="!user" style="text-align:center;">
    <NoAccess />
  </div>
  
  <div v-if="user" class="main-dashboard">
    <!-- Dashboard Layout with Left (NavBar) and Right (Content) Sections -->
    <div class="left-side">
      <NavBar :collapsed="collapsed" @update:collapsed="onToggleCollapse"/>
    </div>

    <div class="right-side">
      <!-- Top Bar with Logo and LogOut -->
      
      <!-- Dashboard Container -->
      <div class="dashboard-container">
        <Logo />
        <LogOut />
        <!-- Dashboard Content -->
        <div class="dashboard-content">
          <!-- Top Row of Dashboard Cards -->
          <div class="dashboard-top">
            <div class="dashboard-card">Total Items: 4500</div>
            <div class="dashboard-card restock-card">Restock: 120</div>
            <div class="dashboard-card">Excess Stock: 670</div>
          </div>

          <!-- Bottom Row of Dashboard Cards -->
          <div class="dashboard-bottom">
            <div class="dashboard-card">Sales Performance</div>
            <div class="dashboard-card">Stock Levels by Category</div>
            <div class="dashboard-card">Alerts</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import LogOut from "@/components/LogOut.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import NoAccess from '@/components/NoAccess.vue';
import Logo from '@/components/Logo.vue';

export default {
  name: 'MainDashboard',
  components: {
    NoAccess,
    NavBar,
    LogOut,
    Logo,
  },
  data() {
    return {
      user: null,
      collapsed: false,
    };
  },
  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
      }
    });
  },
  methods: {
    onToggleCollapse(collapsed) {
      this.collapsed = collapsed;
    },
  },
};
</script>

<style scoped>
.main-dashboard {
  display: flex;
}

.left-side {
  width: 50px; /* Initially narrow for collapsed NavBar */
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  background-color: #f4f4f4;
  transition: width 0.3s; /* Smooth transition for resizing */
  z-index: 5;
}

.left-side.expanded {
  width: 250px; /* Expand to full width when extended */
}

.right-side {
  margin-left: 50px; /* Initially push content to the right */
  width: calc(100% - 50px);
  padding: 20px;
  transition: margin-left 0.3s, width 0.3s; /* Smooth transition for content resizing */
}

.right-side.expanded {
  margin-left: 250px; /* Shift content right when NavBar is expanded */
  width: calc(100% - 250px);
}

.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 20px;
  position: fixed;
  top: 0;
  left: 50px; /* Start the top bar after the collapsed NavBar */
  right: 0;
  z-index: 10; /* Ensure top bar appears above NavBar */
  box-sizing: border-box;
}

.dashboard-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 150px; /* Adjusted space to accommodate the fixed top bar */
  width: 100%;
}

.dashboard-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 1200px;
  padding-top: 50px;
}

.dashboard-top,
.dashboard-bottom {
  display: flex;
  gap: 20px;
  justify-content: center;
}

.dashboard-card {
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  width: 30%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.restock-card {
  background-color: #A6BE96;
}
</style>
