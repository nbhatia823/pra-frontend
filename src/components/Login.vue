<template>
  <section>
    <b-field label="Username">
      <b-input type="text" v-model="login_info['username']"></b-input>
    </b-field>

    <b-field label="Password">
      <b-input type="password" v-model="login_info['password']" password-reveal></b-input>
    </b-field>
    <b-button rounded id="loginButton" v-on:click="login" type="is-success">Login</b-button>
  </section>
</template>

<script>
import { ACCESS_CONTROL } from "../definitions.js";
import axios from "axios";

export default {
  data() {
    return {
      login_info: {
        username: "",
        password: ""
      },
      ACCESS_CONTROL
    };
  },
  methods: {
    login: function() {
      const vm = this;
      axios
        .post(
          `https://pra-tracking-dev.herokuapp.com/api/login`,
          JSON.stringify(vm.login_info),
          {
            headers: { "Content-type": "application/json" }
          }
        )
        .then(function(response) {
          if (response.status == 200) {
            vm.$buefy.toast.open({
              message: "Successfully logged in",
              type: "is-success",
              duration: 5000,
              position: "is-bottom"
            });
            ACCESS_CONTROL["access"] = response.data.access;
          } else {
            vm.alertLoginFailure();
          }
        })
        .catch(function(error) {
          console.log(error);

          vm.alertLoginFailure();
        });
    },
    alertLoginFailure() {
      this.$buefy.toast.open({
        message: "Incorrect login information",
        type: "is-danger",
        duration: 5000,
        position: "is-bottom"
      });
    }
  }
};
</script>