<template>
  <div id="home">
    <Header id="header" />
    <Table id="table" />
  </div>
</template>

<script>
import Header from "./Header.vue";
import Table from "./Table.vue";

export default {
  name: "app",
  components: {
    Header,
    Table
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
</style>
