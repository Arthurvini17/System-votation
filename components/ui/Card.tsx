import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
}

export function Card({ children, className = "", ...props }: CardProps) {
    return (
        <div
            className={`rounded-xl border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-950 ${className}`}
            {...props}
        >
            {children}
        </div>
    );
}

export function CardHeader({ children, className = "", ...props }: CardProps) {
    return (
        <div className={`p-6 pb-2 ${className}`} {...props}>
            {children}
        </div>
    );
}

export function CardContent({ children, className = "", ...props }: CardProps) {
    return (
        <div className={`p-6 pt-0 ${className}`} {...props}>
            {children}
        </div>
    );
}

export function CardFooter({ children, className = "", ...props }: CardProps) {
    return (
        <div className={`p-6 pt-0 flex items-center ${className}`} {...props}>
            {children}
        </div>
    );
}
