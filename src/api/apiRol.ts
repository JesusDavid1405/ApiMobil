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
      const response = await fetch(ROL_END_POINT + id + "?tipo=2",{
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
export let mockData: IRol[] = [
  { id: 1, name: "Administrador", description: "Acceso total al sistema", isDelete: false },
  { id: 2, name: "Editor", description: "Puede editar contenido", isDelete: false },
  { id: 3, name: "Visor", description: "Solo lectura", isDelete: false },
  { id: 4, name: "Gerente", description: "Puede modificar y eliminar algunos contenidos", isDelete: false },
];

// ✅ GET ALL
export const getAllMock = async (): Promise<IRol[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockData);
    }, 500); 
  });
};

//  GET BY ID
export const getByIdMock = async (id: number): Promise<IRol | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const item = mockData.find((f) => f.id === id) || null;
      resolve(item);
    }, 300);
  });
};

// ✅ CREATE
export const createMock = async (newItem: Omit<IRol, "id">): Promise<IRol> => {
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
export const updateMock = async (id: number, updatedItem: Partial<IRol>): Promise<IRol | null> => {
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