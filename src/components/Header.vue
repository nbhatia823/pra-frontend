<template>
  <div id="header">
    <img id="logo" width="225" src="../assets/logo.png" />
    <Navbar id="navbar" />
  </div>
</template>

<script>
import Navbar from "./Navbar.vue";

export default {
  name: "Header",
  components: {
    Navbar
  }
};
</script>

<style>
#header {
  display: grid;

  grid-template-columns: 0.7fr 1fr 0.1fr;
  grid-template-rows: auto;
  grid-template-areas: "logo navbar";

  justify-content: center;
  align-content: center;
}

#logo {
  grid-area: logo;
}

#navbar {
  grid-area: navbar;
  justify-self: end;
}
</style>
