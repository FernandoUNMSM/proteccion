<template>
  <div>
    <table class="table">
      <thead v-if="showHeader">
        <tr>
          <th
            v-for="(header, index) in headers.filter(
              (i) => i.text !== '' || getPropertyValue('needed', i)
            )"
            :key="index"
            :colspan="getPropertyValue('colspan', header)"
          >
            {{ header.text }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, i) in data" :key="i">
          <td
            v-for="(h, index) in headers"
            :key="index"
            :class="{
              'DsTable-centerColumn': getPropertyValue('align', h) === 'center',
              'DsTable-rightColumn': getPropertyValue('align', h) === 'right',
              'DsTable-justifyColumn': getPropertyValue('align', h) === 'justify',
              'column-50-percent': Object.keys(item).length === 2,
            }"
          >
            <span
              :class="{ 'DsTable-boldColumn': getPropertyValue('bold', h) }"
            >
              {{ item[h.name] }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "DataSheetTable",
  props: {
    headers: Array,
    data: Array,
    showHeader: { type: Boolean, default: () => true },
  },
  methods: {
    getPropertyValue: function (property, item) {
      let value;
      switch (property) {
        case "colspan":
          value = item[property];
          if (value === undefined) value = 1;
          return value;
        case "align":
          value = item[property];
          if (value === undefined) value = "left";
          return value;
        case "bold":
          value = item[property];
          if (value === undefined) value = false;
          return value;
        case "text":
          value = item[property];
          if (value === undefined) value = "";
          return value;
        case "name":
          value = item[property];
          if (value === undefined) value = "";
          return value;
        case "needed":
          value = item[property];
          if (value === undefined) value = false;
          return value;
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.table {
  border-spacing: 5px 2.5px;
  width: 100%;
  /* display: block;
  max-width: 8.5in; */
}

.table th {
  color: #1d3d8f;
  font-size: 10pt;
  text-align: center;
}
.table tbody tr:nth-child(odd) {
  background-color: #f8f9f9;
}

.table tbody tr:nth-child(even) {
  background-color: white;
}

.table th {
  padding: 0px;
}
.table tbody td {
  font-size: 8pt;
  text-align: left;
  border: 1px dashed #dcddde;
  padding: 0px 2px;
  width: auto;
  max-width: 4in;
  line-height: 0.8rem;
}

.column-50-percent {
  width: 50% !important;
}

.DsTable-centerColumn {
  text-align: center !important;
}

.DsTable-rightColumn {
  text-align: right !important;
}

.DsTable-justifyColumn {
  text-align: justify !important;
}

.DsTable-boldColumn {
  font-weight: bold;
}
</style>
