import { object, string } from 'yup';


export const createProfileSchema = object().shape({
    name: string().required('Name is required').min(3),
    email: string().email('Invalid email').required('Email is required').min(5),
    hobby: string().required('Hobby is required').min(3),
});

export const getProfileSchema = string().required('User ID is required').label('User ID').length(36)
