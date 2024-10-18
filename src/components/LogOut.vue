<template> 
  <button
    v-if="user"
    id="btn"
    @click="signOut()"
  >
    Logout
  </button>
</template> 
    
    <script>
    import { getAuth, onAuthStateChanged, signOut } from "firebase/auth"; 
    export default {
        name: 'LogOut',
        data() {
            return {
                user: false,
            }
        },
        mounted() {
            const auth = getAuth();
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    this.user = user;
                }
            })
        },
    
        methods: {
            signOut() {
                const auth = getAuth();
                const user = auth.currentUser;
                signOut(auth, user) 
                this.$router.push({name:'Login'})
            }
        }
    }</script>
    
    <style scoped>
        #btn {
  position: absolute;
  top: 20px;
  right: 20px;
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
    </style>