import styled from 'styled-components';

export const Page = styled.main`
  display: grid;
  place-items: center;
  min-height: 100vh;
  padding: ${({ theme }) => theme.spacing.lg};
`;
