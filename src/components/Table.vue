<template>
  <section>
    <b-collapse :open="false" aria-id="contentIdForA11y1">
      <button
        class="button is-primary"
        id="columnOptions"
        slot="trigger"
        aria-controls="contentIdForA11y1"
      >Show/Hide Column Option</button>
      <div id="toggleArea">
        <div class="checkboxes content">
          <h4 class="checkboxHeader">Initial information:</h4>
          <div class="checkboxDiv">
            <div
              v-for="(state, name) in VIEWABLE_COLUMNS['INITIAL_INFO']"
              :key="name"
              class="control"
            >
              <b-checkbox v-model="VIEWABLE_COLUMNS['INITIAL_INFO'][name]">
                {{
                COLUMNS_TO_LABELS[name]
                }}
              </b-checkbox>
            </div>
          </div>
        </div>
        <div class="checkboxes content">
          <h4 class="checkboxHeader">Dates:</h4>
          <div class="checkboxDiv">
            <div v-for="(state, name) in VIEWABLE_COLUMNS['DATES']" :key="name" class="control">
              <b-checkbox v-model="VIEWABLE_COLUMNS['DATES'][name]">
                {{
                COLUMNS_TO_LABELS[name]
                }}
              </b-checkbox>
            </div>
          </div>
        </div>
        <div class="checkboxes content">
          <h4 class="checkboxHeader">Current information:</h4>
          <div class="checkboxDiv">
            <div
              v-for="(state, name) in VIEWABLE_COLUMNS['CURRENT_INFO']"
              :key="name"
              class="control"
            >
              <b-checkbox v-model="VIEWABLE_COLUMNS['CURRENT_INFO'][name]">
                {{
                COLUMNS_TO_LABELS[name]
                }}
              </b-checkbox>
            </div>
          </div>
        </div>
        <div class="checkboxes content">
          <h4 class="checkboxHeader">Analysis:</h4>
          <div class="checkboxDiv">
            <div v-for="(state, name) in VIEWABLE_COLUMNS['ANALYSIS']" :key="name" class="control">
              <b-checkbox v-model="VIEWABLE_COLUMNS['ANALYSIS'][name]">
                {{
                COLUMNS_TO_LABELS[name]
                }}
              </b-checkbox>
            </div>
          </div>
        </div>
      </div>
    </b-collapse>
    <!-- <div class="buttons">
      <b-button tag="router-link" to="/form" type="is-link">Create PRA</b-button>
    </div>-->
    <b-table
      :data="data"
      :columns="columns"
      :checked-rows.sync="checkedRows"
      checkbox-position="left"
      checkable
      hoverable
      paginated
      :current-page.sync="currentPage"
      paginationPosition="bottom"
      per-page="25"
      default-sort-direction="asc"
      default-sort="county"
    >
      <template slot-scope="props">
        <b-table-column
          field="county"
          label="County"
          searchable
          centered
          sortable
          :visible="VIEWABLE_COLUMNS['INITIAL_INFO']['county']"
        >
          <span class="tag is-medium">{{ props.row.county }}</span>
        </b-table-column>
        <b-table-column
          field="lea"
          label="LEA"
          searchable
          centered
          sortable
          :visible="VIEWABLE_COLUMNS['INITIAL_INFO']['lea']"
        >
          <span class="tag is-medium">{{ props.row.lea }}</span>
        </b-table-column>
        <b-table-column
          field="currentstatus"
          label="Status"
          searchable
          centered
          :visible="VIEWABLE_COLUMNS['CURRENT_INFO']['currentstatus']"
          sortable
        >
          <span class="tag is-medium">{{ props.row.currentstatus }}</span>
        </b-table-column>
        <b-table-column
          field="dateofrequest"
          label="Date of request"
          centered
          :visible="VIEWABLE_COLUMNS['INITIAL_INFO']['dateofrequest']"
          sortable
          :custom-sort="dateOfRequestSort"
        >
          <span class="tag is-medium">
            {{
            props.row.dateofrequest
            ? new Date(props.row.dateofrequest).toLocaleDateString()
            : ""
            }}
          </span>
        </b-table-column>
        <b-table-column
          field="startdaterequested"
          label="Start date requested"
          centered
          :visible="VIEWABLE_COLUMNS['DATES']['startdaterequested']"
          sortable
          :custom-sort="startDateRequestedSort"
        >
          <span class="tag is-medium">
            {{
            props.row.startdaterequested
            ? new Date(props.row.startdaterequested).toLocaleDateString()
            : ""
            }}
          </span>
        </b-table-column>
        <b-table-column
          field="enddaterequested"
          label="End date requested"
          centered
          :visible="VIEWABLE_COLUMNS['DATES']['enddaterequested']"
          sortable
          :custom-sort="endDateRequestedSort"
        >
          <span class="tag is-medium">
            {{
            props.row.enddaterequested
            ? new Date(props.row.enddaterequested).toLocaleDateString()
            : ""
            }}
          </span>
        </b-table-column>
        <b-table-column
          field="startdatereturned"
          label="Start date returned"
          centered
          :visible="VIEWABLE_COLUMNS['DATES']['startdatereturned']"
          sortable
          :custom-sort="startDateReturnedSort"
        >
          <span class="tag is-medium">
            {{
            props.row.startdatereturned
            ? new Date(props.row.startdatereturned).toLocaleDateString()
            : ""
            }}
          </span>
        </b-table-column>
        <b-table-column
          field="enddatereturned"
          label="End date returned"
          centered
          :visible="VIEWABLE_COLUMNS['DATES']['enddatereturned']"
          sortable
          :custom-sort="endDateReturnedSort"
        >
          <span class="tag is-medium">
            {{
            props.row.enddatereturned
            ? new Date(props.row.enddatereturned).toLocaleDateString()
            : ""
            }}
          </span>
        </b-table-column>
        <b-table-column
          field="dateoflastcontact"
          label="Date of last contact"
          centered
          :visible="VIEWABLE_COLUMNS['CURRENT_INFO']['dateoflastcontact']"
          sortable
          :custom-sort="dateOfLastContactSort"
        >
          <span class="tag is-medium">
            {{
            props.row.dateoflastcontact
            ? new Date(props.row.dateoflastcontact).toLocaleDateString()
            : ""
            }}
          </span>
        </b-table-column>
        <b-table-column
          field="leadmember"
          label="Lead member"
          searchable
          centered
          :visible="VIEWABLE_COLUMNS['CURRENT_INFO']['leadmember']"
          sortable
        >
          <span class="tag is-info is-medium">{{ props.row.leadmember }}</span>
        </b-table-column>
        <b-table-column
          field="issheriffsdept"
          label="SD/PD"
          searchable
          centered
          :visible="VIEWABLE_COLUMNS['INITIAL_INFO']['issheriffsdept']"
          sortable
        >
          <span class="tag is-medium">{{ props.row.issheriffsdept ? "SD" : "PD" }}</span>
        </b-table-column>
        <b-table-column
          field="datatype"
          label="Data type"
          searchable
          centered
          :visible="VIEWABLE_COLUMNS['INITIAL_INFO']['datatype']"
          sortable
        >
          <span class="tag is-medium">{{ props.row.datatype }}</span>
        </b-table-column>
        <b-table-column
          field="datereceived"
          label="Date received"
          centered
          :visible="VIEWABLE_COLUMNS['ANALYSIS']['datereceived']"
          sortable
          :custom-sort="dateReceivedSort"
        >
          <span class="tag is-medium">
            {{
            props.row.datereceived
            ? new Date(props.row.datereceived).toLocaleDateString()
            : ""
            }}
          </span>
        </b-table-column>
        <b-table-column
          field="variableschecked"
          label="Variables checked"
          searchable
          centered
          :visible="VIEWABLE_COLUMNS['ANALYSIS']['variableschecked']"
          sortable
        >
          <span class="tag is-medium">{{ props.row.variableschecked }}</span>
        </b-table-column>
        <b-table-column
          field="variablescomplete"
          label="Variables complete"
          searchable
          centered
          :visible="VIEWABLE_COLUMNS['ANALYSIS']['variablescomplete']"
          sortable
        >
          <span class="tag is-medium">{{ props.row.variablescomplete }}</span>
        </b-table-column>
        <b-table-column
          field="dataqualitychecked"
          label="Quality checked"
          searchable
          centered
          :visible="VIEWABLE_COLUMNS['ANALYSIS']['dataqualitychecked']"
          sortable
        >
          <span class="tag is-medium">{{ props.row.dataqualitychecked }}</span>
        </b-table-column>
        <b-table-column
          field="dataactionable"
          label="Actionable"
          searchable
          centered
          :visible="VIEWABLE_COLUMNS['ANALYSIS']['dataactionable']"
          sortable
        >
          <span class="tag is-medium">{{ props.row.dataactionable }}</span>
        </b-table-column>
        <b-table-column
          field="datacleaned"
          label="Cleaned"
          searchable
          centered
          :visible="VIEWABLE_COLUMNS['ANALYSIS']['datacleaned']"
          sortable
        >
          <span class="tag is-medium">{{ props.row.datacleaned }}</span>
        </b-table-column>
        <b-table-column
          field="datageocoded"
          label="Geocoded"
          searchable
          centered
          :visible="VIEWABLE_COLUMNS['ANALYSIS']['datageocoded']"
          sortable
        >
          <span class="tag is-medium">{{ props.row.datageocoded }}</span>
        </b-table-column>
        <b-table-column
          field="dataanalyzed"
          label="Analyzed"
          searchable
          centered
          :visible="VIEWABLE_COLUMNS['ANALYSIS']['dataanalyzed']"
          sortable
        >
          <span class="tag is-medium">{{ props.row.dataanalyzed }}</span>
        </b-table-column>
        <b-table-column centered>
          <b-button
            field="id"
            type="is-primary"
            outlined
            tag="router-link"
            :to="{
              name: 'Form',
              params: {
                initialData: data.find(el => el['id'] == props.row.id),
                updating: true
              }
            }"
          >View</b-button>
        </b-table-column>
      </template>

      <template slot="bottom-left">
        <b id="totalchecked">Total checked: {{ checkedRows.length }}</b>
      </template>
    </b-table>
  </section>
