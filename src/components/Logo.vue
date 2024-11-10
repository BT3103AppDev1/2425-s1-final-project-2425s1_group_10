<template>
    <div class="logo-container">
      <img src="@/assets/stockoverflowLogo.png" alt="Logo" class="logo-image" />
    </div>
  </template>
  
  <script>
  export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Logo',
  };
  </script>
  
  <style scoped>
  .logo-container {
    position: absolute;
    top: 20px;
    left: 70px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  
  .logo-image {
    width: 222px;
    height: 77px;
  }

  @media (max-width: 480px) {
    .logo-container {
      left: 10px;
    }
  }
  </style>
  
