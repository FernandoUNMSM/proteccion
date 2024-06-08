import Respuesta from '@/types/commons/Respuesta';

export default interface ResponseProcesos{
    id: number;
    name: string;
    type: string;
    description: string;
    active: boolean;

}