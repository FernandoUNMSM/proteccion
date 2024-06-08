import axiosInstance from "@/config/axiosInstance";
import * as service from '@/services/inversiones/valorunidad';

jest.mock("@/config/axiosInstance", () => ({
    __esModule: true,
    default: {
      get: jest.fn()
    }
  }));
describe("Valor Unidad Servicios",()=>{
    it("extracion informacion api",async ()=>{
        axiosInstance.get = jest.fn().mockResolvedValue({data:{}});
        const expect = service.obtenerValorUnidadByPortafolio({});
    })

    it("extracion informacion api error",async ()=>{
        axiosInstance.get = jest.fn().mockImplementationOnce(()=>Promise.reject(new Error("")));
        const expect = service.obtenerValorUnidadByPortafolio({});
    })
})