import { axiosInstance } from 'redux/axiosHerokuInstance';

export const getContacts = async () => {
  return await axiosInstance.get('/contacts');
};

export const postContact = async item => {
  return await axiosInstance.post('/contacts', item);
};

export const patchContact = async (id, item) => {
  return await axiosInstance.patch(`/contacts/${id}`, item);
};

export const deleteContact = async id => {
  return await axiosInstance.delete(`/contacts/${id}`);
};
