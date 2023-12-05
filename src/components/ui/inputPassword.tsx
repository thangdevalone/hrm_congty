import * as React from 'react';

import { cn } from '@/lib/utils';
import { Icons } from '../icons';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const InputPassword = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, ...props }, ref) => {
        const [show, setShow] = React.useState(false);
        return (
            <div className="relative">
                <input
                    type={show ? 'password' : 'text'}
                    className={cn(
                        'flex h-10 w-full rounded-md border dark:border-white border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground -visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
                        className
                    )}
                    autoComplete="current-password"
                    ref={ref}
                    {...props}
                />
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        setShow(!show);
                    }}
                    className="action-input cursor-pointer absolute top-[50%] -translate-y-1/2 right-[10px] z-1"
                >
                    {show ? (
                        <Icons.eye_show className="w-[20px]" />
                    ) : (
                        <Icons.eye_hide className="w-[20px]" />
                    )}
                </button>
            </div>
        );
    }
);
InputPassword.displayName = 'InputPassword';

export { InputPassword };
