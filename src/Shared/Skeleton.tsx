import styled, { keyframes } from 'styled-components';

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

// Placeholder block; size it with the width/height props or the parent layout.
export const Skeleton = styled.div<{ $height?: string; $width?: string }>`
  width: ${({ $width = '100%' }) => $width};
  height: ${({ $height = '16px' }) => $height};
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ theme }) => theme.colors.surfaceMuted};
  animation: ${pulse} 1.4s ease-in-out infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;
