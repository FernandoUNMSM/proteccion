import axiosInstance from '@/config/axiosInstance';
import axios from 'axios';

export async function obtenerInformacionRentabilidades(datatosend: any){
    try {
        const response = await axiosInstance.get(`/ft/api/inversiones/rentabilidades`,{
            params:datatosend
        });
        return await response.data.payload;
    }catch (e) {
        console.log("error al conectar con la api de rentabilidades")
        return []
    }
}