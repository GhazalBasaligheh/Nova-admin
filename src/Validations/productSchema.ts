import { number, object, string } from 'yup';

// Minimal rules : every field required, price a number > 0, image a valid URL.
// No length or format limits
// Messages are dictionary keys.
export const productSchema = object({
  title: string().trim().required('Products.errors.titleRequired'),
  description: string().trim().required('Products.errors.descriptionRequired'),
  price: number()
    .typeError('Products.errors.pricePositive')
    .required('Products.errors.priceRequired')
    .moreThan(0, 'Products.errors.pricePositive'),
  category: string().required('Products.errors.categoryRequired'),
  image: string().trim().required('Products.errors.imageRequired').url('Products.errors.imageUrl'),
});

// Form values: price is typed as text in the input and converted by Yup on submit.
export interface ProductFormValues {
  title: string;
  description: string;
  price: string;
  category: string;
  image: string;
}
