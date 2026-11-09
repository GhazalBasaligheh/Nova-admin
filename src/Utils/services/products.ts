import { ApiErrorKind } from '@/types/Enums/ApiErrorKind';
import type { NewProduct, Product } from '@/types/product';
import { ApiError } from '@/Utils/api/ApiError';
import { axiosInstance } from '@/Utils/api/axiosInstance';

function assertArray<T>(data: unknown, what: string): T[] {
  if (!Array.isArray(data)) throw new ApiError(ApiErrorKind.Parse, `Expected ${what} array`);
  return data as T[];
}

export async function getProducts(): Promise<Product[]> {
  const { data } = await axiosInstance.get<unknown>('/products');
  return assertArray<Product>(data, 'products');
}

export async function getCategories(): Promise<string[]> {
  const { data } = await axiosInstance.get<unknown>('/products/categories');
  return assertArray<string>(data, 'categories');
}

/**
 * FakeStoreAPI accepts the product and returns it with a new id, but does not store it.
 * Only the id is taken from the response; the rest is what the admin entered.
 */
export async function createProduct(input: NewProduct): Promise<Product> {
  const { data } = await axiosInstance.post<{ id?: unknown }>('/products', input);
  if (typeof data?.id !== 'number') {
    throw new ApiError(ApiErrorKind.Parse, 'Create product response has no numeric id');
  }
  return { ...input, id: data.id };
}
