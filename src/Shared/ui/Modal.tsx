import { useEffect, useId, useRef, type ReactNode } from 'react';
import { CloseIcon } from '@/assets/Icons';
import { IconButton } from './Button';
import { Dialog, Header, Body } from './Modal.styles';

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
