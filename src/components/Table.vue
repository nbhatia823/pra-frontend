<template>
  <b-table :data="data" :columns="columns"></b-table>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      data: [],
      columns: [
        {
          field: "county",
          label: "County",
          centered: true
        },
        {
          field: "lea",
          label: "LEA",
          centered: true
        },
        {
          field: "leadmember",
          label: "Lead Member",
          centered: true
        },
        {
          label: "Date of Request",
          field: "dateofrequest",
          centered: true
        },
        {
          label: "Start Date",
          field: "startdaterequested",
          centered: true
        },
        {
          label: "End Date",
          field: "enddaterequested",
          centered: true
        },
        {
          label: "Current Status",
          field: "currentstatus",
          centered: true
        }
      ]
    };
  },
  created() {
    this.printout();
  },
  mounted() {
    axios
      .get("https://pra-tracking-dev.herokuapp.com/api/pra")
      .then(response => (this.data = response.data));
    this.printout();
  },
  methods: {
    printout: function() {
      console.log(this.data);
    }
  }
};
</script>
