import { useFormik } from 'formik';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router';
import { BagIcon, EyeIcon, EyeOffIcon, GlobeIcon, MoonIcon, SunIcon } from '@/assets/Icons';
import { useAppDispatch, useAppSelector } from '@/Redux/hooks';
import { login } from '@/Redux/slices/authSlice';
import { setLanguage, toggleTheme } from '@/Redux/slices/uiSlice';
import type { RedirectState } from '@/Routes/guards';
import { DEFAULT_AUTHENTICATED_PATH } from '@/Routes/paths';
import { Button, IconButton } from '@/Shared/ui/Button';
import { TextField } from '@/Shared/ui/TextField';
import { ApiErrorKind } from '@/types/Enums/ApiErrorKind';
import { Language } from '@/types/Enums/Language';
import { RequestStatus } from '@/types/Enums/RequestStatus';
import { Theme } from '@/types/Enums/Theme';
import type { SerializedApiError } from '@/Utils/api/ApiError';
import { loginSchema, type LoginValues } from '@/Validations/loginSchema';
import {
  Page,
  Corner,
  Card,
  Brand,
  Heading,
  Form,
  FormError,
  PasswordToggle,
} from './LoginPage.styles';

function loginErrorKey(error: SerializedApiError) {
  // FakeStoreAPI answers wrong credentials with 401 (docs also list 400 for bad input).
  if (error.kind === ApiErrorKind.Unauthorized || error.kind === ApiErrorKind.Client) {
    return 'Login.invalidCredentials' as const;
  }
  if (error.kind === ApiErrorKind.Network) return 'Common.networkError' as const;
  return 'Common.unknownError' as const;
}

export function LoginPage() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { status, error } = useAppSelector((state) => state.auth);
  const { theme, language } = useAppSelector((state) => state.ui);
  const [showPassword, setShowPassword] = useState(false);
  const otherLanguage = language === Language.Fa ? Language.En : Language.Fa;

  const formik = useFormik<LoginValues>({
    initialValues: { username: '', password: '' },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      const result = await dispatch(
        login({ username: values.username.trim(), password: values.password }),
      );
      if (login.fulfilled.match(result)) {
        const from = (location.state as RedirectState | null)?.from;
        navigate(from ?? DEFAULT_AUTHENTICATED_PATH, { replace: true });
      }
    },
  });

  const fieldError = (name: keyof LoginValues) => {
    const message = formik.touched[name] ? formik.errors[name] : undefined;
    return message ? t(message as 'Login.errors.usernameRequired') : undefined;
  };

  const submitting = status === RequestStatus.Loading;

  return (
    <Page>
      <Corner>
        <Button
          type="button"
          $variant="ghost"
          onClick={() => dispatch(setLanguage(otherLanguage))}
          aria-label={t('Topbar.switchLanguage')}
        >
          <GlobeIcon size={18} />
          <span lang={otherLanguage}>{t(`Languages.${otherLanguage}`)}</span>
        </Button>
        <IconButton
          type="button"
          onClick={() => dispatch(toggleTheme())}
          aria-label={theme === Theme.Light ? t('Topbar.switchToDark') : t('Topbar.switchToLight')}
        >
          {theme === Theme.Light ? <MoonIcon /> : <SunIcon />}
        </IconButton>
      </Corner>

      <Card aria-labelledby="login-title">
        <Brand>
          <BagIcon size={30} />
          {t('Brand.name')}
        </Brand>
        <Heading>
          <h1 id="login-title">{t('Login.title')}</h1>
          <p>{t('Login.subtitle')}</p>
        </Heading>

        <Form noValidate onSubmit={formik.handleSubmit}>
          <TextField
            label={t('Login.username')}
            autoComplete="username"
            dir="ltr"
            error={fieldError('username')}
            {...formik.getFieldProps('username')}
          />
          <TextField
            label={t('Login.password')}
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            dir="ltr"
            error={fieldError('password')}
            {...formik.getFieldProps('password')}
            adornment={
              <PasswordToggle
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? t('Login.hidePassword') : t('Login.showPassword')}
                aria-pressed={showPassword}
              >
                {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
              </PasswordToggle>
            }
          />

          {status === RequestStatus.Failed && error && (
            <FormError role="alert">{t(loginErrorKey(error))}</FormError>
          )}

          <Button type="submit" $fullWidth disabled={submitting}>
            {submitting ? t('Login.submitting') : t('Login.submit')}
          </Button>
        </Form>
      </Card>
    </Page>
  );
}
