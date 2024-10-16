<template>
  <div class="reset-password-page">
    <div class="reset-password-container">
      <h2 class="reset-password-title">
        Reset Password
      </h2>
      <form @submit.prevent="resetPassword">
        <input
          id="email"
          v-model="email"
          placeholder="Enter your email"
          type="email"
          required
        >
        <button
          type="submit"
          class="reset-button"
        >
          Send Password Reset Email
        </button>
      </form>
  
      <p class="back-to-login">
        <router-link to="/login">
          Back to Login
        </router-link>
      </p>
    </div>
  </div>
</template>
  
  <script>
  import { getAuth, sendPasswordResetEmail } from "firebase/auth";
  
  export default {
    name: 'ResetPasswordView',
    data() {
      return {
        email: ''
      };
    },
    methods: {
      async resetPassword() {
        const auth = getAuth();
  
        try {
          await sendPasswordResetEmail(auth, this.email);
          alert("Password reset email has been sent!");
          this.$router.push('/'); 
        } catch (error) {
          alert(`Error: ${error.message}`);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .reset-password-page {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #faedcd;
  }
  
  .reset-password-container {
    width: 400px;
    padding: 20px;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border: 1px solid #ddd;
    text-align: center;
  }
  
  input {
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    border-radius: 5px;
    border: 1px solid #ccc;
    background-color: #e9ecef;
    box-sizing: border-box;
  }
  
  .reset-button {
    width: 100%;
    padding: 12px;
    background-color: #d08a2d;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .back-to-login a {
    color: #c07522;
    text-decoration: underline;
  }
  
  .back-to-login a:hover {
    color: black;
  }
  </style>
  