import { ApiErrorKind } from '@/types/Enums/ApiErrorKind';
import type { NewUser, User } from '@/types/user';
import { ApiError } from '@/Utils/api/ApiError';
import { axiosInstance } from '@/Utils/api/axiosInstance';

interface ApiUser extends User {
  password?: string;
}

// Drops fields the admin doesn't need (notably the password) before they reach state.
function toUser({ id, email, username, phone, name }: ApiUser): User {
  return { id, email, username, phone, name };
}

export async function getUsers(): Promise<User[]> {
  const { data } = await axiosInstance.get<unknown>('/users');
  if (!Array.isArray(data)) throw new ApiError(ApiErrorKind.Parse, 'Expected users array');
  return (data as ApiUser[]).map(toUser);
}

/**
 * Maps the form's flat fields to the API's shape ({ name: { firstname, lastname } }).
 * FakeStoreAPI returns an id but does not store the user.
 */
export async function createUser(input: NewUser): Promise<User> {
  const body = {
    email: input.email,
    username: input.username,
    password: input.password,
    phone: input.phone,
    name: { firstname: input.firstName, lastname: input.lastName },
  };
  const { data } = await axiosInstance.post<{ id?: unknown }>('/users', body);
  if (typeof data?.id !== 'number') {
    throw new ApiError(ApiErrorKind.Parse, 'Create user response has no numeric id');
  }
  return toUser({ ...body, id: data.id });
}
