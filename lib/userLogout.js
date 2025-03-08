import api from "./axiosInstance";

const userLogout = async () => {

  try {
    await api.get("/logout");
    localStorage.removeItem("authToken");
    
    return true; 
  } catch (error) {
    console.log(error.response?.data?.message);
    return false;
  }
};

export default userLogout;
