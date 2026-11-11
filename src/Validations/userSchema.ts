import { object, string, type InferType } from 'yup';

// Minimal rules : every field required, email must be a valid email.
// No length, password-strength or phone-format rule
// Messages are dictionary keys.
export const userSchema = object({
  firstName: string().trim().required('Users.errors.firstNameRequired'),
  lastName: string().trim().required('Users.errors.lastNameRequired'),
  username: string().trim().required('Users.errors.usernameRequired'),
  email: string().trim().required('Users.errors.emailRequired').email('Users.errors.emailInvalid'),
  password: string().required('Users.errors.passwordRequired'),
  phone: string().trim().required('Users.errors.phoneRequired'),
});

export type UserFormValues = InferType<typeof userSchema>;
