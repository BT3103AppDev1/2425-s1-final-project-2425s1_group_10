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
      <div class="about-us">
        <h1>About Us</h1>
        <p>Welcome to StockOverflow, your go-to solution for efficient inventory tracking and management.</p>
        <p>
          At StockOverflow, we are committed to helping businesses of all sizes manage their stock seamlessly. Our platform allows you to monitor inventory levels, track sales performance, and get insights into your stock movement, all in one place.
        </p>
        <p>
          We believe that streamlined inventory management is the key to operational success. Our team of dedicated professionals is passionate about providing reliable, user-friendly tools that can empower you to make informed business decisions.
        </p>
        <p>
          Thank you for choosing StockOverflow. We look forward to supporting your business and helping you Track Smarter and Stock Better!
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

  .about-us {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    font-family: Arial, sans-serif;
  }
  
  .about-us h1 {
    font-size: 2em;
    margin-bottom: 15px;
  }
  
  .about-us p {
    margin-bottom: 15px;
    line-height: 1.6;
  }
  </style>
  