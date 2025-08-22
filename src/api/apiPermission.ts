import { IPermission } from "./types/IPermission";
import { PERMISSION_END_POINT } from "../constants/endpoints";


export const getAll = async () => {
    try{
        const response = await fetch(PERMISSION_END_POINT);
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

export const getById = async (id: number) => {
    try{
        const response = await fetch(PERMISSION_END_POINT + id);
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

export const update = async (register: IPermission) => {
    try{
        const response = await fetch(PERMISSION_END_POINT, {
            method: "PUT",
            headers:  {"Content-Type": "application/json"},
            body: JSON.stringify(register),
        });

        if(!response.ok) throw new Error("Error al actualizar el modulo");
        let data = await response.json();
        console.log(data);
        return data;
    }
    catch(error){
        return error;
    }
}

export const create = async (register: IPermission) => {
    try {
        const response = await fetch(PERMISSION_END_POINT, {
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

export const deleted = async (id: number) => {
    try{
        const response = await fetch(PERMISSION_END_POINT + id + "?tipo=2",{
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

let mockData: IPermission[] = [
    { id: 1, name: "Crear Usuario", description: "Permite crear nuevos usuarios", isDelete: false },
    { id: 2, name: "Editar Usuario", description: "Permite editar usuarios existentes", isDelete: false },
    { id: 3, name: "Eliminar Usuario", description: "Permite eliminar usuarios", isDelete: false },
];

// ✅ GET ALL
export const getAllMock = async (): Promise<IPermission[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockData);
        }, 500); 
    });
};

//  GET BY ID
export const getByIdMock = async (id: number): Promise<IPermission | null> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const item = mockData.find((f) => f.id === id) || null;
            resolve(item);
        }, 300);
    });
};

// ✅ CREATE
export const createMock = async (newItem: Omit<IPermission, "id">): Promise<IPermission> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const maxId = mockData.length > 0 ? Math.max(...mockData.map((i) => i.id)) : 0;
            const created = { ...newItem, id: maxId + 1 }; // 👈 siempre será mayor al existente
            mockData.push(created);
            resolve(created);
        }, 300);
    });
};

// ✅ UPDATE
export const updateMock = async (id: number, updatedItem: Partial<IPermission>): Promise<IPermission | null> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            let index = mockData.findIndex((f) => f.id === id);
            if (index === -1) return resolve(null);
            mockData[index] = { ...mockData[index], ...updatedItem };
            resolve(mockData[index]);
        }, 300);
    });
};

// ✅ DELETE
export const deleteMock = async (id: number): Promise<boolean> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const initialLength = mockData.length;
            mockData = mockData.filter((f) => f.id !== id);
            resolve(mockData.length < initialLength);
        }, 100);
    });
};