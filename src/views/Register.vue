<template>
  <div class="register-page">
    <img
      src="@/assets/MainLogo.png"
      alt="Main Logo"
      class="main-logo"
    >
    <div class="register-container">
      <h2 class="register-title">
        Create an account
      </h2>
      <form @submit.prevent="register">
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
        <p class="password-requirements-title">
          Your password must have:
        </p>
        <ul class="password-requirements">
          <li :class="{ valid: isLengthValid }">
            At least 8 characters
          </li>
          <li :class="{ valid: hasLettersNumbersSpecial }">
            Uppercase, numbers, and special characters
          </li>
        </ul>

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
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
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
  computed: {
    isLengthValid() {
      return this.password.length >= 8 && this.password.length <= 20;
    },
    hasLettersNumbersSpecial() {
      return /[A-Za-z]/.test(this.password) &&
             /[0-9]/.test(this.password) &&
             /[!@#$%^&*(),.?":{}|<>]/.test(this.password);
    }
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

        await sendEmailVerification(user);
        alert(`Your account has been created. A verification email has been sent to ${this.email}. Please check your inbox to verify your account.`);

        this.$router.push('/'); 
      } catch (error) {
        
        switch (error.code) {
          case'auth/email-already-in-use':
            this.errorMessage = 'Email is already in use. Please login, or reset password';
            break;
          default:
            this.errorMessage = 'Registration failed. Please try again later.';
        }
        alert(this.errorMessage);
      }
    },
  },
};
</script>

<style scoped>
.register-page {
  display: flex;
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

input {
  width: 100%;
  padding: 10px;
  margin-bottom: 7.5px; 
  margin-top: 7.5px;
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
  font-size: 0.9em;
}
.main-logo {
  width: 300px; 
  border-radius: 10px;
}

.password-requirements-title {
  font-weight: bold;
  text-align: left;
  margin: 10px 0 5px;
  font-size: 0.9em;
}

.password-requirements {
  list-style-type: none;
  padding: 0;
  text-align: left;
  margin: 0;
  font-size: 0.9em;

}

.password-requirements li {
  color: red;
}

.password-requirements li.valid {
  color: green;
}

@media (max-width: 480px) {
  .register-page {
    padding: 0px;
    margin-top: -50px
  }

  .register-container {   
    width: 85%; /* Adjust width to fit smaller screens */
    padding: 15px;
  }

  .main-logo {
    width: 180px; /* Smaller logo size for mobile */
    margin-bottom: -10px
  }

  input {
    padding: 8px; /* Reduce padding for inputs */
    font-size: 0.9em;
  }

  .register-button {
    padding: 10px;
    font-size: 0.9em;
  }

  .password-error, .password-requirements-title, .password-requirements {
    font-size: 0.8em; /* Smaller font size for mobile */
  }

  .password-requirements li {
    font-size: 0.8em;
  }
}

</style>
