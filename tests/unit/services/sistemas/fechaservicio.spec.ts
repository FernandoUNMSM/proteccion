import axiosInstance from "@/config/axiosInstance";
import * as service from "@/services/sistema/fechaservicio";

jest.mock("@/config/axiosInstance", () => ({
  __esModule: true,
  default: {
    get: jest.fn()
  }
}));

describe("Sistema Servicios", () => {
  it("Listado de fechas", async () => {
    axiosInstance.get = jest.fn().mockResolvedValue({ data: {} });
    service.obtenerListadoDeFechas();
  });
  it("Listado de fechas reject", async () => {
    axiosInstance.get = jest.fn().mockRejectedValue({ data: {} });
    service.obtenerListadoDeFechas();
  });

  it("Listado de fechas por año", async () => {
    axiosInstance.get = jest.fn().mockResolvedValue({ data: {} });
    service.obtenerListadoDeFechasByAnio(2021);
  });
  it("Listado de fechas por año reject", async () => {
    axiosInstance.get = jest.fn().mockRejectedValue({ data: {} });
    service.obtenerListadoDeFechasByAnio(2021);
  });

  it("creacion de fechas", async () => {
    axiosInstance.post = jest.fn().mockResolvedValue({ data: {} });
    service.crearNuevaFecha({});
  });
  it("creacion de fechas reject", async () => {
    axiosInstance.post = jest.fn().mockRejectedValue({ data: {} });
    service.crearNuevaFecha({});
  });

  it("creacion de fechas", async () => {
    axiosInstance.put = jest.fn().mockResolvedValue({ data: {} });
    service.actualizarFecha({});
  });
  it("creacion de fechas reject", async () => {
    axiosInstance.put = jest.fn().mockRejectedValue({ data: {} });
    service.actualizarFecha({});
  });

  it("obtenerAniosInSistema", async () => {
    axiosInstance.get = jest.fn().mockResolvedValue({ data: {} });
    service.obtenerAniosInSistema();
  });
  it("obtenerAniosInSistema reject", async () => {
    axiosInstance.get = jest.fn().mockRejectedValue({ data: {} });
    service.obtenerAniosInSistema();
  });
});
