import * as yup from 'yup';

export const userSchema = yup.object({
    userFName: yup.string().required('First name is required').min(2, 'First name must be at least 2 characters').max(50, 'First name cannot exceed 50 characters'),
    userLName: yup.string().required('Last name is required').min(2, 'Last name must be at least 2 characters').max(50, 'Last name cannot exceed 50 characters'),
    email: yup.string().email('Invalid email format').required('Email is required'),
    password: yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Confirm password is required'),
    age: yup.number().required('Age is required').min(18, 'You must be at least 18 years old').max(100, 'Age must be less than or equal to 100'),
    website: yup.string().url('Invalid URL format').nullable(),
    terms: yup.boolean().oneOf([true], 'You must accept the terms and conditions')
});
