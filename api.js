// const API = "http://10.0.2.2:3003/tasks"; //192.168.0.1
const API = "http://192.168.0.115:3003/tasks";

export const getTasks = async () => {
  try {
    const res = await fetch(API);
    return await res.json();
  } catch (err) {
    console.error("Failed to connect to task server");
  }
};

export const getTask = async (id) => { 
  const res = await fetch(`${API}/${id}`);
  return await res.json();
}

export const saveTask = async (newTask) => {
  const res = await fetch(API, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTask),
  });
  return await res.json();
};

export const deleteTask = async (id) => {
    fetch(`${API}/${id}`, {
        method: "DELETE",
    })
};

export const updateTask = async (id, newTask) => {
  await fetch(`${API}/${id}`, {
    method: "PUT",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify(newTask),
  });
}