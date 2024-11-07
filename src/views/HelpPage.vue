<template>
    <div
    v-if="!user"
    style = "text-align:center;"
    >
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
            <li 
              v-for="(faq, index) in faqs" 
              :key="index" 
              class="faq-item"
            >
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
            <div
              v-for="(message, index) in messages"
              :key="index"
              :class="['message', message.user]"
            >
              <p>{{ message.text }}</p>
            </div>
          </div>
          <input
            v-model="userMessage"
            placeholder="Type your message..." 
            @keyup.enter="sendMessage" 
          >
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
          user:null,
          // FAQ Section Data
          faqs: [
            {
              question: "How do I manage stock levels?",
              answer:
                "You can manage stock levels by navigating to the inventory section and updating the product quantities.",
              open: false,
            },
            {
              question: "What happens if stock runs out?",
              answer:
                "An alert is generated, and you can set reorder notifications to restock in time.",
              open: false,
            },
            {
              question: "How can I track supplier shipments?",
              answer:
                "You can track shipments via the suppliers section under the orders tab.",
              open: false,
            },
          ],
          // Chatbot Data
          messages: [
            { text: "Hello! How can I assist you today?", user: "bot" },
          ],
          userMessage: "",
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
    
      const userText = this.userMessage.toLowerCase(); // Convert to lowercase for easier keyword matching
      this.messages.push({ text: this.userMessage, user: "user" });
      this.userMessage = "";
    
      let botReply = "Oops! That's a bit beyond my toolbox. 🛠️ Maybe try asking something else? ";
    
      // Enhanced response logic
      if (userText.includes("stock")) {
        botReply = "To check stock, go to the inventory section where you can see all product quantities. You can also set alerts for low stock.";
      } else if (userText.includes("increase sales")) {
        botReply = "To increase sales, consider using promotional tools, optimizing product descriptions, and improving customer engagement through targeted marketing campaigns.";
      } else if (userText.includes("update data")) {
        botReply = "To update data, navigate to the data management section. Ensure you save any changes made to avoid data loss.";
      } else if (userText.includes("cannot refresh") || userText.includes("refresh")) {
        botReply = "If you're having trouble refreshing the page, try clearing your browser cache or check your internet connection.";
      } else if (userText.includes("order status")) {
        botReply = "To check order status, go to the orders tab. You’ll find tracking details and fulfillment progress for each order.";
      } else if (userText.includes("login issues") || userText.includes("cannot log in")) {
        botReply = "If you're having trouble logging in, please ensure your credentials are correct. If needed, use the 'Forgot Password' feature.";
      } else if (userText.includes("supplier shipments")) {
        botReply = "To track supplier shipments, go to the suppliers section under the orders tab, where tracking information is available.";
      } else if (userText.includes("payment issues")) {
        botReply = "For payment-related issues, check the billing section or contact support if you see any discrepancies.";
      }
    
      // Simulate bot reply with delay
      setTimeout(() => {
        this.messages.push({ text: botReply, user: "bot" });
      }, 1000);
    }
    
        },
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