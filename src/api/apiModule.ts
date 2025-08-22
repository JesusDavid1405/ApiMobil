import { MODULE_END_POINT } from "../constants/endpoints";
import { IModule } from "./types/IModule";

export const getAll = async () => {
    try{
        const response = await fetch(MODULE_END_POINT);
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
        const response = await fetch(MODULE_END_POINT + id);
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

export const update = async (register: IModule) => {
    try{
        const response = await fetch(MODULE_END_POINT, {
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

export const create = async (register: IModule) => {
    try {
        const response = await fetch(MODULE_END_POINT, {
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
      const response = await fetch(MODULE_END_POINT + id + "?tipo=2",{
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


// 🔹 Datos iniciales de prueba
let mockData: IModule[] = [
  { id: 1, name: "Usuarios", description: "Gestión de usuarios del sistema", isDelete: false },
  { id: 2, name: "Roles", description: "Administración de roles y permisos", isDelete: false },
  { id: 3, name: "Reportes", description: "Módulo de reportes y estadísticas", isDelete: false },
];


// ✅ GET ALL
export const getAllMock = async (): Promise<IModule[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockData);
    }, 500); 
  });
};

//  GET BY ID
export const getByIdMock = async (id: number): Promise<IModule | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const item = mockData.find((f) => f.id === id) || null;
      resolve(item);
    }, 300);
  });
};

// ✅ CREATE
export const createMock = async (newItem: Omit<IModule, "id">): Promise<IModule> => {
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
export const updateMock = async (id: number, updatedItem: Partial<IModule>): Promise<IModule | null> => {
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