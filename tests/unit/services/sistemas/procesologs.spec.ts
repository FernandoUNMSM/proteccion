import axiosInstance from "@/config/axiosInstance";
import { obtenerValorParametro } from "@/services/sistema/parametroservice";
import { obtenerListadoLogs } from "@/services/sistema/procesologs";

// Mock axios to simulate API calls
jest.mock("@/config/axiosInstance", () => ({
  __esModule: true,
  default: {
    get: jest.fn()
  }
}));

describe("obtenerListadoLogs", () => {
  it("Listado de fechas", async () => {
    axiosInstance.get = jest.fn().mockResolvedValue({ data: {} });
    obtenerListadoLogs("procesoId", "2022-01-01");
  });
  it("Listado de fechas reject", async () => {
    axiosInstance.get = jest.fn().mockRejectedValue({ data: {} });
    obtenerListadoLogs("procesoId", "2022-01-01");
  });
  it("Listado de fechas reject", async () => {
    axiosInstance.get = jest.fn().mockResolvedValue({ data: {} });
    obtenerValorParametro("procesoId");
  });
  it("Listado de fechas reject", async () => {
    axiosInstance.get = jest.fn().mockRejectedValue({ data: {} });
    obtenerValorParametro("procesoId");
  });
});
