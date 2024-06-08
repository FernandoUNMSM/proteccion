import axiosInstance from "@/config/axiosInstance";
import * as service from "@/services/portafolios/index";

jest.mock("@/config/axiosInstance", () => ({
  __esModule: true,
  default: {
    get: jest.fn()
  }
}));

describe("Portafolio Servicios", () => {
  it("extracion informacion portafolios", async () => {
    axiosInstance.get = jest.fn().mockResolvedValue({ data: {} });
    service.getListaPortafolios();
  });
  it("extracion informacion portafolios reject", async () => {
    axiosInstance.get = jest.fn().mockRejectedValue({ data: {} });
    service.getListaPortafolios();
  });

  it("extracion informacion portafolio", async () => {
    axiosInstance.get = jest.fn().mockResolvedValue({ data: {} });
    service.obtenerPortafolio("");
  });
  it("extracion informacion portafolio reject", async () => {
    axiosInstance.get = jest.fn().mockRejectedValue({ data: {} });
    service.obtenerPortafolio("");
  });

  it("actualizar informacion portafolio", async () => {
    axiosInstance.put = jest.fn().mockResolvedValue({ data: {} });
    service.actualizarPortafolio({});
  });
  it("actualizar informacion portafolio reject", async () => {
    axiosInstance.put = jest.fn().mockRejectedValue({ data: {} });
    service.actualizarPortafolio({});
  });

  it("crear informacion portafolio", async () => {
    axiosInstance.post = jest.fn().mockResolvedValue({ data: {} });
    service.crearPortafolio({}, "VOL-ALTA");
  });
  it("crear informacion portafolio reject", async () => {
    axiosInstance.post = jest.fn().mockRejectedValue({ data: {} });
    service.crearPortafolio({}, "VOL-ALTA");
  });
});
