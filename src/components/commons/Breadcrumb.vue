<template>
    <div class="row">
        <div class="col">
            <b-breadcrumb :items="items"/>
        </div>
    </div>
</template>
<script lang="ts">
    import Vue from 'vue'
    import {Component,Prop} from 'vue-property-decorator'

    @Component
    export default class LBreadCrumb extends Vue{
        @Prop(Array)
        items : Array<any> | undefined
    }
</script>