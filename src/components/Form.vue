<template>
  <section>
    <Header id="header" />
    <section class="spaced">
      <progress
        id="progressBar"
        class="progress is-small is-success"
        :value="progress"
        max="100"
      >15%</progress>
    </section>
    <section id="form">
      <section class="formSection" id="initialData">
        <h1 class="title sectionHeader">Initial information</h1>
        <b-field grouped>
          <b-field
            label="Date of request"
            :type="{ 'is-success': data.dateofrequest instanceof Date }"
          >
            <b-datepicker
              editable
              v-model="data.dateofrequest"
              placeholder="Click to select..."
              icon="calendar-today"
            ></b-datepicker>
          </b-field>
          <b-field expanded label="County" :type="{ 'is-success': data.county }">
            <b-input type="text" v-model="data.county"></b-input>
          </b-field>

          <b-field expanded label="LEA" :type="{ 'is-success': data.lea }">
            <b-input v-model="data.lea"></b-input>
          </b-field>
          <b-field label="Sheriff's deptartment?">
            <b-checkbox v-model="data.issheriffsdept" id="sheriffsCheckbox"></b-checkbox>
          </b-field>
          <b-field label="Data type">
            <b-select placeholder="Select data type" v-model="data.datatype">
              <option value="Arrests">Arrests</option>
              <option v-if="!updating" value="Bookings">Bookings (also creates Arrests entry)</option>
              <option v-if="updating" value="Bookings">Bookings</option>
            </b-select>
          </b-field>
        </b-field>

        <b-field grouped>
          <b-field
            expanded
            label="Initial contact name"
            :type="{ 'is-success': data.initialcontact.name }"
          >
            <b-input placeholder="Name" v-model="data.initialcontact.name"></b-input>
          </b-field>
          <b-field label="Method" :type="{ 'is-success': data.initialcontact.method }">
            <b-select placeholder="Select a method" required v-model="data.initialcontact.method">
              <option v-for="method in CONTACT_METHODS" :key="method" :value="method">{{ method }}</option>
            </b-select>
          </b-field>
          <b-field expanded label="Info" :type="{ 'is-success': data.initialcontact.info }">
            <b-input placeholder="Contact info" v-model="data.initialcontact.info"></b-input>
          </b-field>
        </b-field>
        <b-field expanded label="Link to PRA Request">
          <b-input type="text" v-model="data.linktoprarequest"></b-input>
        </b-field>
        <b-field label="Comments">
          <b-input maxlength="2000" v-model="data.comments" type="textarea"></b-input>
        </b-field>
      </section>
      <section class="formSection">
        <h1 class="title sectionHeader">Dates</h1>

        <b-field grouped>
          <b-field
            expanded
            label="Start date requested"
            :type="{ 'is-success': data.startdaterequested instanceof Date }"
          >
            <b-datepicker
              editable
              v-model="data.startdaterequested"
              placeholder="Click to select..."
              icon="calendar-today"
            ></b-datepicker>
          </b-field>

          <b-field
            expanded
            label="End date requested"
            :type="{ 'is-success': data.enddaterequested instanceof Date }"
          >
            <b-datepicker
              editable
              v-model="data.enddaterequested"
              placeholder="Click to select..."
              icon="calendar-today"
            ></b-datepicker>
          </b-field>
          <b-field
            expanded
            label="Start date returned"
            :type="{ 'is-success': data.startdatereturned instanceof Date }"
          >
            <b-datepicker
              editable
              v-model="data.startdatereturned"
              placeholder="Click to select..."
              icon="calendar-today"
            ></b-datepicker>
          </b-field>

          <b-field
            expanded
            label="End date returned"
            :type="{ 'is-success': data.enddatereturned instanceof Date }"
          >
            <b-datepicker
              editable
              v-model="data.enddatereturned"
              placeholder="Click to select..."
              icon="calendar-today"
            ></b-datepicker>
          </b-field>
        </b-field>
      </section>
      <section class="formSection content">
        <h1 class="title sectionHeader">Variables</h1>
        <b-field grouped id="addVariable">
          <b-field>
            <b-input v-model="newVariable"></b-input>
          </b-field>
          <b-button v-on:click="addVariable" type="is-primary">Add variable</b-button>
        </b-field>

        <div id="variables" :key="variablesKey">
          <div v-for="column in variableColumns" :key="column[0]" class="variableColumn">
            <div class="variableInfoHeader">
              <div></div>
              <h6 class="alignTextLeft">Req.</h6>
              <h6 class="alignTextLeft">Rec.</h6>
            </div>
            <div v-for="variable in column" :key="variable" class="variableInfo">
              <span class="alignTextLeft">{{ variable }}</span>
              <b-switch v-model="data.variables[variable]['requested']"></b-switch>
              <b-switch type="is-success" v-model="data.variables[variable]['received']"></b-switch>
              <div class="buttons">
                <b-button
                  type="is-danger"
                  size="is-small"
                  v-on:click="deleteVariable(variable)"
                  outlined
                  rounded
                  class="trashButton"
                >
                  <i class="fas fa-trash"></i>
                </b-button>
              </div>
            </div>
          </div>
        </div>
        <!-- <h3 id="incompleteVariables">
          Number of incomplete variables: {{ incompleteVariables }}
        </h3>-->
      </section>
      <section class="formSection">
        <h1 class="title sectionHeader">Current information</h1>
        <b-field grouped>
          <b-field
            label="Date of last contact"
            :type="{ 'is-success': data.dateoflastcontact instanceof Date }"
          >
            <b-datepicker
              v-model="data.dateoflastcontact"
              placeholder="Click to select..."
              icon="calendar-today"
            ></b-datepicker>
          </b-field>

          <b-field label="Status" :type="{ 'is-success': data.currentstatus }">
            <b-select placeholder="Select a status" required v-model="data.currentstatus">
              <option v-for="status in STATUSES" :key="status" :value="status">{{ status }}</option>
            </b-select>
          </b-field>

          <b-field expanded label="Lead member" :type="{ 'is-success': data.leadmember }">
            <b-input type="text" v-model="data.leadmember"></b-input>
          </b-field>
        </b-field>
        <b-field grouped>
          <b-field
            expanded
            label="Current contact name"
            :type="{ 'is-success': data.currentcontact.name }"
          >
            <b-input placeholder="Name" v-model="data.currentcontact.name"></b-input>
          </b-field>
          <b-field label="Method" :type="{ 'is-success': data.currentcontact.method }">
            <b-select placeholder="Select a method" required v-model="data.currentcontact.method">
              <option v-for="method in CONTACT_METHODS" :key="method" :value="method">{{ method }}</option>
            </b-select>
          </b-field>
          <b-field expanded label="Info" :type="{ 'is-success': data.currentcontact.info }">
            <b-input placeholder="Contact info" v-model="data.currentcontact.info"></b-input>
          </b-field>
        </b-field>
      </section>
      <section class="formSection">
        <h1 class="title sectionHeader">Data processing</h1>
        <b-field grouped>
          <b-field
            expanded
            label="Date received"
            :type="{ 'is-success': data.datereceived instanceof Date }"
          >
            <b-datepicker
              editable
              v-model="data.datereceived"
              placeholder="Click to select..."
              icon="calendar-today"
            ></b-datepicker>
          </b-field>
          <b-field label="Variables checked" expanded>
            <b-checkbox v-model="data.variableschecked"></b-checkbox>
          </b-field>
          <b-field label="Variables complete" expanded>
            <b-checkbox v-model="data.variablescomplete"></b-checkbox>
          </b-field>
          <b-field label="Quality checked" expanded>
            <b-checkbox v-model="data.dataqualitychecked"></b-checkbox>
          </b-field>
          <b-field label="Actionable" expanded>
            <b-checkbox v-model="data.dataactionable"></b-checkbox>
          </b-field>
          <b-field label="Cleaned" expanded>
            <b-checkbox v-model="data.datacleaned"></b-checkbox>
          </b-field>
          <b-field label="Geocoded" expanded>
            <b-checkbox v-model="data.datageocoded"></b-checkbox>
          </b-field>
          <b-field label="Analyzed" expanded>
            <b-checkbox v-model="data.dataanalyzed"></b-checkbox>
          </b-field>
        </b-field>
      </section>
      <section class="formSection">
        <h1 class="title sectionHeader">Updates</h1>
        <b-field grouped>
          <b-field expanded>
            <b-input v-model="currentUpdate"></b-input>
          </b-field>
          <b-button v-on:click="submitUpdate" type="is-primary">Add update</b-button>
        </b-field>
        <b-table :data="data.updates" :columns="updatesColumns"></b-table>
      </section>
      <section v-if="editable">
        <div v-if="!updating">
          <b-button
            rounded
            size="is-large"
            id="createButton"
            v-on:click="createPRA"
            type="is-success"
          >Create</b-button>
        </div>
        <div v-if="updating">
          <b-button
            rounded
            size="is-large"
            id="createButton"
            v-on:click="updatePRA"
            type="is-success"
          >Update</b-button>
          <span id="space" />
          <b-button
            rounded
            size="is-large"
            id="deleteButton"
            v-on:click="confirmDeletePRA"
            type="is-danger"
          >Delete</b-button>
        </div>
      </section>
      <b-button
        rounded
        size="is-medium"
        id="cancelButton"
        v-on:click="confirmCancelPRA"
        type="is-primary"
        outlined
      >Cancel</b-button>
    </section>
  </section>
