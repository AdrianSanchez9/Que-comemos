export interface Comida {
    id: number;
    nombre: string;
    tipo: string;
  }
  
  export interface Menu {
    id: number;
    nombre: string;
    tipoMenu: string;
    precio: number;
    comidas: Comida[];  
}