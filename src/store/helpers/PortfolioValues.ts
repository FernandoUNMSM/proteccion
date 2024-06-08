import axiosInstance from "@/config/axiosInstance";
import axios from "axios";


const GetPortfolioValue = async function (input: any) {
    console.log("GetPortfolioValue")
    try {
        const value = await axiosInstance.get("ft/api/inversiones/valorFondo?fecha=" + input.date + "&codigoPortafolio=" + input.portfolio)
            .then(function (response) {
                return response.data.payload.valor
            });
        return value;
    } catch (error) {
        console.warn(error);
        return 0;
    }
}

const GetPortfolioParticipants = async function (input: any) {
    try {
        const value = await axiosInstance.get("ft/api/inversiones/participes?fecha=" + input.date + "&codigoPortafolio=" + input.portfolio)
            .then(function (response) {
                return response.data.payload.valor
            })
        return value;
    } catch (error) {
        console.warn(error)
    }
}

export default {
    GetPortfolioValue,
    GetPortfolioParticipants
}
