<template>
  <sidebar-menu 
    :menu="menu" 
    @collapse="onCollapse"
    @itemClick="onItemClick"
  >
  <template v-slot:toggle-icon>icon</template>
  </sidebar-menu>
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
  import LogoutIcon from '@/assets/Logout.png'

  
  export default {
    components: {
      'sidebar-menu': SidebarMenu
    },
    data() {
      return {
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
                attributes: {src: DashboardIcon },
            }
          },
          {
            href: '/inventory',
            title: 'Inventory',
            icon: {
                element: 'img',
                attributes: {src: InventoryIcon },
            }
          },
          {
            href: '/sales',
            title: 'Sales',
            icon: {
                element: 'img',
                attributes: {src: SalesIcon },
            }
          },
          {
            href: '/alerts',
            title: 'Alerts',
            icon: {
                element: 'img',
                attributes: {src: AlertsIcon },
            }
          },
          {
            href: '/suppliers',
            title: 'Suppliers',
            icon: {
                element: 'img',
                attributes: {src: SuppliersIcon },
            }
          },
          {
            href: '/orders',
            title: 'Orders',
            icon: {
                element: 'img',
                attributes: {src: OrdersIcon },
            }
          },
          {
            href: '/settings',
            title: 'Settings',
            icon: {
                element: 'img',
                attributes: {src: SettingsIcon },
            }
          },
          {
            href: '/help',
            title: 'Help',
            icon: {
                element: 'img',
                attributes: {src: HelpIcon },
            }
          },
          {
            href: '/Login',
            title: 'Log Out',
            icon: {
                element: 'img',
                attributes: {src: LogoutIcon },
            }
          },

        ]
      }
    },
    
  }
  </script>

<style scoped>
.v-sidebar-menu {
  --vsm-primary-color: #ff5733;
  --vsm-base-bg: #dda15e;
  --vsm-item-color: #ffffff;
  --vsm-item-active-bg: #bc6c25;
  --vsm-item-active-color: #ffffff;
  --vsm-item-hover-color: #ffffff;
  --vsm-item-hover-bg: #bc6c25;
  --vsm-dropdown-bg: #3a3f44;
  --vsm-icon-bg: #dda15e;
  --vsm-icon-active-bg: #bc6c25;
}
</style>

<sidebar-menu>
    <template v-slot:header>header</template>
    <template v-slot:footer>footer</template>
    <template v-slot:toggle-icon>toggle-icon</template>
    <template v-slot:dropdown-icon="{ isOpen }">
      <span v-if="!isOpen">+</span>
      <span v-else>-</span>
    </template>
</sidebar-menu>