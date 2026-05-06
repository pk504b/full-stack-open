import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const add = async (blog) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const response = await axios.post(baseUrl, blog, config);
  return response.data;
};

const incrementLike = async (id, blog) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const response = await axios.put(`${baseUrl}/${id}`, blog, config);
  return response.data;
};

const removeBlog = async (id) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  await axios.delete(`${baseUrl}/${id}`, config);
};

export default { getAll, add, setToken, incrementLike, removeBlog };
