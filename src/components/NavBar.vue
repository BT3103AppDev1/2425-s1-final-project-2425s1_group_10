<template>
  <div id="demo" :class="[{ collapsed: collapsed }, { onmobile: isOnMobile }]">
    <sidebar-menu
      v-model:collapsed="collapsed"
      :menu="menu"
      :theme="selectedTheme"
      :show-one-child="true"
      @update:collapsed="onToggleCollapse"
      @item-click="onItemClick"
    >
      <template #toggle-icon>
        <img :src="Chevron" alt="Toggle Icon" style="width: 36px; height: 36px;" />
      </template>
      <template v-slot:header>
        <!-- You can customize the header slot if needed -->
      </template>
      <template v-slot:footer>
        <!-- You can customize the footer slot if needed -->
      </template>
      <template v-slot:dropdown-icon="{ isOpen }">
        <span v-if="!isOpen">+</span>
        <span v-else>-</span>
      </template>
    </sidebar-menu>

    <!-- Mobile overlay to close sidebar on mobile -->
    <div
      v-if="isOnMobile && !collapsed"
      class="sidebar-overlay"
      @click="collapsed = true"
    />
    <div class="demo">
      <div class="container">
        <hr style="margin: 50px 0px; border: 1px solid #e3e3e3" />
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import { SidebarMenu } from 'vue-sidebar-menu'
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'
import DashboardIcon from '@/assets/Dashboard.png'
import InventoryIcon from '@/assets/Inventory.png'
import SalesIcon from '@/assets/Sales.png'
import AlertsIcon from '@/assets/Alerts.png'
import SuppliersIcon from '@/assets/Suppliers.png'
import OrdersIcon from '@/assets/Orders.png'
import SettingsIcon from '@/assets/Settings.png'
import HelpIcon from '@/assets/Help.png'
import Chevron from '@/assets/Chevron.png'

export default {
  name: 'App',
  components: {
    'sidebar-menu': SidebarMenu
  },
  data() {
    return {
      Chevron,
      menu: [
        {
          header: 'Main Navigation',
          hiddenOnCollapse: true
        },
        {
          href: '/Dashboard',
          title: 'Dashboard',
          icon: {
            element: 'img',
            attributes: { src: DashboardIcon }
          }
        },
        {
          href: '/inventory',
          title: 'Inventory',
          icon: {
            element: 'img',
            attributes: { src: InventoryIcon }
          }
        },
        {
          href: '/sales',
          title: 'Sales',
          icon: {
            element: 'img',
            attributes: { src: SalesIcon }
          }
        },
        {
          href: '/alerts',
          title: 'Alerts',
          icon: {
            element: 'img',
            attributes: { src: AlertsIcon }
          }
        },
        {
          href: '/suppliers',
          title: 'Suppliers',
          icon: {
            element: 'img',
            attributes: { src: SuppliersIcon }
          }
        },
        {
          href: '/orders',
          title: 'Orders',
          icon: {
            element: 'img',
            attributes: { src: OrdersIcon }
          }
        },
        {
          href: '/settings',
          title: 'Settings',
          icon: {
            element: 'img',
            attributes: { src: SettingsIcon }
          }
        },
        {
          href: '/help',
          title: 'Help',
          icon: {
            element: 'img',
            attributes: { src: HelpIcon }
          }
        }
      ],
      collapsed: true,
      isOnMobile: false
    }
  },
  mounted() {
    this.onResize()
    window.addEventListener('resize', this.onResize)
  },
  methods: {
    onToggleCollapse(collapsed) {
      console.log('onToggleCollapse', collapsed)
    },
    onItemClick(event, item) {
      console.log('onItemClick', event, item)
    },
    onResize() {
      if (window.innerWidth <= 767) {
        this.isOnMobile = true
        this.collapsed = true
      } else {
        this.isOnMobile = false
        this.collapsed = true
      }
    }
  }
}
</script>

<style scoped>
.v-sidebar-menu {
  --vsm-primary-color: #ff5733;
  --vsm-base-bg: #dda15e;
  --vsm-item-color: #ffffff;
  --vsm-item-active-bg: #bc6c25;
  --vsm-item-active-line-color: #bc6c25;
  --vsm-item-active-color: #ffffff;
  --vsm-item-hover-color: #ffffff;
  --vsm-item-hover-bg: #bc6c25;
  --vsm-dropdown-bg: #3a3f44;
  --vsm-icon-bg: #dda15e;
  --vsm-icon-active-bg: #bc6c25;
  --vsm-toggle-btn-color: #fff;
  --vsm-toggle-btn-bg: #dda15e;
  --vsm-mobile-item-color: #fff;
  --vsm-mobile-item-bg: #bc6c25;
  --vsm-mobile-icon-color: #dda15e;
  --vsm-mobile-icon-bg: transparent;
  --vsm-dropdown-bg: #36363b;
}

body,
html {
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Source Sans Pro', sans-serif;
  font-size: 18px;
  background-color: #f2f4f7;
  color: #262626;
}

#demo {
  padding-left: 290px;
  transition: 0.3s ease;
}

#demo.collapsed {
  padding-left: 65px;
}

#demo.onmobile {
  padding-left: 65px;
}

.sidebar-overlay {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: #000;
  opacity: 0.5;
  z-index: 900;
}

.demo {
  padding: 50px;
}

.container {
  max-width: 900px;
}
</style>