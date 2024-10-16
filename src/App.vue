<template>
  <nav v-if="isLoggedIn">
    <button
      class="logout-button"
      @click="logout"
    >
      Logout
    </button>
  </nav>
  <router-view />
</template>

<script>
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

export default {
  data() {
    return {
      isLoggedIn: false, 
    };
  },
  created() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    });
  },
  methods: {
    logout() {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          alert('You have been logged out');
          this.$router.push('/login'); 
        })
        .catch((error) => {
          alert(`Error: ${error.code} - ${error.message}`);
        });
    },
  },
};
</script>

<style>
html, body {
  background-color: #faedcd;
  margin: 0;
  padding: 0;
  height: 100%;
}

.logout-button {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 100px;
  padding: 10px;
  background-color: #d08a2d;
  color: white;
  border: none;
  border-radius: 5px;
  border: 1px solid #ccc;
  cursor: pointer;
  font-size: 16px;
}

</style>