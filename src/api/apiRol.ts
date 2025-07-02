import { ROL_END_POINT } from "../constants/endpoints";
import { IRol } from "./types/IRol";

export const getAllRol = async () => {
    try{
        const response = await fetch(ROL_END_POINT);
        if (!response.ok) throw new Error("Error al listar los Roles");

        let data = await response.json();
        console.log(data);
        return data;
    }
    catch(error){
        console.log(error);
        return error;
    }
}

export const getByIdRol = async (id: number) => {
    try{
        const response = await fetch(ROL_END_POINT + id);
        if(!response.ok) throw new Error(`Error al obtener el Rol con el Id ${id}`);

        let data = await response.json();
        console.log(data);
        return data;
    }
    catch(error){
        console.log(error);
        return error;
    }
}

export const updateRol = async (register: IRol) => {
    try{
        const response = await fetch(ROL_END_POINT, {
            method: "PUT",
            headers:  {"Content-Type": "application/json"},
            body: JSON.stringify(register),
        });

        if(!response.ok) throw new Error("Error al actualizar el rol");
        let data = await response.json();
        console.log(data);
        return data;
    }
    catch(error){
        return error;
    }
}

export const createRol = async (register: IRol) => {
    try {
        const response = await fetch(ROL_END_POINT, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(register),
        });
        
        if (!response.ok) throw new Error("Error al crear el Rol");
        let data = await response.json();
        console.log(data);
        return data;

    } catch (error) {
      
        return error;
    }
}

export const deleteRol = async (id: number) => {
    try{
        const response = await fetch(ROL_END_POINT + id + "?tipo=Logica",{
            method: "DELETE",
        });

        if (!response.ok) throw new Error("Error al eliminar el Rol");

        let data = await response.json();
        console.log(data);
        return data;
    }
    catch(error){
        return error;
    }
}