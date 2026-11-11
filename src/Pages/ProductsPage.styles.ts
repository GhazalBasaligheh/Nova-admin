import styled from 'styled-components';

export const Toolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md};
  margin-block-end: ${({ theme }) => theme.spacing.md};
`;

export const Count = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 14px;
`;

export const SkeletonList = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.sm};
`;
