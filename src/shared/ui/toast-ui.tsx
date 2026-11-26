import { useSyncExternalStore } from 'react';
import {
  getSnapshot,
  removeToast,
  subscribe,
  type ToastItem as ToastItemType,
  type ToastType,
} from '../libs/toast-store';
import { Button } from './button';
import { Icon } from './icon';
import * as styles from './toast-ui.css';

type ToastIconProps = {
  type: ToastType;
};

type ToastItemProps = {
  toast: ToastItemType;
};

export const ToastProvider = () => {
  const toasts = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

  return (
    <div className={styles.viewport}>
      {toasts.reverse().map((toast) => (
        <ToastItem key={toast.id} toast={toast} />
      ))}
    </div>
  );
};

const ToastItem = ({ toast }: ToastItemProps) => {
  const { id, type, message, description } = toast;

  return (
    <div
      role={type === 'error' ? 'alert' : 'status'}
      className={styles.toast}
      data-type={type}
      data-state={toast.visible ? 'open' : 'closing'}
    >
      <ToastIcon type={type} data-type={type} />

      <div className={styles.content}>
        <div className={styles.message}>{message}</div>

        {description && <div className={styles.description}>{description}</div>}
      </div>

      <Button
        variant="icon"
        type="button"
        aria-label="토스트 닫기"
        onClick={() => removeToast(id)}
      >
        <Icon icon="close" />
      </Button>
    </div>
  );
};

const ToastIcon = ({
  type,
  ...props
}: ToastIconProps & React.HTMLAttributes<SVGElement>) => {
  const iconProps = {
    size: 16,
    strokeWidth: 2,
    'aria-hidden': true as const,
  };

  switch (type) {
    case 'info':
      return <Icon icon="toast_info" {...iconProps} {...props} />;

    case 'success':
      return <Icon icon="toast_success" {...iconProps} {...props} />;

    case 'error':
      return <Icon icon="toast_error" {...iconProps} {...props} />;

    case 'warning':
      return <Icon icon="toast_warning" {...iconProps} {...props} />;

    case 'loading':
      return (
        <Icon
          icon="toast_loader"
          {...iconProps}
          {...props}
          className={styles.spinner}
        />
      );

    default:
      return null;
  }
};
