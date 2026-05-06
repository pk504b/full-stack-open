import axios from "axios";
const baseUrl = "/api/blogs";

const getBlogComments = async (BlogId) => {
  const request = axios.get(`${baseUrl}/${BlogId}/comments`);
  return request.then((response) => response.data);
};

const addComment = async (blogId, content) => {
  const response = await axios.post(`${baseUrl}/${blogId}/comments`, {
    content,
  });
  return response.data;
};


export default { getBlogComments, addComment };
