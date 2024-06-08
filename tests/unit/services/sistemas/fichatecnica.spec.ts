import axiosInstance from "@/config/axiosInstance";
import * as service from "@/services/sistema/fichatecnica";

jest.mock("@/config/axiosInstance", () => ({
  __esModule: true,
  default: {
    get: jest.fn()
  }
}));

describe("Sistema Servicios", () => {
  it("Obtener listado de campos ficha tecnica", async () => {
    axiosInstance.get = jest.fn().mockResolvedValue({ data: {} });
    service.obtenerListadoDeCampos();
  });

  it("Obtener listado de campos ficha tecnica Rejected", async () => {
    axiosInstance.get = jest.fn().mockRejectedValue({ data: {} });
    service.obtenerListadoDeCampos();
  });

  it("creacion de fechas", async () => {
    axiosInstance.put = jest.fn().mockResolvedValue({ data: {} });
    service.actualizarCampo({});
  });

  it("creacion de fechas Rejected", async () => {
    axiosInstance.put = jest.fn().mockRejectedValue({ data: {} });
    service.actualizarCampo({});
  });
});
