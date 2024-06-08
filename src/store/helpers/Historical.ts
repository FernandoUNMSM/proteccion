import axiosInstance from "@/config/axiosInstance";
import axios from "axios";

const TransformProfitability = function(data:any){
    try {
        return [
            {
                period: "Mes",
                portfolio : data.portafolioUltimomes,
                benchmark: data.benchmarkUltimomes
            },
            {
                period: "Trimestre",
                portfolio : data.portafolioUltimos3meses,
                benchmark: data.benchmarkUltimos3meses
            },
            {
                period: "1 año",
                portfolio : data.portafolioUltimoanio,
                benchmark: data.benchmarkUltimoanio
            },
            {
                period: "5 años",
                portfolio : data.portafolioUltimos5anios,
                benchmark: data.benchmarkUltimos5anios
            },
            {
                period: "Año corrido",
                portfolio : data.portafolioRentabilidad,
                benchmark: data.benchmarkRentabilidad
            }
        ]
    } catch (error) {
        console.warn(error);
        return [];
    }
}

const GetHistoricalProfitability = async function (input: any) {
    try {
        const data = await axiosInstance.get("ft/api/system/rentabilidad/itemevolucion?portafolio=" + input.portfolio + "&date=" + input.date + "&itemNombre=Rentabilidad")
            .then(function (response) {
                return response.data.payload
            });
        return TransformProfitability(data);
    } catch (error) {
        console.warn(error);
        return [];
    }
}

const TransformVolatility = function(data:any){
    try {
        return [
            {
                period: "Mes",
                portfolio : data.portafolioUltimomes,
                benchmark: data.benchmarkUltimomes
            },
            {
                period: "Trimestre",
                portfolio : data.portafolioUltimos3meses,
                benchmark: data.benchmarkUltimos3meses
            },
            {
                period: "1 año",
                portfolio : data.portafolioUltimoanio,
                benchmark: data.benchmarkUltimoanio
            },
            {
                period: "5 años",
                portfolio : data.portafolioUltimos5anios,
                benchmark: data.benchmarkUltimos5anios
            },
            {
                period: "Año corrido",
                portfolio : data.portafolioRentabilidad,
                benchmark: data.benchmarkRentabilidad
            }
        ]
    } catch (error) {
        console.warn(error);
        return [];
    }
}


const GetHistoricalVolatility = async function (input: any) {
    try {
        const data = await axiosInstance.get("ft/api/system/rentabilidad/itemevolucion?portafolio=" + input.portfolio + "&date=" + input.date + "&itemNombre=Volatilidad")
            .then(function (response) {
                return response.data.payload
            });
        return TransformVolatility(data);
    } catch (error) {
        console.warn(error);
        return [];
    }
}

export default {
    GetHistoricalProfitability,
    TransformProfitability,
    GetHistoricalVolatility,
    TransformVolatility
}