<template>
  <div class="register-page">
    <div class="register-container">
      <h2 class="register-title">
        Register
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
        <div class="action-container">
          <button
            type="submit"
            class="register-button"
          >
            Register
          </button>
          <router-link
            to="/login"
            class="login-link"
          >
            Back to Login
          </router-link>
        </div>
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
  width: 400px; /* Set a fixed width for the container */
  padding: 20px;
  background-color: white;
  border-radius: 10px; /* Rounded corners */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Soft shadow */
  border: 1px solid #ddd; /* Light border */
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
  background-color: #fefae0;
  box-sizing: border-box;
}

.register-button {
  margin-top: 20px;
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

.register-button:hover {
  color: #c07522;
}

.action-container{
  display:flex;
  justify-content: space-between;
  align-items:center;
  width: 100%;
}

.login-link {
  margin-top: 10%;
  color: #c07522;
  text-decoration: underline;
  cursor: pointer;
  text-align: right;
}

.login-link:hover {
  color: black
}

</style>