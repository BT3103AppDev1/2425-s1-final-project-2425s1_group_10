<template>
  <nav>
    <router-link to="/login">
      Login
    </router-link> |
    <router-link to="/register">
      Register
    </router-link> | 
    <router-link to="/home">
      Home
    </router-link> |
    <button @click="logout">
      Logout
    </button>
  </nav>
  <router-view />
</template>

<script>
import { getAuth, signOut } from "firebase/auth";

export default {
  methods: {
    logout() {
      const auth = getAuth();
      signOut(auth).then(() => {
        // Sign-out successful
        alert('You have been logged out');  
        this.$router.push('/');
      }).catch((error) => {
        // Handle errors
        alert(`Error: ${error.code} - ${error.message}`);  
      });
    }  
  }
}
</script>
