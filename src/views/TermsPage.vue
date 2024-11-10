<template>
  <div
    v-if="!user"
    style="text-align:center;"
  >
    <NoAccess />
  </div>
  <div 
    v-if="user"
    class="main-dashboard"
  >
    <div class="left-side">
      <NavBar
        :collapsed="collapsed" 
        @update:collapsed="onToggleCollapse"
      />
    </div>
      
    <div class="right-side">
      <Logo />
      <LogOut />
      <br>
      <br>
      <div class="terms-and-conditions">
        <h1>Terms and Conditions</h1>
        <p>
          Welcome to StockOverflow. By accessing our website and using our services, you agree to comply with these terms and conditions.
        </p>
        <h2>Usage</h2>
        <p>
          Our services are provided solely for managing inventory-related tasks. Unauthorized use of our platform for any illegal or malicious purposes is prohibited.
        </p>
        <h2>Account Responsibility</h2>
        <p>
          You are responsible for maintaining the confidentiality of your account information and for any activity conducted under your account.
        </p>
        <h2>Liability</h2>
        <p>
          StockOverflow is not liable for any data loss, mismanagement, or damages arising from your use of our platform.
        </p>
        <p>
          By using our services, you acknowledge and accept these terms. We reserve the right to update these terms periodically.
        </p>
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
      name: 'SettingsPage',
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
        }
    };
    </script>
  <style scoped>
  .main-dashboard {
  display: flex;
}

.left-side {
  width: 50px;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  background-color: #f4f4f4;
  transition: width 0.3s;
  z-index: 5;
}

.right-side {
  margin-left: 50px;
  width: calc(100% - 50px);
  padding: 20px;
  transition: margin-left 0.3s, width 0.3s;
}
.terms-and-conditions {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.terms-and-conditions h1, .terms-and-conditions h2 {
  margin-top: 20px;
}

.terms-and-conditions p {
  margin-bottom: 15px;
  line-height: 1.6;
}
  </style>
  