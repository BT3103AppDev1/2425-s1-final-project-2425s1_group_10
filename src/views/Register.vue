<template>
  <div class="register-page">
    <div class="register-container">
      <h2 class="register-title">
        Create an account
      </h2>
      <form @submit.prevent="register">
        <!-- Simplified structure with fewer divs and added spacing -->
        <input
          id="email"
          v-model="email"
          placeholder="Email"
          type="email"
          required
        >

        <input
          id="username"
          v-model="username"
          placeholder="User Name"
          type="text"
          required
        >

        <input
          id="companyName"
          v-model="companyName"
          placeholder="Company Name"
          type="text"
          required
        >

        <input
          id="password"
          v-model="password"
          type="password"
          placeholder="Password"
          required
        >

        <input
          id="checkPassword"
          v-model="checkPassword"
          type="password"
          placeholder="Confirm your password"
          required
        >

        <p
          v-if="passwordError"
          class="password-error"
        >
          Passwords do not match.
        </p>

        <button
          type="submit"
          class="register-button"
        >
          Register
        </button>

        <p class="back-to-login">
          Already have an account? <router-link to="/">
            Log in
          </router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

export default {
  name: 'RegisterView',
  data() {
    return {
      email: '',
      password: '',
      username: '',
      companyName: '',
      checkPassword: '',
      passwordError: false,
    };
  },
  methods: {
    async register() {
      console.log(this.password)
      console.log(this.checkPassword)
      if (this.password !== this.checkPassword) {
        this.passwordError = true;
        return;
      }

      this.passwordError = false;
      const auth = getAuth();
      const db = getFirestore();

      try {
        const userCredential = await createUserWithEmailAndPassword(auth, this.email, this.password);
        const user = userCredential.user;

        await setDoc(doc(db, "users", user.uid), {
          email: this.email,
          username: this.username,
          companyName: this.companyName,
        });

        alert(`Welcome, ${user.email}! Your account has been created.`);
        this.$router.push('/');
      } catch (error) {
        alert(`Error: ${error.code} - ${error.message}`);
      }
    },
  },
};
</script>

<style scoped>
.register-page {
  display: flex;
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

input {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px; 
  border-radius: 5px;
  border: 1px solid #ccc;
  background-color: #e9ecef;
  box-sizing: border-box;
}

.register-button {
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

.password-error {
  color: red;
  text-align: left;
}
</style>