</template>

<script>
import {
  STATUSES,
  CONTACT_METHODS,
  INITIAL_VARIABLES,
  ACCESS_CONTROL
} from "../definitions.js";
import Header from "./Header.vue";
import axios from "axios";
import cloneDeep from "lodash";

export default {
  name: "Form",
  components: {
    Header
  },
  props: {
    initialData: {
      type: Object,
      default: function() {
        return {};
      }
    },
    updating: {
      type: Boolean,
      default: function() {
        return false;
      }
    }
  },
  data: function() {
    return {
      data: {},
      STATUSES,
      CONTACT_METHODS,
      TEMP_INITIAL_VARIABLES: JSON.parse(JSON.stringify(INITIAL_VARIABLES)),
      updatesColumns: [
        { field: "date", label: "Date", width: "200" },
        { field: "note", label: "Note" }
      ],
      currentUpdate: "",
      newVariable: "",
      variablesKey: 0,
      editable: false,
      ACCESS_CONTROL
    };
  },
  created: function() {
    this.editable = this.ACCESS_CONTROL["access"] == "admin";
    if (!this.updating) {
      this.data = {};
      this.prepareNewForm();
    } else {
      this.data = cloneDeep(this.initialData).value();
      this.prepareUpdatingForm();
    }
  },
  destroyed: function() {},
  computed: {
    progress: function() {
      const numValidKeys = Object.keys(this.data).filter(
        element => this.data[element] != null
      ).length;
      const numExtraFields = 4;
      return ((numValidKeys - numExtraFields) / 18) * 100;
    },
    variableColumns: function() {
      const variableKeys = Object.keys(this.data.variables);
      const numVariables = variableKeys.length;
      const variablesPerColumn = numVariables / 3;
      const variableColumns = [
        variableKeys.slice(0, variablesPerColumn),
        variableKeys.slice(variablesPerColumn, 2 * variablesPerColumn),
        variableKeys.slice(2 * variablesPerColumn, numVariables) //3 * variablesPerColumn),
        //variableKeys.slice(3 * variablesPerColumn, numVariables)
      ];
      return variableColumns;
    }
    // numIncompleteVariables: function() {
    //   return Object.keys(this.data.variables).filter(
    //     element =>
    //       this.data["variables"][element]["requested"] == true &&
    //       this.data["variables"][element]["received"] == false
    //   ).length;
    // }
  },
  methods: {
    prepareNewForm: function() {
      if (!("initialcontact" in this.data)) {
        this.$set(this.data, "initialcontact", {});
      }
      if (!("currentcontact" in this.data)) {
        this.$set(this.data, "currentcontact", {});
      }
      if (!("updates" in this.data)) {
        this.$set(this.data, "updates", []);
      }
      if (!("variables" in this.data)) {
        this.$set(
          this.data,
          "variables",
          cloneDeep(this.TEMP_INITIAL_VARIABLES).value()
        );
      }
    },
    prepareUpdatingForm: function() {
      if ("dateofrequest" in this.data && this.data["dateofrequest"] != null) {
        this.$set(
          this.data,
          "dateofrequest",
          new Date(this.data["dateofrequest"])
        );
      }
      if (
        "startdaterequested" in this.data &&
        this.data["startdaterequested"] != null
      ) {
        this.$set(
          this.data,
          "startdaterequested",
          new Date(this.data["startdaterequested"])
        );
      }
      if (
        "enddaterequested" in this.data &&
        this.data["enddaterequested"] != null
      ) {
        this.$set(
          this.data,
          "enddaterequested",
          new Date(this.data["enddaterequested"])
        );
      }
      if ("datereceived" in this.data && this.data["datereceived"] != null) {
        this.$set(
          this.data,
          "datereceived",
          new Date(this.data["datereceived"])
        );
      }
      if (
        "startdatereturned" in this.data &&
        this.data["startdatereturned"] != null
      ) {
        this.$set(
          this.data,
          "startdatereturned",
          new Date(this.data["startdatereturned"])
        );
      }
      if (
        "enddatereturned" in this.data &&
        this.data["enddatereturned"] != null
      ) {
        this.$set(
          this.data,
          "enddatereturned",
          new Date(this.data["enddatereturned"])
        );
      }
      if (
        "dateoflastcontact" in this.data &&
        this.data["dateoflastcontact"] != null
      ) {
        this.$set(
          this.data,
          "dateoflastcontact",
          new Date(this.data["dateoflastcontact"])
        );
      }
    },
    submitUpdate: function() {
      if (this.currentUpdate != "") {
        this.data.updates.push({
          date: new Date().toLocaleString("en-US"),
          note: this.currentUpdate
        });
        this.currentUpdate = "";
      }
    },
    addVariable: function() {
      if (
        this.newVariable != "" &&
        !(this.newVariable in this.data.variables)
      ) {
        this.$set(this.data.variables, this.newVariable, {
          requested: false,
          received: false
        });
        this.newVariable = "";
      }
      this.variablesKey += 1;
    },
    deleteVariable: function(name) {
      this.$delete(this.data.variables, name);
      this.variablesKey -= 1;
    },
    createPRA: function() {
      const vm = this;
      axios
        .post(
          "https://pra-tracking-dev.herokuapp.com/api/pra",
          JSON.stringify(this.data),
          {
            headers: { "Content-type": "application/json" }
          }
        )
        .then(function(response) {
          if (response.status == 201) {
            // IF SHERIFFS DEPT, NEED TO CREATE DUPLICATE ENTRY FOR ARRESTS
            if (vm.data.issheriffsdept) {
              vm.$set(vm.data, "datatype", "Arrests");
              axios
                .post(
                  "https://pra-tracking-dev.herokuapp.com/api/pra",
                  JSON.stringify(vm.data),
                  {
                    headers: { "Content-type": "application/json" }
                  }
                )
                .then(function(response) {
                  if (response.status == 201) {
                    vm.$buefy.toast.open({
                      message:
                        "Created two entries for Sheriff's Department – bookings and arrests",
                      type: "is-success",
                      duration: 5000,
                      position: "is-bottom"
                    });
                    vm.$router.push({ name: "Home" });
                  } else {
                    vm.alertCreationFailure();
                  }
                })
                .catch(function(error) {
                  console.log(error);

                  vm.alertCreationFailure();
                });
            }

            vm.$buefy.toast.open({
              message: "Successfully created",
              type: "is-success",
              duration: 5000,
              position: "is-bottom"
            });
            vm.$router.push({ name: "Home" });
          } else {
            vm.alertCreationFailure();
          }
        })
        .catch(function(error) {
          console.log(error);

          vm.alertCreationFailure();
        });
    },
    updatePRA: function() {
      const vm = this;
      axios
        .put(
          `https://pra-tracking-dev.herokuapp.com/api/pra/${vm.data.id}`,
          JSON.stringify(this.data),
          {
            headers: { "Content-type": "application/json" }
          }
        )
        .then(function(response) {
          if (response.status == 204) {
            vm.$buefy.toast.open({
              message: "Successfully updated",
              type: "is-success",
              duration: 5000,
              position: "is-bottom"
            });
          } else {
            vm.alertUpdateFailure();
          }
        })
        .catch(function(error) {
          console.log(error);

          vm.alertUpdateFailure();
        });
    },
    confirmDeletePRA: function() {
      this.$buefy.dialog.confirm({
        title: "Deleting PRA",
        message:
          "Are you sure you want to <b>delete</b> this entry? This action cannot be undone.",
        confirmText: "Delete",
        type: "is-danger",
        hasIcon: true,
        onConfirm: () => this.deletePRA()
      });
    },
    deletePRA: function() {
      const vm = this;
      axios
        .delete(`https://pra-tracking-dev.herokuapp.com/api/pra/${vm.data.id}`)
        .then(function(response) {
          if (response.status == 204) {
            vm.$buefy.toast.open({
              message: "Successfully deleted",
              type: "is-danger",
              duration: 5000,
              position: "is-bottom"
            });

            vm.$router.push({ name: "Home" });
          } else {
            vm.alertDeleteFailure();
          }
        })
        .catch(function(error) {
          console.log(error);

          vm.alertDeleteFailure();
        });
    },
    confirmCancelPRA: function() {
      this.$buefy.dialog.confirm({
        title: "Cancelling current changes",
        message:
          "Are you sure you want to <b>cancel</b> any changes? This action cannot be undone.",
        confirmText: "Yes",
        cancelText: "No",
        type: "is-danger",
        hasIcon: true,
        onConfirm: () => this.cancel()
      });
    },
    cancel: function() {
      this.$router.push({ name: "Home" });
    },
    alertCreationFailure() {
      this.$buefy.dialog.alert("Error creating PRA request");
    },
    alertUpdateFailure() {
      this.$buefy.dialog.alert("Error updating PRA request");
    },
    alertDeleteFailure() {
      this.$buefy.dialog.alert("Error deleting PRA request");
    }
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

#progressBar {
  margin: -0.5em auto 2em auto;
  width: 30%;
}

#form {
  margin: 0em 8em;
}

.formSection {
  margin: 4em 0em;
}

.sectionHeader {
  text-align: left;
}

#sheriffsCheckbox {
  margin-top: 0.5em;
}

#cancelButton {
  margin-top: 2em;
  margin-bottom: 4em;
}

#space {
  margin: 0.5em;
}

#variables {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  width: 100%;
  grid-column-gap: 3em;
}

.variableInfoHeader {
  display: grid;
  grid-template-columns: 10fr 5fr 5fr 3fr;
  padding: 0.2em;
  margin-bottom: 0em !important;
  margin: 0.5em;
}

.variableInfo {
  display: grid;
  grid-template-columns: 10fr 5fr 5fr 3fr;
  margin: 0.5em;
}

.alignTextLeft {
  text-align: left;
}

#addVariable {
  float: right;
}

.trashButton {
  border: 0px !important;
}
</style>
