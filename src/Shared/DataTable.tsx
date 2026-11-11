import styled from 'styled-components';

export const TableWrapper = styled.div`
  overflow-x: auto;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  background: ${({ theme }) => theme.colors.surface};
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;

  th,
  td {
    padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
    border-block-end: 1px solid ${({ theme }) => theme.colors.border};
    text-align: start;
    vertical-align: middle;
  }

  th {
    background: ${({ theme }) => theme.colors.surfaceMuted};
    color: ${({ theme }) => theme.colors.textMuted};
    font-weight: 600;
    white-space: nowrap;
  }

  tbody tr:last-child td {
    border-block-end: 0;
  }

  tbody tr:hover {
    background: ${({ theme }) => theme.colors.surfaceMuted};
  }
`;

export const Thumb = styled.img`
  display: block;
  width: 48px;
  height: 48px;
  padding: 4px;
  border-radius: ${({ theme }) => theme.radius.sm};
  background: #fff;
  object-fit: contain;
`;

export const VisuallyHidden = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
`;
