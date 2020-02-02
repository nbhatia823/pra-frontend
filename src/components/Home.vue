<template>
  <div>
    <div v-if="ACCESS_CONTROL['access'] != 'none'" id="home">
      <Header id="header" />
      <Table id="table" />
    </div>
    <Login v-if="ACCESS_CONTROL['access'] == 'none'" id="login" />
  </div>
</template>

<script>
import Header from "./Header.vue";
import Table from "./Table.vue";
import Login from "./Login.vue";
import { ACCESS_CONTROL } from "../definitions.js";

export default {
  name: "app",
  components: {
    Header,
    Table,
    Login
  },
  data: function() {
    return {
      ACCESS_CONTROL
    };
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
  grid-template-areas: "header" "table";

  /* justify-content: space-evenly;
  align-content: space-evenly; */
}

#header {
  grid-area: header;
}

#table {
  grid-area: table;
}

#login {
  top: 0;
  left: 0;
  position: absolute;
  margin: auto;
  bottom: 0;
  right: 0;
  width: 30%;
  height: 30%;
}
</style>
