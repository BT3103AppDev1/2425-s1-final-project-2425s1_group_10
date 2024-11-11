<template>
  <div class="login-page">
    <img
      src="@/assets/MainLogo.png"
      alt="Main Logo"
      class="main-logo"
    >
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
        </button> <hr>
  
        <p class="password-reset-link">
          Forgotten your login details? <router-link to="/reset-password">
            Click here
          </router-link>
          to reset
        </p> 
  
        <p class="register-link">
          New user? <router-link to="register">
            Create a new account
          </router-link> !
        </p>
      </form>
      <div id="firebaseui-auth-container" />
    </div>
  </div>
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import firebase from '@/uifire.js'
import 'firebase/compat/auth';
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'


export default {
    name:"LoginComponent",

    data() {
        return {
            email: '',
            password: '',
        };
    },
    mounted() {
        var ui = firebaseui.auth.AuthUI.getInstance();
        if (!ui){
            ui = new firebaseui.auth.AuthUI(firebase.auth());
        }
        var uiConfig = {
            signInFlow: 'popup',
            signInSuccessUrl: '/dashboard',
            signInOptions: [
                firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            ]
        };
        ui.start("#firebaseui-auth-container", uiConfig)
    },
    methods: {
        async login() {
      const auth = getAuth();

      try {
        const userCredential = await signInWithEmailAndPassword(auth, this.email, this.password);
        const user = userCredential.user;


        if (!user.emailVerified && user.email !== "group10@gmail.com") {
          alert("Please verify your email before logging in.");
          await auth.signOut(); 
          return;
        }

          alert(`Welcome back, ${user.email}!`);
          this.$router.push('/dashboard');
        } catch(error) {
        
          switch (error.code) {
          case'auth/invalid-login-credentials':
            this.errorMessage = 'Username or password does not match our records. Please try again';
            break;
          case 'auth/invalid-email':
            this.errorMessage = 'Invalid email address. Please check and try again.';
            break;
          case 'auth/user-disabled':
            this.errorMessage = 'This account has been disabled. Please contact support.';
            break;
          case 'auth/user-not-found':
            this.errorMessage = 'No account found with this email. Please sign up.';
            break;
          case 'auth/wrong-password':
            this.errorMessage = 'Incorrect password. Please try again.';
            break;
          default:
            this.errorMessage = 'Login failed. Please try again later.';
        }
        alert(this.errorMessage);


          
        }
    }
  }
}
</script>


<style scoped>
.login-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #faedcd;
}

.login-container {
  width: 400px; 
  padding: 20px;
  background-color: white;
  border-radius: 10px; 
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
  border: 1px solid #ddd; 
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

.register-link {
  text-align: left
}
.register-link a {
  color: #d08a2d;
  text-decoration: underline;
}

.register-link a:hover {
  color: black;
}

.main-logo {
  width: 300px; 
  border-radius: 10px;
}

@media (max-width: 480px) {
  .login-page {
    padding: 0px;
    margin-top: -50px
  }

  .main-logo {
    width:180px;
    margin-top: 0px;
    margin-bottom: 0px;
  }

  .login-container {
    width: 330px;
    padding: 15px;
  }

  .login-title {
    font-size: 20px;
  }

  .login-description {
    font-size: 14px;
  }

  .form-group input {
    padding: 8px;
    font-size: 14px;
  }

  .login-button {
    padding: 10px;
    font-size: 14px;
  }
}

</style>
