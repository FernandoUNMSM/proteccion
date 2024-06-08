<template>
  <div class="list-data-container">
    <p v-if="title !== ''" class="list-data-title">{{ title }}</p>
    <table class="list-data-table">
      <thead>
        <tr>
          <th
            v-for="(header, index) in headers.filter(
              (i) => i.text !== '' || getPropertyValue('needed', i)
            )"
            :key="index"
            :colspan="getPropertyValue('colspan', header)"
            :class="{
              'list-data-center-column':
                getPropertyValue('align', header) === 'center',
              'list-data-right-column':
                getPropertyValue('align', header) === 'right',
            }"
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
              'list-data-center-column':
                getPropertyValue('align', h) === 'center',
              'list-data-right-column':
                getPropertyValue('align', h) === 'right',
              'column-50-percent': Object.keys(item).length === 2,
            }"
          >
            <span
              :class="{ 'list-data-bold-column': getPropertyValue('bold', h) }"
            >
              {{ item[h.name] }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
    <br v-if="!showFooter">
    <p v-if="showFooter" class="list-data-footer">
      Encuentre la última calificación en:
      <a href="www.calificacion.com.co/fvp">www.calificacion.com.co/fvp</a>
    </p>
  </div>
</template>

<script>
export default {
  name: "DataSheetDataList",
  props: {
    title: String,
    headers: Array,
    data: Array,
    showFooter: { type: Boolean, default: () => true },
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
.list-data-container {
  text-align: left;
}
.list-data-title {
  color: #1d3d8f;
  font-size: 8pt;
  font-weight: bolder;
}

.list-data-table {
  border-spacing: 5px 2.5px;
  width: 100%;
}

.list-data-table tbody {
  font-size: 8pt;
  text-align: left;
}

.list-data-table th {
  color: #1d3d8f;
  font-size: 10pt;
}

.list-data-table tbody td {
  border-bottom: 1px dashed #dcddde;
}

.list-data-table tbody td span {
  background-color: white;
}

.list-data-footer {
  text-align: center;
  color: #5d87a1;
  font-size: 6pt;
  width: 200px;
  margin: auto;
  padding-top: 5px;
}
.list-data-footer a {
  color: #5d87a1;
  text-decoration: none;
}

.column-50-percent {
  width: 50% !important;
}

.list-data-center-column {
  text-align: center;
}

.list-data-right-column {
  text-align: center;
}

.list-data-bold-column {
  font-weight: bold;
}
</style>
