import { AlertDialog } from '@base-ui/react/alert-dialog';
import React from 'react';
import { Button } from '~/shared/ui';
import * as styles from './confirm.css';

type ConfirmProps = {
  trigger: React.ReactElement;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  confirmVariant?: 'primary' | 'secondary' | 'warning';
  onConfirm: () => void | Promise<void>;
};

export const Confirm = ({
  trigger,
  title,
  description,
  confirmText = '확인',
  cancelText = '취소',
  confirmVariant = 'primary',
  onConfirm,
}: ConfirmProps) => {
  const [open, setOpen] = React.useState(false);
  const [isPending, setIsPending] = React.useState(false);

  const handleConfirm = async () => {
    if (isPending) return;

    setIsPending(true);

    try {
      await onConfirm();
      setOpen(false);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <AlertDialog.Root open={open} onOpenChange={setOpen}>
      <AlertDialog.Trigger render={trigger} />
      <AlertDialog.Backdrop className={styles.backdrop} />
      <AlertDialog.Portal>
        <AlertDialog.Viewport className={styles.viewport}>
          <AlertDialog.Popup>
            <div className={styles.popup}>
              <div className={styles.content}>
                <AlertDialog.Title className={styles.title}>
                  {title}
                </AlertDialog.Title>
                <AlertDialog.Description className={styles.description}>
                  {description}
                </AlertDialog.Description>
              </div>
              <div className={styles.actions}>
                <AlertDialog.Close
                  render={
                    <Button variant="secondary" disabled={isPending}>
                      {cancelText}
                    </Button>
                  }
                />
                <Button
                  variant={confirmVariant}
                  disabled={isPending}
                  onClick={handleConfirm}
                >
                  {isPending ? '처리 중...' : confirmText}
                </Button>
              </div>
            </div>
          </AlertDialog.Popup>
        </AlertDialog.Viewport>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};
