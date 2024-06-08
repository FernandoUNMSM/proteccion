import axiosInstance from "@/config/axiosInstance";
import * as service from '@/services/inversiones/numerounidades';


jest.mock("@/config/axiosInstance", () => ({
    __esModule: true,
    default: {
      get: jest.fn()
    }
  }));

describe("Distribucion Servicios",()=>{
    it("extracion informacion api",async ()=>{
        axiosInstance.get = jest.fn().mockResolvedValue({data:{}});
        const expect = service.obtenerNumeroUnidadByPortafolio({});
    })

    it("extracion informacion api error",async ()=>{
        axiosInstance.get = jest.fn().mockImplementationOnce(()=>Promise.reject(new Error("")));
        const expect = service.obtenerNumeroUnidadByPortafolio({});
    })
})