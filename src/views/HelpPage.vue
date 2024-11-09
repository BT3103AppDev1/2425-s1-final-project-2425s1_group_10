<template>
  <div v-if="!user" style="text-align:center;">
    <NoAccess />
  </div>
  <div v-if="user" class="help-page">
    <NavBar />
    <Logo />
    <h1>Help & Support</h1>

    <!-- FAQ Section -->
    <div class="faq-container">
      <h2>Frequently Asked Questions (FAQ)</h2>
      <ul>
        <li v-for="(faq, index) in faqs" :key="index" class="faq-item">
          <h3 @click="toggleFaq(index)">
            {{ faq.question }}
            <span>{{ faq.open ? '-' : '+' }}</span>
          </h3>
          <p v-if="faq.open">
            {{ faq.answer }}
          </p>
        </li>
      </ul>
    </div>

    <!-- Custom Chatbot Section -->
    <div class="chatbot-container">
      <h2>Chat with Us</h2>
      <div class="chatbot-messages">
        <div v-for="(message, index) in messages" :key="index" :class="['message', message.user]">
          <p>{{ message.text }}</p>
        </div>
      </div>
      <input v-model="userMessage" placeholder="Type your message..." @keyup.enter="sendMessage" />
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import Logo from '@/components/Logo.vue';
import NoAccess from '@/components/NoAccess.vue';
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default {
  name: 'HelpPage',
  components: {
    NavBar,
    Logo,
    NoAccess,
  },
  data() {
    return {
      user: null,
      // FAQ Section Data
      faqs: [
        {
          question: "How do I manage stock levels?",
          answer: "You can manage stock levels by navigating to the inventory section and updating the product quantities.",
          open: false,
        },
        {
          question: "What happens if stock runs out?",
          answer: "An alert is generated, and you can set reorder notifications to restock in time.",
          open: false,
        },
        {
          question: "How can I track supplier shipments?",
          answer: "You can track shipments via the suppliers section under the orders tab.",
          open: false,
        },
      ],
      // Chatbot Data
      messages: [{ text: "Hello! How can I assist you today?", user: "bot" }],
      userMessage: "",
      intents: {
        "check stock": /check stock|inventory|stock levels|availability/i,
        "increase sales": /increase sales|promote products|boost sales|improve sales|sales volume/i,
        "update data": /update data|modify data|change data|edit data/i,
        "order status": /order status|track order|order tracking|where is my order/i,
        "contact support": /who to contact|contact support|support email|support number|reach support|help with issue/i,
        "login issues": /login issues|cannot log in|forgot password|sign-in problem/i,
        "technical issues": /technical issues|app not working|cannot refresh|page not loading|troubleshoot/i,
        "payment issues": /payment issues|billing problem|charge issue|issue with payment/i,
      },
    };
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
    // Toggle FAQ answers on click
    toggleFaq(index) {
      this.faqs[index].open = !this.faqs[index].open;
    },
    // Handle user input and bot response
    sendMessage() {
      if (this.userMessage.trim() === "") return;

      const userText = this.userMessage.toLowerCase();
      this.messages.push({ text: this.userMessage, user: "user" });
      this.userMessage = "";

      // Default bot reply if no intent matches
      let botReply = "Oops! That's a bit beyond my toolbox. 🛠️ Maybe try asking something else?";

      for (const [intent, pattern] of Object.entries(this.intents)) {
        if (pattern.test(userText)) {  // Use regex pattern matching
          botReply = this.getResponseForIntent(intent);
          break;
        }
      }

      setTimeout(() => {
        this.messages.push({ text: botReply, user: "bot" });
      }, 1000);
    },

    getResponseForIntent(intent) { 
      switch (intent) {
        case "check stock":
          return "You can check stock in the inventory section.";
        case "increase sales":
          return "To increase sales, try using promotions or improving product descriptions.";
        case "update data":
          return "To update data, go to the data management section.";
        case "order status":
          return "Check your order status in the orders tab to view tracking details and fulfillment progress.";
        case "contact support":
          return "For support, please contact us at 555-123-4567 or email support@stockoverflow.com.";
        case "login issues":
          return "If you're having trouble logging in, double-check your credentials. You can also use 'Forgot Password' if needed.";
        case "technical issues":
          return "If the app isn't working or a page isn’t loading, try refreshing, clearing your browser cache, or checking your internet connection.";
        case "payment issues":
          return "For payment issues, visit the billing section or contact support at 555-123-4567.";
        default:
          return "Oops! That's a bit beyond my toolbox. 🛠️ Maybe try asking something else?";
      }
    }
  }
}
</script>

<style scoped>
.help-page {
  background-color: #faedcd;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: -200px;
}

/* FAQ Section Styling */
.faq-container {
  width: 60%;
}
.faq-item h3 {
  cursor: pointer;
  background-color: #bc6c25;
  color: white;
  padding: 10px;
  margin: 5px 0;
  border-radius: 5px;
}
.faq-item p {
  background-color: #e6cead;
  padding: 10px;
  margin: 0 0 10px 0;
  border-radius: 5px;
}

/* Chatbot Section Styling */
.chatbot-container {
  width: 60%;
}
.chatbot-messages {
  border: 1px solid #ccc;
  padding: 10px;
  height: 300px;
  overflow-y: auto;
  margin-bottom: 10px;
}
.message {
  margin: 5px 0;
}
.message.bot {
  text-align: left;
}
.message.user {
  text-align: right;
}
input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>