</template>

<script>
// CONTINUE WITH:
// change this.columns to work with columns to labels being an object instead of an array
import axios from "axios";
import {
  COLUMNS_TO_LABELS,
  VIEWABLE_COLUMNS,
  SEARCHABLE_COLUMNS
} from "../definitions.js";

export default {
  data() {
    return {
      data: [],
      columns: [],
      checkedRows: [],
      currentPage: 1,
      VIEWABLE_COLUMNS,
      COLUMNS_TO_LABELS
    };
  },
  mounted() {
    axios
      .get("https://pra-tracking-dev.herokuapp.com/api/pra?fields=all")
      .then(response => (this.data = response.data));
  },
  methods: {
    dateOfRequestSort(a, b, isAsc) {
      return isAsc
        ? new Date(b.dateofrequest).getTime() -
            new Date(a.dateofrequest).getTime()
        : new Date(a.dateofrequest).getTime() -
            new Date(b.dateofrequest).getTime();
    },
    dateReceivedSort(a, b, isAsc) {
      return isAsc
        ? new Date(b.datereceived).getTime() -
            new Date(a.datereceived).getTime()
        : new Date(a.datereceived).getTime() -
            new Date(b.datereceived).getTime();
    },
    startDateRequestedSort(a, b, isAsc) {
      return isAsc
        ? new Date(b.startdaterequested).getTime() -
            new Date(a.startdaterequested).getTime()
        : new Date(a.startdaterequested).getTime() -
            new Date(b.startdaterequested).getTime();
    },
    endDateRequestedSort(a, b, isAsc) {
      return isAsc
        ? new Date(b.enddaterequested).getTime() -
            new Date(a.enddaterequested).getTime()
        : new Date(a.enddaterequested).getTime() -
            new Date(b.enddaterequested).getTime();
    },
    startDateReturnedSort(a, b, isAsc) {
      return isAsc
        ? new Date(b.startdatereturned).getTime() -
            new Date(a.startdatereturned).getTime()
        : new Date(a.startdatereturned).getTime() -
            new Date(b.startdatereturned).getTime();
    },
    endDateReturnedSort(a, b, isAsc) {
      return isAsc
        ? new Date(b.enddatereturned).getTime() -
            new Date(a.enddatereturned).getTime()
        : new Date(a.enddatereturned).getTime() -
            new Date(b.enddatereturned).getTime();
    },
    dateOfLastContactSort(a, b, isAsc) {
      return isAsc
        ? new Date(b.dateoflastcontact).getTime() -
            new Date(a.dateoflastcontact).getTime()
        : new Date(a.dateoflastcontact).getTime() -
            new Date(b.dateoflastcontact).getTime();
    }
  }
};
</script>

<style>
.checkboxes {
  /* width: 80%; */
  margin: 0.25em auto;
  /* justify-content: space-between;
  display: grid;
  grid-template-columns: 1fr; */
}

#totalchecked {
  margin-left: 3em;
}

#columnOptions {
  margin-bottom: 2em;
  margin-top: -1em;
}

nav {
  padding-right: 3em;
}

#toggleArea {
  display: grid;
  grid-template-columns: 0.25fr 0.25fr 0.25fr 0.25fr;
}

.checkboxDiv {
  display: block;
  /* clear: both; */
}
</style>
