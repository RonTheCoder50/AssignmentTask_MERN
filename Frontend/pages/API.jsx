import axios from "axios";
import toast from "react-hot-toast";

const API_URL = import.meta.env.VITE_API_URL;

const getToken = () => {
  return localStorage.getItem("token");
};

//register
export async function registerAPI(info) {
  try {
    const response = await axios.post(`${API_URL}/api/user/register`, info);
    return response.data;
  } catch (err) {
    console.log(err);
    console.log(err.response);
    toast.error(err?.response?.data?.message || "Internal server error!");
  }
}

//login
export async function loginAPI(info) {
  try {
    const response = await axios.post(`${API_URL}/api/user/login`, info);
    return response.data;
  } catch (err) {
    console.log(err);
    toast.error(err?.data?.message);
  }
}

//fetch all tasks
export async function apiCall() {
  try {
    const token = getToken();
    const response = await axios.get(`${API_URL}/api/task`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("response: ", response);

    if (!response) {
      toast.error("Failed to fetch data from server!");
      return;
    }

    return response.data;
  } catch (err) {
    toast.dismiss();
    toast.error("Internal Server Issue!");
    console.log(err);
  }
}

//add task
export async function addTaskAPI(data) {
  try {
    const token = getToken();
    const response = await axios.post(`${API_URL}/api/task`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response) {
      toast.error("Failed to add task!");
      return;
    }

    toast.success("Task created successfully!");
    return response.data;
  } catch (err) {
    toast.dismiss();
    toast.error("Failed to add task!");
    console.log(err);
  }
}

//update task
export async function updateTaskAPI(data) {
  const obj = {
    title: data.title.trim(),
    content: data.content.trim(),
  };

  const id = data?.id; //task id

  try {
    const token = getToken();
    const response = await axios.put(`${API_URL}/api/task/${id}`, obj, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response) {
      toast.error("Failed to update task!");
      return;
    }

    toast.success("Task updated successfully!");
    return response.data;
  } catch (err) {
    toast.error("Failed to update task!");
    console.log(err);
  }
}

//mark to completed
export async function completeTaskAPI(task, id) {
  try {
    const token = getToken();
    const response = await axios.put(`${API_URL}/api/task/${id}`, task, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response) {
      toast.error("Failed to complete task!");
      return;
    }

    toast.success("Task Completed!");
    return response.data;
  } catch (err) {
    toast.error("Failed to complete task!");
    console.log(err);
  }
}

//remove task
export async function removeTaskAPI(id) {
  try {
    const token = getToken();
    const response = await axios.delete(`${API_URL}/api/task/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response) {
      toast.error("Failed to delete task!");
      return;
    }

    toast.success("Task deleted successfully!");
    return response.data;
  } catch (err) {
    toast.error("Failed to delete task!");
    console.log(err);
  }
}
