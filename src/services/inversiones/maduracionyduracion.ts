import axiosInstance from '@/config/axiosInstance';
import axios from 'axios';


export async function getListaModuracionYDuracion(dataSend:any){
    try{
        const response = await axiosInstance.get("/ft/api/inversiones/maduracion-inversion",{
            params:dataSend
        });
        const data = await response.data;
        return data;
    }catch (e) {
        console.log("Error de conexion con el servicio de Maduracion y Duración")
        return {
            message: "",
            payload: []
        };
    }
}