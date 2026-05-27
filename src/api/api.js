const BASE_URL = "http://localhost:8080/api/v1";

const api = {
  listar: async (recurso) => {
    const res = await fetch(`${BASE_URL}/${recurso}`);
    if (!res.ok) throw new Error(`Error al listar ${recurso}`);
    return res.json();
  },

  buscar: async (recurso, id) => {
    const res = await fetch(`${BASE_URL}/${recurso}/${id}`);
    if (!res.ok) throw new Error(`Error al buscar ${recurso}`);
    return res.json();
  },

  crear: async (recurso, datos) => {
    const res = await fetch(`${BASE_URL}/${recurso}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datos),
    });
    if (!res.ok) throw new Error(`Error al crear ${recurso}`);
    return res.json();
  },

  modificar: async (recurso, id, datos) => {
    const res = await fetch(`${BASE_URL}/${recurso}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datos),
    });
    if (!res.ok) throw new Error(`Error al modificar ${recurso}`);
    return res.json();
  },

  eliminar: async (recurso, id) => {
    const res = await fetch(`${BASE_URL}/${recurso}/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error(`Error al eliminar ${recurso}`);
    return res.json();
  },
};

export default api;