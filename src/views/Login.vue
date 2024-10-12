<template>
  <div>
    <h2>Login</h2>

    <form @submit.prevent="login">
      <div>
        <label for="email">Email:</label>
        <input
          id="email"
          v-model="email"
          type="email"
          required
        >
      </div>
      <div>
        <label for="password">Password:</label>        
        <input
          id="password"
          v-model="password"
          type="password"
          required
        >
      </div>
      <button type="submit">
        Login
      </button>
    </form>
  </div>
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default {
  name: 'LoginView',
  data() {
    return {
      email: '',
      password: ''  
    }
  },
  methods: {
    login() {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          // User logged in successfully
          const user = userCredential.user;
          alert(`Welcome back, ${user.email}!`);
          this.$router.push('/home');
        })
        .catch((error) => {
          // Handle errors
          const errorCode = error.code;
          const errorMessage = error.message;
          alert(`Error: ${errorCode} - ${errorMessage}`);
        });
    }
  }
}
</script>