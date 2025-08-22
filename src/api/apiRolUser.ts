import { IRolUser } from "./types/IRolUser";
import { ROLUSER_END_POINT } from "../constants/endpoints";
import { mockData as usersMock } from "./apiUser"; // 👈 tu mock de usuarios
import { mockData as RolMock } from "./apiRol"; // 👈 tu mock de personas

export const getAll = async () => {
    try {
        const response = await fetch(ROLUSER_END_POINT);
        if (!response.ok) throw new Error("Error al listar los RolUser");

        let data = await response.json();
        console.log(data);
        return data;
    }
    catch (error) {
        console.log(error);
        return error;
    }
}

export const getById = async (id: number) => {
    try {
        const response = await fetch(ROLUSER_END_POINT + id);
        if (!response.ok) throw new Error(`Error al obtener el RolUser con el Id ${id}`);

        let data = await response.json();
        console.log(data);
        return data;
    }
    catch (error) {
        console.log(error);
        return error;
    }
}

export const update = async (register: IRolUser) => {
    try {
        const response = await fetch(ROLUSER_END_POINT, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(register),
        });

        if (!response.ok) throw new Error("Error al actualizar el RolUser");
        let data = await response.json();
        console.log(data);
        return data;
    }
    catch (error) {
        return error;
    }
}

export const create = async (register: IRolUser) => {
    try {
        const response = await fetch(ROLUSER_END_POINT, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(register),
        });

        if (!response.ok) throw new Error("Error al crear el RolUser");
        let data = await response.json();
        console.log(data);
        return data;

    } catch (error) {
        return error;
    }
}

export const deleted = async (id: number) => {
    try {
        const response = await fetch(ROLUSER_END_POINT + id + "?tipo=2", {
            method: "DELETE",
        });

        if (!response.ok) throw new Error("Error al eliminar el RolUser"); let data = await response.json(); console.log(data); return data;
    }
    catch (error) {
        return error;
    }
}

export let mockData: IRolUser[] = [
    {
        id: 1,
        rolId: 1,
        rolName: "Administrador",
        userId: 1,
        userName: "Jesus",
        isDelete: false,
    },
    {
        id: 2,
        rolId: 2,
        rolName: "Editor",
        userId: 2,
        userName: "María",
        isDelete: false,
    },
    {
        id: 3,
        rolId: 3,
        rolName: "Usuario",
        userId: 1,
        userName: "Jesus",
        isDelete: false,
    },
];

// ✅ GET ALL
export const getAllMock = async (): Promise<IRolUser[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockData);
        }, 500);
    });
};

//  GET BY ID
export const getByIdMock = async (id: number): Promise<IRolUser | null> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const item = mockData.find((f) => f.id === id) || null;
            resolve(item);
        }, 300);
    });
};

export const createMock = async (
    newItem: Omit<IRolUser, "id" | "createdDate" | "personName">
): Promise<IRolUser> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const rol = RolMock.find((p) => p.id === newItem.rolId);
            const user = usersMock.find((u) => u.id === newItem.userId);

            const created: IRolUser = {
                ...newItem,
                id: mockData.length > 0 ? Math.max(...mockData.map((u) => u.id)) + 1 : 1,
                rolName: rol ? rol.name : undefined, // 👈 back lo asigna
                userName: user ? user.username : undefined, // 👈 back lo asigna
            };

            mockData.push(created);
            resolve(created);
        }, 300);
    });
};


// ✅ UPDATE
export const updateMock = async (id: number, updatedItem: Partial<IRolUser>): Promise<IRolUser | null> => {
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