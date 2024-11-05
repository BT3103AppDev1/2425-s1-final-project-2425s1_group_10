<template>
  <div
    v-if="!user"
    style="text-align:center;"
  >
    <h3>Page Not Found !! </h3>
    <p class="back-to-login">
      Back to <router-link to="/dashboard">
        dashboard
      </router-link> page
    </p>
    <br>
  </div>
</template>
  
  <script>
  import { getAuth, onAuthStateChanged } from "firebase/auth"; 
  export default {
      name: "NotFound",
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