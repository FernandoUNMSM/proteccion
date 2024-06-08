import axiosInstance from '@/config/axiosInstance';
import axios from 'axios';

export async function obtenerValorUnidadByPortafolio(datatosend: any){
    try {
        const response = await axiosInstance.get(`/ft/api/inversiones/valorunidad`,{
            params:datatosend
        });
        return await response.data.payload;

    }catch (e) {
        console.log("error al conectar con la api de valor fondo")
        return null
    }
}