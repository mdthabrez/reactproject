import api from "./api";
import authHeader from "./auth-header";

/////////// BASE URL IS ==> localhost:8080/api

const getPublicContent = () => {
  return api.get("/test/all");
};

const getUserBoard = () => {
  console.log(JSON.parse(localStorage.getItem("user")));
  const data =  JSON.parse(localStorage.getItem("user"));
  return api.get("/test/user" ,{
    params:{
      username:data.username,

    },
  });
};

const getModeratorBoard = () => {
  return api.get("/test/mod");
};

const getAdminBoard = () => {
  return api.get("/test/admin");
};

const UserService = {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
};

export default UserService;