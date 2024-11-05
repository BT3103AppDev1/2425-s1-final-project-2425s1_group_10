<template>
  <div 
    v-if="!user"
    style="text-align:center;"
  >
    <NoAccess />
  </div>
  <div
    v-if="user"
    style="text-align:center;"
  >
    <div class="dashboard-container">
      <NavBar />
    </div>
    <LogOut />
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import LogOut from "@/components/LogOut.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import NoAccess from '@/components/NoAccess.vue';
export default {
  name: 'MainDashboard',
  components: {
    NoAccess,
    NavBar,
    LogOut,
  },
  data() {
      return {
        user: null, 
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
  };
</script>
  