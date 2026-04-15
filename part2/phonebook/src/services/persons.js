import axios from "axios";
const baseUrl = "/api";

const getPersons = () => {
  return axios.get(`${baseUrl}/persons`).then((response) => response.data);
};

const addPerson = (person) => {
  return axios.post(`${baseUrl}/persons`, person).then((response) => response.data);
};

const updatePerson = (id, newPerson) => {
  return axios.put(`${baseUrl}/persons/${id}`, newPerson).then((response) => response.data);
};

const deletePerson = (id) => {
  return axios.delete(`${baseUrl}/persons/${id}`);
};

export default { getPersons, addPerson, updatePerson, deletePerson };