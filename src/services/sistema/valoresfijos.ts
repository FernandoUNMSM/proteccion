import axiosInstance from '@/config/axiosInstance';

export async function obtenerListadoDeValoresFijos(portafolio: string){
    try{
        const response = await axiosInstance.post("/ft/api/system/valoresfijos/portafolio/"+portafolio.toUpperCase());
        const data = await response.data;
        return data.payload;
    }catch (e) {
        console.log("Error de conexion con el servicio de fechas")
        return [];
    }
}

export async function obtenerConceptosComision(portfolio: string) {
    try {
        const response = await axiosInstance.get('/ft/api/system/valoresfijos/conceptos', {
            params: {
                portafolio: portfolio.toUpperCase()
            }
        });
        const data = await response.data;
        return data.payload;
    } catch (e) {
        console.log("Error de conexion con el servicio de conceptos" + e)
        return[]
    }
}
export async function obtenerOtrosFactoresPortafolio(portfolio: string) {
    try {
        const response = await axiosInstance.get('/ft/api/system/valoresfijos/inversiones', {
            params: {
                portafolio: portfolio.toUpperCase()
            }
        });
        const data = await response.data;
        return data.payload;
    } catch (e) {
        console.log("Error de conexion con el servicio de otros factores de inversiones" + e)
        return[]
    }
}
export async function actualizarValorFijo(dataToSend: object){
    try{
        const response = await axiosInstance.put("/ft/api/system/valoresfijos/portafolio", dataToSend);
        const data = await response.data;
        return data.payload;
    }catch (e) {
        console.log("Error de conexion con el servicio de fechas")
        return {};
    }
}

export async function obtenerInfoGraficoValorUnidad(portafolio: string){
    try{
        const response = await axiosInstance.get("/ft/api/system/grafico/valorunidad/" + portafolio);
        const data = await response.data;
        return data.payload;
    }catch (e) {
        console.log("Error de conexion con el servicio de informacion grafico valor unidad")
        return {};
    }
}

export async function almacenarConceptos(data: any) {
    try {
        await axiosInstance.put("/ft/api/system/valoresfijos/conceptos", data);
    } catch (e) {
        console.error("Error de conexion con el servicio para almacenar los conceptos... " + e);
        return {};
    }
}

export async function almacenarOtrosFactoresInversion(data: any) {
    try {
        await axiosInstance.put("/ft/api/system/valoresfijos/inversiones", data);
    } catch (e) {
        console.error("Error de conexion con el servicio para almacenar los conceptos... " + e);
        return {};
    }
}