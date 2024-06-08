<template>
    <layout ref="baselayout">
        <slot>
            <div class="container">
                <b-breadcrumb>
                    <b-breadcrumb-item active to="/procesos">Procesos</b-breadcrumb-item>
                </b-breadcrumb>
                <l-title title="procesos transformación"/>
                <b-row >
                    <b-col md="4">
                        <p-fechaproceso ref="inpDate" :label="true"></p-fechaproceso>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col class="mt-3">
                        <p-table ref="tblProcess"/>
                    </b-col>
                </b-row>
            </div>
        </slot>
    </layout>
</template>
<script lang="ts">
    import Vue from 'vue';
    import {Component} from 'vue-property-decorator';
    import FechaProceso from "@/components/fechaproceso/FechaProceso.vue";
    import TableProcesos from "@/components/procesos/tableprocesos.vue";

    @Component({
        components:{
            'p-fechaproceso': FechaProceso,
            'p-table': TableProcesos
        }
    })
    export default class Procesos extends Vue{

    }
</script>