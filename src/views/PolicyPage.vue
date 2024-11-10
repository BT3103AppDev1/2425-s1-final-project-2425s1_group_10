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
      <div class="privacy-policy">
        <h1>Privacy Policy</h1>
        <p>
          At StockOverflow, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your personal information when you use our services.
        </p>
        <h2>Information Collection</h2>
        <p>
          We may collect information such as your name, email address, and usage data to improve our services. We only collect information necessary to provide you with the best experience.
        </p>
        <h2>Information Usage</h2>
        <p>
          Your information is used solely for improving the functionality of StockOverflow, personalizing user experience, and communicating updates or relevant information.
        </p>
        <h2>Data Security</h2>
        <p>
          We implement strict security measures to protect your data. Access to your personal information is restricted to authorized personnel only.
        </p>
        <p>
          By using StockOverflow, you consent to our Privacy Policy. We reserve the right to update this policy as necessary.
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

.privacy-policy {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.privacy-policy h1, .privacy-policy h2 {
  margin-top: 20px;
}

.privacy-policy p {
  margin-bottom: 15px;
  line-height: 1.6;
}
</style>
  