import styled from 'styled-components';
import { CloseIcon } from '@/assets/Icons';
import { IconButton } from './Button';

const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-block-end: ${({ theme }) => theme.spacing.md};
  padding-inline: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xs};
  border: 1px solid ${({ theme }) => theme.colors.success};
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.success};
  font-weight: 600;
`;

interface NoticeProps {
  message: string | null;
  dismissLabel: string;
  onDismiss: () => void;
}

// Success message region. Always rendered so screen readers announce changes.
export function Notice({ message, dismissLabel, onDismiss }: NoticeProps) {
  return (
    <div role="status" aria-live="polite">
      {message && (
        <Box>
          <span>{message}</span>
          <IconButton type="button" onClick={onDismiss} aria-label={dismissLabel}>
            <CloseIcon size={16} />
          </IconButton>
        </Box>
      )}
    </div>
  );
}
