import axiosInstance from '@/config/axiosInstance';
import axios from 'axios';


export async function getListaTopInversiones(dataSend:any){
    try{
        const response = await axiosInstance.get("/ft/api/inversiones/top-inversiones",{
            params:dataSend
        });
        const data = await response.data;
        return data;
    }catch (e) {
        console.log("Error de conexion con el servicio de fechas")
        return {
            message:"",
            payload:[]
        };
    }
}