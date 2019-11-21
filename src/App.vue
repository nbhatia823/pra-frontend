<template>
  <div id="app">
    <Header id="header" />
    <!--<HelloWorld id="helloworld" msg="Welcome to Your Vue.js App"/>-->
    <Explore id="explore" />
  </div>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'
import Header from "./components/Header.vue";
import Explore from "./components/Explore.vue";

export default {
  name: "app",
  components: {
    Header,
    Explore
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  text-align: center;
  color: #2c3e50;

  display: grid;

  grid-template-columns: 1fr;
  grid-template-rows: auto;
  grid-template-areas: "header" "explore";

  /* justify-content: space-evenly;
  align-content: space-evenly; */
}

#header {
  grid-area: header;
}

#explore {
  grid-area: explore;
}
</style>
