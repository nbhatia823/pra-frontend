/* exported DEFAULT_VIEWABLE_COLUMNS */
export const ACCESS_CONTROL = { access: "none" };

export const VIEWABLE_COLUMNS = {
  INITIAL_INFO: {
    county: true,
    lea: true,
    dateofrequest: true,
    issheriffsdept: true,
    datatype: true
  },
  DATES: {
    startdaterequested: true,
    enddaterequested: true,
    startdatereturned: false,
    enddatereturned: false
  },
  CURRENT_INFO: {
    leadmember: true,
    currentstatus: true,
    dateoflastcontact: false
  },
  ANALYSIS: {
    datereceived: true,
    variableschecked: false,
    variablescomplete: false,
    dataqualitychecked: false,
    dataactionable: false,
    datacleaned: false,
    datageocoded: false,
    dataanalyzed: false
  }
};

export const SEARCHABLE_COLUMNS = new Set([
  "county",
  "lea",
  "leadmember",
  "currentstatus"
]);

const ALL = [
  { comments: "Comments" },
  { county: "County" },
  { currentcontact: "Current contact" }, // name, method, info
  { currentstatus: "Status" },
  { dataactionable: "Date actionable?" },
  { dateanalyzed: "Data analyzed?" },
  { datacleaned: "Data cleaned?" },
  { datageocoded: "Data geocoded?" },
  { dataqualitychecked: "Data quality checked?" },
  { datatype: "Data type" },
  { dateoflastcontact: "Date of last contact" },
  { dateofrequest: "Date of request" },
  { datereceived: "Date received" },
  { enddaterequested: "End date requested" },
  { enddatereturned: "End date returned" },
  { initialcontact: "Initial contact" }, // name, method, info
  { issheriffsdept: "Is sheriffs dept.?" },
  { lea: "LEA" },
  { leadmember: "Lead member" },
  { linktoprarequest: "Link to PRA request" },
  { startdaterequested: "Start date requested" },
  { startdatereturned: "Start date returned" },
  { updates: "Updates" }, // each entry is stored with key as timestamp and value as the note
  { variables: "Variables" }, // each entry is stored with variable name as key, and then two subkeys:
  // the subkeys are requested (bool as value) and received (bool as value)
  { variableschecked: "Variables checked?" },
  { variablescomplete: "Variables complete?" }
];

export const COLUMNS_TO_LABELS = {
  county: "County",
  lea: "LEA",
  dateofrequest: "Date of request",
  startdaterequested: "Start date requested",
  enddaterequested: "End date requested",
  currentstatus: "Status",
  startdatereturned: "Start date returned",
  enddatereturned: "End date returned",
  leadmember: "Lead member",
  dateoflastcontact: "Date of last contact",
  issheriffsdept: "SD/PD",
  datatype: "Data type",
  datereceived: "Date received",
  variableschecked: "Variables checked",
  variablescomplete: "Variables complete",
  dataqualitychecked: "Quality checked",
  dataactionable: "Actionable",
  datacleaned: "Cleaned",
  datageocoded: "Geocoded",
  dataanalyzed: "Aanalyzed"
};

export const STATUSES = [
  "Data requested - no response",
  "Data requested - in process",
  "Data received - incomplete",
  "Data received - no errors",
  "Data ready for analysis"
];

const STATUS_PAIRS = [
  ("Data requested - no response", "Data requested - no response"),
  ("Data requested - in process", "Data requested - in process"),
  ("Data received - incomplete", "Data received - incomplete"),
  ("Data received - no errors", "Data received - no errors"),
  ("Data ready for analysis", "Data ready for analysis")
];

export const CONTACT_METHODS = ["Phone", "Email", "Fax", "Portal"];

export const INITIAL_VARIABLES = {
  ARREST_ADD: {
    requested: false,
    received: false
  },
  ARREST_DT: {
    requested: false,
    received: false
  },
  BAIL_AMT: {
    requested: false,
    received: false
  },
  CHARGES: {
    requested: false,
    received: false
  },
  DOB: {
    requested: false,
    received: false
  },
  FIRST_NAME: {
    requested: false,
    received: false
  },
  HOME_ADD: {
    requested: false,
    received: false
  },
  HOME_ZIP: {
    requested: false,
    received: false
  },
  LAST_NAME: {
    requested: false,
    received: false
  },
  LEA: {
    requested: false,
    received: false
  },
  OCCUPATION: {
    requested: false,
    received: false
  },
  RACE: {
    requested: false,
    received: false
  },
  RELEASE_DT: {
    requested: false,
    received: false
  },
  RELEASE_RSN: {
    requested: false,
    received: false
  },
  SEX: {
    requested: false,
    received: false
  },
  UNIQUE_ID: {
    requested: false,
    received: false
  }
};
