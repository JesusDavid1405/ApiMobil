import { IUser } from "./types/IUser";
import { USER_END_POINT } from "../constants/endpoints";
import { mockData as personsMock } from "./apiPerson"; // 👈 tu mock de personas

export const getAll = async () => {
    try{
        const response = await fetch(USER_END_POINT);
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
        const response = await fetch(USER_END_POINT + id);
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

export const update = async (register: IUser) => {
    try{
        const response = await fetch(USER_END_POINT, {
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

export const create = async (register: IUser) => {
    try {
        const response = await fetch(USER_END_POINT, {
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
        const response = await fetch(USER_END_POINT + id + "?tipo=2",{
            method: "DELETE",
        });

        if (!response.ok) throw new Error("Error al eliminar el Rol");    let data = await response.json();    console.log(data);    return data;
    }
    catch(error){
        return error;
    }
}

export let mockData: IUser[] = [
    {
    id: 1,
    username: "duro123",
    personId: 1,
    personName: "Jesus",   // 👈 se agrega para mostrar en la lista
    email: "jesus@gmail.com",
    password: "jesus123_",
    isDelete: false,
    createdDate: new Date().toISOString(),
    active: true,
  },
  {
    id: 2,
    username: "maria263",
    personId: 2,
    personName: "Maria",
    email: "maria@gmail.com",
    password: "maria123_",
    isDelete: false,
    createdDate: new Date().toISOString(),
    active: false,
  },
];

// ✅ GET ALL
export const getAllMock = async (): Promise<IUser[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockData);
        }, 500); 
    });
};

//  GET BY ID
export const getByIdMock = async (id: number): Promise<IUser | null> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const item = mockData.find((f) => f.id === id) || null;
            resolve(item);
        }, 300);
    });
};

export const createMock = async (
  newItem: Omit<IUser, "id" | "createdDate" | "personName">
): Promise<IUser> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const person = personsMock.find((p) => p.id === newItem.personId);

      const created: IUser = {
        ...newItem,
        id: mockData.length > 0 ? Math.max(...mockData.map((u) => u.id)) + 1 : 1,
        createdDate: new Date().toISOString(),
        personName: person ? person.name : undefined, // 👈 back lo asigna
      };

      mockData.push(created);
      resolve(created);
    }, 300);
  });
};


// ✅ UPDATE
export const updateMock = async (id: number, updatedItem: Partial<IUser>): Promise<IUser | null> => {
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