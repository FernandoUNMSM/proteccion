<template>
    <b-col md="3" class="text-center">
        <p class="p-0 m-0">VALOR UNIDAD</p>
        <p v-if="valorFondo.valor!=''" class="font-weight-bold p--fsize">{{valorFondo.valor}}</p>
        <p v-else>No se encuentra registro</p>
    </b-col>
</template>

<script lang="ts">
    import Vue from 'vue'
    import moment from 'moment';
    import {Component} from 'vue-property-decorator'
    import * as service from '@/services/inversiones/valorunidad'
    import ValorFondo from '@/types/inversiones/valorfondo'

    @Component
    export default class ItemValorUnidad extends Vue{

        valorFondo : ValorFondo = {
            fecha: new Date(0),
            valor: "",
            codigoPortafolio: ""
        };

        async getDataToTable(dataTosend: any){
            const data = await service.obtenerValorUnidadByPortafolio(dataTosend);
            if(data == null){
                this.valorFondo = {
                    fecha: new Date(0),
                    valor: "",
                    codigoPortafolio: ""
                }
            }else{
                this.valorFondo = data;
            }
        }

    }
</script>

<style scoped lang="stylus">
    .p--fsize
        font-size 1.5rem
</style>