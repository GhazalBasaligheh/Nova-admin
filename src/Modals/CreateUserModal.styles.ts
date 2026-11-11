import styled from 'styled-components';

export const Form = styled.form`
  display: grid;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const FormError = styled.p`
  color: ${({ theme }) => theme.colors.danger};
  font-size: 14px;
`;

export const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.sm};
`;
