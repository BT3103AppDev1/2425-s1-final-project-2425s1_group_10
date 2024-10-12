<template>
  <div>
    <h2>Register</h2>
  
    <form @submit.prevent="register">
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
        Register
      </button>
    </form>
  </div>
</template>
  
  <script>
  import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
  
  export default {
    name: 'RegisterView',
    data() {
      return {
        email: '',
        password: ''
      }
    },
    methods: {
      register() {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, this.email, this.password)
          .then((userCredential) => {
            // User created successfully  
            const user = userCredential.user;
            alert(`Welcome, ${user.email}! Your account has been created.`);
            this.$router.push('/');
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