import { enviarNotificacion, enviarNotificacionTime } from "@/utilities/notificaciones";
import store from "@/store";
jest.mock("@/store", () => ({
  dispatch: jest.fn()
}));

describe("obtenerListadoLogs", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should dispatch onSetAlert action with correct payload", () => {
    const mensaje = "Test message";
    const variant = "success";
    const expectedPayload = {
      show: true,
      message: mensaje,
      variant: variant
    };

    enviarNotificacion(mensaje, variant);

    expect(store.dispatch).toHaveBeenCalledWith("alerts/onSetAlert", expectedPayload);
  });

  it("should dispatch onDeleteAlert action after 5 seconds", () => {
    jest.useFakeTimers();

    const mensaje = "Test message";
    const variant = "success";
    const expectedPayload = {
      show: true,
      message: mensaje,
      variant: variant
    };

    enviarNotificacion(mensaje, variant);

    jest.advanceTimersByTime(5000);

    expect(store.dispatch).toHaveBeenCalledWith("alerts/onDeleteAlert", expectedPayload);
  });

  it("should dispatch onSetAlert action with correct payload", () => {
    const mensaje = "Test message";
    const variant = "success";
    const expectedPayload = {
      show: true,
      message: mensaje,
      variant: variant
    };

    enviarNotificacionTime(mensaje, variant, 12);

    expect(store.dispatch).toHaveBeenCalledWith("alerts/onSetAlert", expectedPayload);
  });

  it("should dispatch onDeleteAlert action after 5 seconds", () => {
    jest.useFakeTimers();

    const mensaje = "Test message";
    const variant = "success";
    const expectedPayload = {
      show: true,
      message: mensaje,
      variant: variant
    };

    enviarNotificacionTime(mensaje, variant, 12);

    jest.advanceTimersByTime(5000);

    expect(store.dispatch).toHaveBeenCalledWith("alerts/onDeleteAlert", expectedPayload);
  });
});
