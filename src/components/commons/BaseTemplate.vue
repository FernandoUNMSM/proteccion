<template>
  <div class="h-100">
    <header class="container">
      <c-menu />
    </header>
    <main>
      <c-alerts />
      <slot></slot>
    </main>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import Menu from "./NavMenu.vue";
import Alerts from "./Alerts.vue";

@Component({
  components: {
    "c-menu": Menu,
    "c-alerts": Alerts
  }
})
export default class BaseTemplate extends Vue {}
</script>
