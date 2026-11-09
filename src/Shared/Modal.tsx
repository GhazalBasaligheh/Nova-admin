import { useEffect, useId, useRef, type ReactNode } from 'react';
import styled from 'styled-components';
import { CloseIcon } from '@/assets/Icons';
import { IconButton } from './Button';

// Native <dialog> with showModal(): focus trapping, Esc to close, inert background and
// focus return are handled by the browser.
const Dialog = styled.dialog`
  width: min(100% - 32px, 560px);
  max-height: calc(100vh - 64px);
  margin: auto;
  padding: 0;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  box-shadow: ${({ theme }) => theme.shadow.card};

  &::backdrop {
    background: rgb(11 21 48 / 55%);
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  border-block-end: 1px solid ${({ theme }) => theme.colors.border};

  h2 {
    font-size: 18px;
  }
`;

const Body = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
`;

interface ModalProps {
  open: boolean;
  title: string;
  closeLabel: string;
  onClose: () => void;
  children: ReactNode;
}

export function Modal({ open, title, closeLabel, onClose, children }: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <Dialog
      ref={ref}
      aria-labelledby={titleId}
      // Esc fires "cancel": route it through onClose so React state stays the source of truth.
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
    >
      {open && (
        <>
          <Header>
            <h2 id={titleId}>{title}</h2>
            <IconButton type="button" onClick={onClose} aria-label={closeLabel}>
              <CloseIcon />
            </IconButton>
          </Header>
          <Body>{children}</Body>
        </>
      )}
    </Dialog>
  );
}
