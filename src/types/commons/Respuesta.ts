export default interface Respuesta<E>{
    status : string;
    message: string;
    payload: Array<E> | E;
}