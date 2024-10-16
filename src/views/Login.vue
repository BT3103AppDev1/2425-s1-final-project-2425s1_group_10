<template>
  <div class="login-page">
    <div class="login-container">
      <h2 class="login-title">
        Login
      </h2>
      <div class="login-description">
        Sign in to your account
      </div>

      <form @submit.prevent="login">
        <div class="form-group">
          <input
            id="email"
            v-model="email"
            type="email"
            placeholder="Email"
            required
          >
        </div>
        <div>
          <input
            id="password"
            v-model="password"
            type="password"
            placeholder="Password"
            required
          >
        </div>
        <button
          type="submit"
          class="login-button"
        >
          Login
        </button>

        <p class="password-reset-link">
          Forgot your password? Click <router-link to="register">
            here
          </router-link>
          to reset
        </p>

        <router-link
          to="/register"
        >
          <button class="register-button">
            Register New Account
          </button>
        </router-link>
      </form>
    </div>
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

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #faedcd;
}

.login-container {
  width: 400px; /* Set a fixed width for the container */
  padding: 20px;
  background-color: white;
  border-radius: 10px; /* Rounded corners */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Soft shadow */
  border: 1px solid #ddd; /* Light border */
  text-align: center;
}

.login-title {
  color: #d08a2d; 
  margin-bottom: 10px;
}

.login-description {
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

input {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  background-color: #e9ecef;
  box-sizing: border-box;
}

.login-button {
  margin-top: 20px;
  width: 100%;
  padding: 12px;
  background-color: #d08a2d;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.password-reset-link {
  text-align: left
}
.password-reset-link a {
  color: #d08a2d;
  text-decoration: underline;
}

.password-reset-link a:hover {
  color: black;
}

.register-button {
  width: 100%;
  padding: 12px;
  background-color: #faedcd;
  color: black;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}
</style>