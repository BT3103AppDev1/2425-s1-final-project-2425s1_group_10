<template>
    <div
        v-if="!user"
        style="text-align:center;"
    >
        <NoAccess />
    </div>
    <div 
        v-if="user"
        class="main-dashboard"
    >
        <div class="left-side">
        <NavBar
            :collapsed="collapsed" 
            @update:collapsed="onToggleCollapse"
        />
        </div>
      
      <div class="right-side">
        <Logo />
        <LogOut />
        <div class="settings-container">
          <h2 class="settings-title">Settings</h2>
          <div class="user-info">
            <img :src="userProfileImage" alt="User Icon" class="user-icon" />
            <span class="username">{{user.email}}</span>
        </div>
        <hr />
        <div class="settings-section">
            <button class="dropdown-btn" @click="toggleDropdown">
                Edit Profile
                <span class="arrow"></span>
            </button>

            <div class="dropdown-container" :style="{ display: dropdownVisible ? 'block' : 'none' }">
                <a href="/reset-password">Reset Password</a>
            </div>
            

          <div class="setting-item">
            <span>Language</span>
            <select v-model="selectedLanguage" class="dropdown-select">
              <option>Eng</option>
              <option>Other Language</option>
            </select>
          </div>

          <div class="setting-item">
            <span>Push Notifications</span>
            <label class="toggle-switch">
              <input type="checkbox" v-model="pushNotifications" />
              <span class="slider"></span>
            </label>
          </div>

          <div class="setting-item">
            <span>Date Format</span>
            <select v-model="dateFormat" class="dropdown-select">
              <option>dd/mm/yyyy</option>
              <option>mm/dd/yyyy</option>
            </select>
          </div>

          <hr />
          
          <h2 class="settings-title">More</h2>
          <div class="setting-item">  
            <a href="/about">About us</a>
          </div>


          <div class="setting-item">
            <a href="/policy">Privacy Policy</a>
          </div>

          <div class="setting-item">
            <a href="/terms">Terms and Conditions</a>
          </div>
        </div>
    </div>
    </div>
    </div>
</template>
  
  <script>
  import NavBar from '@/components/NavBar.vue';
  import LogOut from "@/components/LogOut.vue";
  import { getAuth, onAuthStateChanged } from "firebase/auth";
  import NoAccess from '@/components/NoAccess.vue';
  import Logo from '@/components/Logo.vue';
  
  export default {
    name: 'SettingsPage',
    components: {
      NoAccess,
      NavBar,
      LogOut,
      Logo,
    },
    data() {
      return {
        user: null,
        collapsed: false,
        dropdownVisible: false,
        selectedLanguage: "Eng",
        pushNotifications: false,
        dateFormat: "dd/mm/yyyy",
      };
    },
    computed: {
        userProfileImage() {
        // Fallback to default icon if user.photoURL is not available
        return this.user?.photoURL || require('@/assets/Account.png');
        },
    },
    mounted() {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.user = user;
        }
      });
    },
    methods: {
      onToggleCollapse(collapsed) {
        this.collapsed = collapsed;
      },
      toggleDropdown() {
        this.dropdownVisible = !this.dropdownVisible;
      }
    },
  };
  </script>
  
  <style scoped>
.main-dashboard {
  display: flex;
}

.left-side {
  width: 50px;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  background-color: #f4f4f4;
  transition: width 0.3s;
  z-index: 5;
}

.right-side {
  margin-left: 50px;
  width: calc(100% - 50px);
  padding: 20px;
  transition: margin-left 0.3s, width 0.3s;
}

.settings-container {
  margin: 100px auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  text-align: center;
}

.settings-title {
  font-size: 1.8em;
  font-weight: bold;
  margin-bottom: 20px;
}

.user-info {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
}

.user-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

.username {
  font-size: 1.2em;
  font-weight: bold;
}

hr {
  border: 1px solid #ddd;
  margin: 20px 0;
}

.settings-section {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.setting-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 16px;
}

.setting-item:hover {
  background-color: #e0e0e0; 
}

.setting-item a {
  text-decoration: none; /* Remove underline */
  color: inherit; /* Use the color of the parent element */
  font-size: 1em; /* Ensure the font size matches the settings item */
}

.setting-item a:hover {
  background-color: #e0e0e0; /* Match the hover effect from .setting-item */
  color: #606c38; /* Optional: Change text color on hover to match settings item hover color */
}

.dropdown-btn {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 16px; /* Match padding with .setting-item */
  font-size: 1em;
  color: #333; /* Set a standard color */
  background: none;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  border: none;
  width: 100%; /* Make it full-width like .setting-item */
  text-align: left; /* Align text to the left */
  text-decoration: none; /* Remove underline */
}

.dropdown-btn:hover {
  background-color: #e0e0e0; /* Match hover effect with .setting-item */
  color: #606c38; /* Optional: Change text color on hover */
}

.dropdown-btn .arrow::after {
  content: "▼"; /* Down arrow symbol */
  font-size: 0.8em;
  margin-left: 5px;
  transition: transform 0.3s;
}

.dropdown-btn[aria-expanded="true"] .arrow::after {
  transform: rotate(180deg); /* Rotate arrow when dropdown is open */
}

.dropdown-select {
  padding: 5px;
  font-size: 1em;
  border-radius: 6px;
  border: 1px solid #ccc;
}

.toggle-switch {
  position: relative;
  display: inline-block;
  width: 34px;
  height: 20px;
}

.toggle-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 34px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 14px;
  width: 14px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: 0.4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #606c38;
}

input:checked + .slider:before {
  transform: translateX(14px);
}

.dropdown-container a {
  text-decoration: none; /* Remove underline */
  color: inherit; /* Use the color of the parent element */
  font-size: 1em; /* Ensure the font size matches the settings item */
}

.dropdown-container a:hover {
  background-color: #e0e0e0; /* Match the hover effect from .setting-item */
  color: #606c38; /* Optional: Change text color on hover to match settings item hover color */
}
</style>
  