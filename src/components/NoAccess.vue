<template>
  <p class="back-to-login">
    Please <router-link to="/">
      login
    </router-link> to access the page
  </p>
</template>
    
    <script>
          import { getAuth, onAuthStateChanged } from "firebase/auth"; 
          export default {
              name: 'NoAccess',
              data() {
                  return {
                      user: false,
                  }
              },
              mounted() {
                  const auth = getAuth();
                  onAuthStateChanged(auth, (user) => {
                      if (user) {
                          this.user = user;
                      }
                  })
              },
          }</script>
    
    <style scoped> 
        .back-to-login a {
      color: #d08a2d;
      text-decoration: underline;
    }

    .back-to-login a:hover {
      color: black;

    }
    </style>