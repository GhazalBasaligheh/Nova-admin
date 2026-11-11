import { CloseIcon } from '@/assets/Icons';
import { IconButton } from './Button';
import { Box } from './Notice.styles';

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
