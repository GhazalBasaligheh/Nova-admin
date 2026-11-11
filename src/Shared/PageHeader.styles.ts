import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md};
  margin-block-end: ${({ theme }) => theme.spacing.lg};

  h1 {
    font-size: 26px;
  }
`;
