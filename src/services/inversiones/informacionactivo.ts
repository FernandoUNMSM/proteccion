import axiosInstance from '@/config/axiosInstance';
import axios from 'axios';

export async function obtenerInformacionActivoByPortafolio(datatosend: any){
    try {
        const response = await axiosInstance.get(`/ft/api/inversiones/informacion-activo`,{
            params:datatosend
        });
        return await response.data.payload;

    }catch (e) {
        console.log("error al conectar con la api de informacion de activos")
        return []
    }
}