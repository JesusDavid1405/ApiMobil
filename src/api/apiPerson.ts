import { PERSON_END_POINT } from "../constants/endpoints";
import { IPerson } from "./types/IPerson";


export const getAll = async () => {
    try{
        const response = await fetch(PERSON_END_POINT);
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
        const response = await fetch(PERSON_END_POINT + id);
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

export const update = async (register: IPerson) => {
    try{
        const response = await fetch(PERSON_END_POINT, {
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

export const create = async (register: IPerson) => {
  try {
    const response = await fetch(PERSON_END_POINT, {
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
    const response = await fetch(PERSON_END_POINT + id + "?tipo=2",{
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

//Mock Data for Testing

let mockData: IPerson[] = [
  {
    id: 1,
    name: "Carlos",
    lastName: "Ramírez",
    description: "Administrador principal",
    typeDocument: "CC",
    documentNumber: "1002003001",
    phone: "3001234567",
    address: "Calle 123 #45-67",
    isDelete: false,
  },
  {
    id: 2,
    name: "María",
    lastName: "González",
    description: "Usuario estándar",
    typeDocument: "TI",
    documentNumber: "2003004002",
    phone: "3109876543",
    address: "Carrera 10 #20-30",
    isDelete: false,
  },
];

// ✅ GET ALL
export const getAllMock = async (): Promise<IPerson[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockData);
    }, 500); 
  });
};

//  GET BY ID
export const getByIdMock = async (id: number): Promise<IPerson | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const item = mockData.find((f) => f.id === id) || null;
      resolve(item);
    }, 300);
  });
};

// ✅ CREATE con id único
export const createMock = async (newItem: Omit<IPerson, "id">): Promise<IPerson> => {
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
export const updateMock = async (id: number, updatedItem: Partial<IPerson>): Promise<IPerson | null> => {
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