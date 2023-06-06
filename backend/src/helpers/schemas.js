import { object, string } from 'yup';


export const profileSchema = object().shape({
    name: string().required('Name is required'),
    email: string().email('Invalid email').required('Email is required'),
    hobby: string().required('Hobby is required'),
});
