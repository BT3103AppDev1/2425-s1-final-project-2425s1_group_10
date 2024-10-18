<template>
  <div
    v-if="user"
    style="text-align:center;"
  >
    <div>
      <h2>HomePage</h2>
      <p>Welcome to the HomePage!</p>
    </div>  
    <LogOut />
  </div>
</template>
  
  <script>
  import { getAuth, onAuthStateChanged } from "firebase/auth";
  import LogOut from "@/components/LogOut.vue";
  
  export default {
    name: "HomeView",
    components: {
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
  