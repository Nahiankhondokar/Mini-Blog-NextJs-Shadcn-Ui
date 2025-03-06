import axios from "axios";

const userLogout = async () => {
  const token = localStorage.getItem("authToken");

  try {
    await axios.get("http://127.0.0.1:8000/api/logout", {
      headers: {
        "X-Requested-With": "XMLHttpRequest",
        Authorization: `Bearer ${token}`,
      },
    });

    localStorage.removeItem("authToken");
    
    return true; 
  } catch (error) {
    console.log(error.response?.data?.message);
    return false;
  }
};

export default userLogout;
