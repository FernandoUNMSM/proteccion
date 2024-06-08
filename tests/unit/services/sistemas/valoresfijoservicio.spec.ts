import axiosInstance from "@/config/axiosInstance";
import * as service from "@/services/sistema/valoresfijos";

jest.mock("@/config/axiosInstance", () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
  },
}));

describe("Sistema Servicios", () => {
  it("Listado de valores fijos", async () => {
    axiosInstance.get = jest.fn().mockResolvedValue({ data: { payload: 1 } });
    service.obtenerListadoDeValoresFijos("VOL-ALTA");
  });
  it("Listado de valores fijos reject", async () => {
    axiosInstance.get = jest.fn().mockRejectedValue({ data: {} });
    service.obtenerListadoDeValoresFijos("VOL-ALTA");
  });

  it("Listado de Conceptos comision", async () => {
    axiosInstance.get = jest.fn().mockResolvedValue({ data: {} });
    service.obtenerConceptosComision("VOL-ALTA");
  });
  it("Listado de Conceptos comision reject", async () => {
    axiosInstance.get = jest.fn().mockRejectedValue({ data: {} });
    service.obtenerConceptosComision("VOL-ALTA");
  });

  it("Listado otros factores portafolio", async () => {
    axiosInstance.get = jest.fn().mockResolvedValue({ data: {} });
    service.obtenerOtrosFactoresPortafolio("VOL-ALTA");
  });
  it("Listado otros factores portafolio reject", async () => {
    axiosInstance.get = jest.fn().mockRejectedValue({ data: {} });
    service.obtenerOtrosFactoresPortafolio("VOL-ALTA");
  });

  it("creacion de fechas", async () => {
    axiosInstance.put = jest.fn().mockResolvedValue({ data: {} });
    service.actualizarValorFijo({});
  });
  it("creacion de fechas reject", async () => {
    axiosInstance.put = jest.fn().mockRejectedValue({ data: {} });
    service.actualizarValorFijo({});
  });

  it("Valores Grafico", async () => {
    axiosInstance.get = jest.fn().mockResolvedValue({ data: {} });
    service.obtenerInfoGraficoValorUnidad("VOL-ALTA");
  });
  it("Valores Grafico reject", async () => {
    axiosInstance.get = jest.fn().mockRejectedValue({ data: {} });
    service.obtenerInfoGraficoValorUnidad("VOL-ALTA");
  });

  it("Almacenar Conceptos", async () => {
    axiosInstance.put = jest.fn().mockResolvedValue({ data: {} });
    service.almacenarConceptos({});
  });
  it("Almacenar Conceptos reject", async () => {
    axiosInstance.put = jest.fn().mockRejectedValue({ data: {} });
    service.almacenarConceptos({});
  });

  it("Almacenar Otros Factores", async () => {
    axiosInstance.put = jest.fn().mockResolvedValue({ data: {} });
    service.almacenarOtrosFactoresInversion({});
  });
  it("Almacenar Otros Factores reject", async () => {
    axiosInstance.put = jest.fn().mockRejectedValue({ data: {} });
    service.almacenarOtrosFactoresInversion({});
  });
});
