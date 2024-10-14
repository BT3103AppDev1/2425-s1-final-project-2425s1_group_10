<template>
  <div class="register-page">
    <div class="register-container">
      <h2 class="register-title">
        Create an account
      </h2>  
      <form @submit.prevent="register">
        <div class="register-form">
          <input
            id="email"
            v-model="email"
            placeholder="Email"
            type="email"
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
          class="register-button"
        >
          Register
        </button>
        <p class="back-to-login">
          Already have an account? <router-link to="/login">
            Log in
          </router-link>
        </p>
      </form>
    </div>
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
            const user = userCredential.user;
            alert(`Welcome, ${user.email}! Your account has been created.`);
            this.$router.push('/');
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(`Error: ${errorCode} - ${errorMessage}`);
          });
      }
    }
  }
  </script>


<style scoped>
.register-page {
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #faedcd;
}

.register-container {
  width: 400px; 
  padding: 20px;
  background-color: white;
  border-radius: 10px; 
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
  border: 1px solid #ddd; 
  text-align: center;
}


.register-title {
  color: #d08a2d; 
  margin-bottom: 5%;
  text-align: center;
}

.register-form {
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

.register-button {
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

.register-button:hover {
  color: #c07522;
}

.back-to-login a {
  margin-top: 10%;
  color: #c07522;
  text-decoration: underline;
  cursor: pointer;
}

.back-to-login a:hover {
  color: black
}

</style>