import axiosInstance from "@/config/axiosInstance";
import axios from "axios";

const GetBalanceBaseData = async function (input: any) {
    try {
        const data = await axiosInstance.get("ft/api/system/gastosycomsiones?portafolio=" + input.portfolio + "&date=" + input.date)
            .then(function (response) {
                return response.data.payload
            });

            const formatter = new Intl.NumberFormat('en-US');
        return {
            saldoInicial: data.saldoInicial,
            rendimientosBrutos: formatter.format(parseFloat(parseFloat(data.rendimientosBrutos).toFixed(0))),
            gastosYComisiones: formatter.format(parseFloat(parseFloat(data.gastosYComisiones).toFixed(0))),
            saldoFinal: formatter.format(parseFloat((1000000.0 + parseFloat(data.rendimientosBrutos) + parseFloat(data.gastosYComisiones)).toFixed(0)))
        }
         ;
    } catch (error) {
        console.warn(error);
        return {
            saldoInicial: "0",
            rendimientosBrutos: "0",
            gastosYComisiones: "0",
            saldoFinal: "0"
        }
    }
}

const TransformComissionDetail = function(data:Array<any>)
{
    try {
        const formatter = new Intl.NumberFormat('en-US');

        return data.map(function(e)
        {
            return {base: e.base, concepto: e.concepto, porcentaje: formatter.format(parseFloat(e.porcentaje)) +  "%"}
        });
    } catch (error) {
        console.warn(error);
        return [];
    }
}

const GetComissionDetail =  async function (input:any) {
    try {
        const data = await axiosInstance.get("ft/api/system/valoresfijos/conceptos?portafolio=" + input.portfolio)
            .then(function (response) {
                return response.data.payload
            });
        return TransformComissionDetail(data);
    } catch (error) {
        console.warn(error);
        return [];
    }
}

const TransformHistorical = function(data:any)
{
    try {
        const formatter = new Intl.NumberFormat('en-US');
        return [{
            name : "Remuneración efectivamente cobrada",
            value: formatter.format(parseFloat(data.remuneracionEfectivaCobrada)) + "%",
        },
        {
            name : "Gastos portafolio",
            value: formatter.format(parseFloat(data.gastosPortafolioHistorico)).slice(0, -1)  + "%",
        },
        {
            name : "Costos totales",
            value: formatter.format(parseFloat(data.costosTotalesHistorico)) + "%",
        }]
    } catch (error) {
        console.warn(error);
        return [];
    }
}

const GetHistoricalComission =  async function (input:any) {
    try {
        const data = await axiosInstance.get("ft/api/system/valores/gastosycomisiones/" + input.portfolio + "/" + input.date)
            .then(function (response) {
                return response.data.payload
            });
        return TransformHistorical(data);
    } catch (error) {
        console.warn(error);
        return [];
    }
}

export default {
    GetBalanceBaseData,
    GetComissionDetail,
    TransformHistorical,
    GetHistoricalComission
}