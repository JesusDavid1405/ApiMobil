import { FORM_END_POINT } from "../constants/endpoints";
import { IForm } from "./types/IForm";

// 🔹 GET ALL
export const getAllBook = async (): Promise<IForm[]> => {
  try {
    const response = await fetch(FORM_END_POINT);
    if (!response.ok) throw new Error("Error al listar los formularios");
    const data: IForm[] = await response.json();
    return data;
  } catch (error) {
    console.error("getAllBook error:", error);
    return [];
  }
};

// 🔹 CREATE (sin id en el request, id lo pone el backend)
export const createBook = async (register: Omit<IForm, "id">): Promise<IForm> => {
  try {
    const response = await fetch(FORM_END_POINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(register),
    });
    if (!response.ok) throw new Error("Error al crear el formulario");
    const data: IForm = await response.json();
    return data;
  } catch (error) {
    console.error("createBook error:", error);
    throw error;
  }
};

// 🔹 GET BY ID
export const getByIdBook = async (id: number): Promise<IForm | null> => {
  try {
    const response = await fetch(`${FORM_END_POINT}${id}`);
    if (!response.ok) throw new Error("Error al obtener el formulario");
    const data: IForm = await response.json();
    return data;
  } catch (error) {
    console.error("getByIdBook error:", error);
    return null; // 👈 en caso de error devolvemos null en vez de error
  }
};


// 🔹 UPDATE
export const updateBook = async (id: number, register: Partial<IForm>): Promise<IForm | null> => {
  try {
    const response = await fetch(`${FORM_END_POINT}${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(register),
    });
    if (!response.ok) throw new Error("Error al actualizar el formulario");
    const data: IForm = await response.json();
    return data;
  } catch (error) {
    console.error("updateBook error:", error);
    return null;
  }
};

// 🔹 DELETE
export const deleteBook = async (id: number): Promise<boolean> => {
  try {
    const response = await fetch(`${FORM_END_POINT}${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Error al eliminar el formulario");
    // Si el backend responde con 200, asumimos que se eliminó bien
    return true;
  } catch (error) {
    console.error("deleteBook error:", error);
    return false;
  }
};



// Simulamos una "BD" en memoria
let mockData: IForm[] = [
  {
    id: 1,
    url: "https://ejemplo.com/form1",
    name: "Formulario A",
    description: "Descripción del formulario A",
    isDelete: false,
  },
  {
    id: 2,
    url: "https://ejemplo.com/form2",
    name: "Formulario B",
    description: "Descripción del formulario B",
    isDelete: false,
  },
];


// ✅ GET ALL
export const getAllBookMock = async (): Promise<IForm[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockData);
    }, 500); // pequeño delay para simular llamada real
  });
};


//  GET BY ID
export const getByIdMock = async (id: number): Promise<IForm | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const item = mockData.find((f) => f.id === id) || null;
      resolve(item);
    }, 300);
  });
};

// ✅ CREATE
export const createMock = async (newItem: Omit<IForm, "id">): Promise<IForm> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const created = { ...newItem, id: mockData.length + 1 };
      mockData.push(created);
      resolve(created);
    }, 300);
  });
};

// ✅ UPDATE
export const updateMock = async (id: number, updatedItem: Partial<IForm>): Promise<IForm | null> => {
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