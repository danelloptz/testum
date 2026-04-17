<template>
  <div id="app">
    <router-view></router-view> 
  </div>
</template>

<style>
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }
  #app {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: start;
    overflow-y: scroll;
    scrollbar-width: none;
    background: #f8fafc;
    @media (max-width: 650px) {
      padding: 7px 0px;
    }
  }
  #app::-webkit-scrollbar {
        width: 0;  
        height: 0;
    }

  #app::-webkit-scrollbar-thumb {
        background: transparent;
    }

    .goog-te-banner-frame.skiptranslate {
  display: none !important;
}

body {
    position: static !important;
  top: 0 !important;
}

.goog-te-gadget {
  display: none !important;
}

.goog-logo-link {
  display: none !important;
}

.goog-te-combo {
  display: none !important;
}
</style>