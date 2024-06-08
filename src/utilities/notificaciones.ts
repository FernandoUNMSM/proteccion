import store from "@/store";

export function enviarNotificacion(mensaje: string, variant: string) {
  const alert = {
    show: true,
    message: mensaje,
    variant: variant
  };
  store.dispatch("alerts/onSetAlert", alert);
  setTimeout(() => {
    store.dispatch("alerts/onDeleteAlert", alert);
  }, 5000);
}

export function enviarNotificacionTime(mensaje: string, variant: string, time: number) {
  const alert = {
    show: true,
    message: mensaje,
    variant: variant
  };
  store.dispatch("alerts/onSetAlert", alert);
  setTimeout(() => {
    store.dispatch("alerts/onDeleteAlert", alert);
  }, time);
}
