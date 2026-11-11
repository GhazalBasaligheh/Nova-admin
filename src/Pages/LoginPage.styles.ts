import styled from 'styled-components';
import { IconButton } from '@/Shared/ui/Button';

export const Page = styled.main`
  display: grid;
  place-items: center;
  min-height: 100vh;
  padding: ${({ theme }) => theme.spacing.lg};
`;

export const Corner = styled.div`
  position: fixed;
  top: ${({ theme }) => theme.spacing.md};
  inset-inline-end: ${({ theme }) => theme.spacing.md};
  display: flex;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const Card = styled.section`
  display: grid;
  gap: ${({ theme }) => theme.spacing.lg};
  width: min(100%, 420px);
  padding: ${({ theme }) => theme.spacing.xl};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadow.card};
`;

export const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  font-size: 22px;
  font-weight: 800;

  svg {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

export const Heading = styled.div`
  h1 {
    font-size: 22px;
  }

  p {
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const Form = styled.form`
  display: grid;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const FormError = styled.p`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ theme }) => theme.colors.surfaceMuted};
  color: ${({ theme }) => theme.colors.danger};
  font-size: 14px;
`;

export const PasswordToggle = styled(IconButton)`
  width: 40px;
  height: 40px;
  color: ${({ theme }) => theme.colors.textMuted};
`;
