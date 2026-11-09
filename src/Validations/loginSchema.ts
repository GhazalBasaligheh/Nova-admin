import { object, string, type InferType } from 'yup';

// Messages are dictionary keys (translated in the form), keeping the schema language-neutral.
export const loginSchema = object({
  username: string().trim().required('Login.errors.usernameRequired'),
  password: string().required('Login.errors.passwordRequired'),
});

export type LoginValues = InferType<typeof loginSchema>;
