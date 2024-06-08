import axiosInstance from "@/config/axiosInstance";
import * as service from "@/services/procesos/index";

jest.mock("@/config/axiosInstance", () => ({
  __esModule: true,
  default: {
    get: jest.fn()
  }
}));

describe("Procesos Servicios", () => {
  it("Obtener lista de procesos", async () => {
    axiosInstance.get = jest.fn().mockResolvedValue({ data: {} });
    service.getListProcesos();
  });
  it("Obtener lista de procesos reject", async () => {
    axiosInstance.get = jest.fn().mockRejectedValue({ data: {} });
    service.getListProcesos();
  });

  it("ultima ejecucion de proceso", async () => {
    axiosInstance.get = jest.fn().mockResolvedValue({ data: {} });
    service.getUltimaEjecucionProceso(1, "2020-11-30");
  });
  it("ultima ejecucion de proceso reject", async () => {
    axiosInstance.get = jest.fn().mockRejectedValue({ data: {} });
    service.getUltimaEjecucionProceso(1, "2020-11-30");
  });

  it("subida de archivo", async () => {
    axiosInstance.post = jest.fn().mockResolvedValue({ data: {}});
    const f = new File([""], "filename", { type: "text/html" });
    service.uploadFileS3(f, "PRO-ALADIN");
  });
  it("subida de archivo status 200", async () => {
    axiosInstance.post = jest.fn().mockResolvedValue({ status: 200 });
    const f = new File([""], "filename", { type: "text/html" });
    service.uploadFileS3(f, "PRO-ALADIN");
  });
  it("subida de archivo reject", async () => {
    axiosInstance.post = jest.fn().mockRejectedValue({ data: {} });
    const f = new File([""], "filename", { type: "text/html" });
    service.uploadFileS3(f, "PRO-ALADIN");
  });
});
