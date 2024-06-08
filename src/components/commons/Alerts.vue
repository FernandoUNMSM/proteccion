<template>
    <div class="alert--ctn-position">
        <b-alert v-for="(alert, indx) in alertas"  :variant="alert.variant" :show="alert.show" :key="indx" dismissible>
            <p class="m-0 p-0">{{alert.message}}</p>
        </b-alert>
    </div>
</template>
<script lang="ts">
    import Vue from 'vue'
    import {Component} from 'vue-property-decorator'
    import {namespace} from 'vuex-class'

    const alerts = namespace("alerts")

    @Component
    export default class Alerts extends Vue{

        @alerts.State
        alertas!:Array<any>;

    }
</script>
<style lang="stylus">
    .alert--ctn-position
        position fixed
        right 4%
        top 15%
        max-width 325px
        z-index 1000
</style>