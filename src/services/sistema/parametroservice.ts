
import axiosInstance from '@/config/axiosInstance';
import axios from 'axios';

export async function obtenerValorParametro(nombreParametro: string){
    try{
        const response = await axiosInstance.get(`/ft/api/system/parametro/${nombreParametro}`);
        const data = await response.data;
        return data.payload;
    }catch (e) {
        console.log("Error de conexion con el servicio de parametros")
        return null;
    }
}