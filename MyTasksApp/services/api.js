const BASE_URL = 'http://192.168.0.101:5000/tasks'; //  replace with your local IP 

const handleError = async (res) => {
  const contentType = res.headers.get('content-type');
  const data = contentType?.includes('application/json') ? await res.json() : await res.text();
  console.error('API Error:', res.status, data);
  throw new Error(data?.message || 'Something went wrong');
};

// to get all tasks
export const fetchTasks = async () => {
  try {
    const res = await fetch(`${BASE_URL}/allTasks`);
    if (!res.ok) return await handleError(res);
    const data = await res.json();
    console.log('Fetched Tasks:', data);
    return data;
  } catch (err) {
    console.error('fetchTasks error:', err.message);
    return [];
  }
};

// to delete a task by ID
export const deleteTask = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/deleteTasks/${id}`, { method: 'DELETE' });
    if (!res.ok) return await handleError(res);
    console.log(`Deleted Task: ${id}`);
    return true;
  } catch (err) {
    console.error(`deleteTask error [${id}]:`, err.message);
    return false;
  }
};

// to toggle completion
export const toggleTask = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/toggle/${id}`, { method: 'PUT' });
    if (!res.ok) return await handleError(res);
    const updated = await res.json();
    console.log(`Toggled Task: ${id}`, updated);
    return updated;
  } catch (err) {
    console.error(`toggleTask error [${id}]:`, err.message);
  }
};

// to create new task
export const createTask = async ({ title, priority }) => {
  try {
    const res = await fetch(`${BASE_URL}/createTask`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, priority }),
    });
    if (!res.ok) return await handleError(res);
    const created = await res.json();
    console.log('Task Created:', created);
    return created;
  } catch (err) {
    console.error('createTask error:', err.message);
  }
};

// to update task
export const updateTask = async (id, updatedData) => {
  try {
    const res = await fetch(`${BASE_URL}/updateTask/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedData),
    });
    if (!res.ok) return await handleError(res);
    const updated = await res.json();
    console.log(`Task Updated: ${id}`, updated);
    return updated;
  } catch (err) {
    console.error(`updateTask error [${id}]:`, err.message);
  }
};
