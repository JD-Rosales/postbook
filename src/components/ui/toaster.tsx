import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from '@components/ui/toast';
import { useToast } from '@components/ui/use-toast';
import { CheckCircle, AlertOctagon } from 'lucide-react';

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({
        id,
        title,
        description,
        action,
        variant,
        ...props
      }) {
        return (
          <Toast key={id} {...props}>
            <div className='grid gap-1'>
              <div className='grid grid-cols-8 items-center'>
                <div className='col-span-2 pl-2 text-2xl'>
                  {variant === 'success' && (
                    <CheckCircle className='text-green-500' />
                  )}
                  {variant === 'destructive' && (
                    <AlertOctagon className='text-destructive' />
                  )}
                </div>
                <div className='col-span-6'>
                  {title && (
                    <ToastTitle
                      className={
                        variant === 'success'
                          ? 'text-green-500'
                          : variant === 'destructive'
                          ? 'text-destructive'
                          : ''
                      }
                    >
                      {title}
                    </ToastTitle>
                  )}
                  {description && (
                    <ToastDescription>{description}</ToastDescription>
                  )}
                </div>
              </div>
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
