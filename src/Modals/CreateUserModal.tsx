import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '@/Redux/hooks';
import { createUser, resetCreateStatus } from '@/Redux/slices/usersSlice';
import { Button } from '@/Shared/Button';
import { Modal } from '@/Shared/Modal';
import { TextField } from '@/Shared/TextField';
import { RequestStatus } from '@/types/Enums/RequestStatus';
import type { User } from '@/types/user';
import { userSchema, type UserFormValues } from '@/Validations/userSchema';

const Form = styled.form`
  display: grid;
  gap: ${({ theme }) => theme.spacing.md};
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.md};
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

const initialValues: UserFormValues = {
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  password: '',
  phone: '',
};

interface CreateUserModalProps {
  open: boolean;
  onClose: () => void;
  onCreated: (user: User) => void;
}

export function CreateUserModal({ open, onClose, onCreated }: CreateUserModalProps) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const createStatus = useAppSelector((state) => state.users.createStatus);

  const close = () => {
    formik.resetForm();
    dispatch(resetCreateStatus());
    onClose();
  };

  const formik = useFormik<UserFormValues>({
    initialValues,
    validationSchema: userSchema,
    onSubmit: async (values) => {
      const result = await dispatch(createUser(userSchema.cast(values)));
      if (createUser.fulfilled.match(result)) {
        onCreated(result.payload);
        close();
      }
    },
  });

  const error = (name: keyof UserFormValues) => {
    const key = formik.touched[name] ? formik.errors[name] : undefined;
    return key ? t(key as 'Users.errors.firstNameRequired') : undefined;
  };

  const field = (name: keyof UserFormValues) => ({
    ...formik.getFieldProps(name),
    label: t(`Users.form.${name}`),
    error: error(name),
  });

  const submitting = createStatus === RequestStatus.Loading;

  return (
    <Modal open={open} title={t('Users.form.title')} closeLabel={t('Common.close')} onClose={close}>
      <Form noValidate onSubmit={formik.handleSubmit}>
        <Row>
          <TextField autoComplete="off" {...field('firstName')} />
          <TextField autoComplete="off" {...field('lastName')} />
        </Row>
        <TextField autoComplete="off" dir="ltr" {...field('username')} />
        <TextField type="email" autoComplete="off" dir="ltr" {...field('email')} />
        <Row>
          <TextField type="password" autoComplete="new-password" dir="ltr" {...field('password')} />
          <TextField type="tel" autoComplete="off" dir="ltr" {...field('phone')} />
        </Row>

        {createStatus === RequestStatus.Failed && (
          <FormError role="alert">{t('Users.createFailed')}</FormError>
        )}

        <Actions>
          <Button type="button" $variant="ghost" onClick={close}>
            {t('Common.cancel')}
          </Button>
          <Button type="submit" disabled={submitting}>
            {submitting ? t('Users.form.submitting') : t('Users.form.submit')}
          </Button>
        </Actions>
      </Form>
    </Modal>
  );
}
