// FakeStoreAPI user (only the fields the admin uses). The API also returns `password`
// and `address`; passwords are deliberately never kept in app state.
export interface User {
  id: number;
  email: string;
  username: string;
  phone: string;
  name: { firstname: string; lastname: string };
}

export interface NewUser {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  phone: string;
}
