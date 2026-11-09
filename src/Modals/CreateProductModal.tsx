import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '@/Redux/hooks';
import { createProduct, resetCreateStatus } from '@/Redux/slices/productsSlice';
import { Button } from '@/Shared/Button';
import { SelectField, TextareaField } from '@/Shared/FormControls';
import { Modal } from '@/Shared/Modal';
import { TextField } from '@/Shared/TextField';
import { Thumb } from '@/Shared/DataTable';
import { useFormatters } from '@/Shared/useFormatters';
import { RequestStatus } from '@/types/Enums/RequestStatus';
import type { Product } from '@/types/product';
import { productSchema, type ProductFormValues } from '@/Validations/productSchema';

const Form = styled.form`
  display: grid;
  gap: ${({ theme }) => theme.spacing.md};
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.md};
`;

const Preview = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const FormError = styled.p`
  color: ${({ theme }) => theme.colors.danger};
  font-size: 14px;
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const initialValues: ProductFormValues = {
  title: '',
  description: '',
  price: '',
  category: '',
  image: '',
};

interface CreateProductModalProps {
  open: boolean;
  onClose: () => void;
  onCreated: (product: Product) => void;
}

export function CreateProductModal({ open, onClose, onCreated }: CreateProductModalProps) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { categories, createStatus } = useAppSelector((state) => state.products);
  const { category: categoryLabel } = useFormatters();

  const close = () => {
    formik.resetForm();
    dispatch(resetCreateStatus());
    onClose();
  };

  const formik = useFormik<ProductFormValues>({
    initialValues,
    validationSchema: productSchema,
    onSubmit: async (values) => {
      const input = productSchema.cast(values);
      const result = await dispatch(createProduct(input));
      if (createProduct.fulfilled.match(result)) {
        onCreated(result.payload);
        close();
      }
    },
  });

  // Schema messages are dictionary keys.
  const error = (name: keyof ProductFormValues) => {
    const key = formik.touched[name] ? formik.errors[name] : undefined;
    return key ? t(key as 'Products.errors.titleRequired') : undefined;
  };

  const submitting = createStatus === RequestStatus.Loading;
  const imageUrl = formik.values.image.trim();
  const showPreview = !formik.errors.image && /^https?:\/\//.test(imageUrl);

  return (
    <Modal
      open={open}
      title={t('Products.form.title')}
      closeLabel={t('Common.close')}
      onClose={close}
    >
      <Form noValidate onSubmit={formik.handleSubmit}>
        <TextField
          label={t('Products.form.fieldTitle')}
          error={error('title')}
          {...formik.getFieldProps('title')}
        />
        <TextareaField
          label={t('Products.form.fieldDescription')}
          error={error('description')}
          {...formik.getFieldProps('description')}
        />
        <Row>
          <TextField
            label={t('Products.form.fieldPrice')}
            inputMode="decimal"
            dir="ltr"
            error={error('price')}
            {...formik.getFieldProps('price')}
          />
          <SelectField
            label={t('Products.form.fieldCategory')}
            error={error('category')}
            {...formik.getFieldProps('category')}
          >
            <option value="">{t('Products.form.chooseCategory')}</option>
            {categories.map((slug) => (
              <option key={slug} value={slug}>
                {categoryLabel(slug)}
              </option>
            ))}
          </SelectField>
        </Row>
        <TextField
          label={t('Products.form.fieldImage')}
          type="url"
          inputMode="url"
          dir="ltr"
          placeholder="https://"
          error={error('image')}
          {...formik.getFieldProps('image')}
        />
        {showPreview && (
          <Preview>
            <Thumb src={imageUrl} alt={t('Products.form.preview')} />
            {t('Products.form.preview')}
          </Preview>
        )}

        {createStatus === RequestStatus.Failed && (
          <FormError role="alert">{t('Products.createFailed')}</FormError>
        )}

        <Actions>
          <Button type="button" $variant="ghost" onClick={close}>
            {t('Common.cancel')}
          </Button>
          <Button type="submit" disabled={submitting}>
            {submitting ? t('Products.form.submitting') : t('Products.form.submit')}
          </Button>
        </Actions>
      </Form>
    </Modal>
  );
}
