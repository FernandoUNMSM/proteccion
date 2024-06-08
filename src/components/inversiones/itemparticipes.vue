<template>
    <b-col md="3" class="text-center">
        <p class="m-0 p-0">PARTICIPES</p>
        <p v-if="valor!=''" class="font-weight-bold p--fsize">{{valor}}</p>
        <p v-else>No se encuentra registro</p>
    </b-col>
</template>

<script lang="ts">
    import Vue from 'vue'
    import {Component} from 'vue-property-decorator'
    import * as service from '@/services/inversiones/participes'

    @Component
    export default class ItemParticipes extends Vue{

        valor = ""

        async getDataToTable(datatosend: any){
            const data = await service.getParticipesPorFechaYPortafolio(datatosend);
            if(data!=null){
                this.valor = data.valor;
            }else{
                this.valor = "";
            }
        }

    }
</script>

<style scoped lang="stylus">
    .p--fsize
        font-size 1.5rem
</style>