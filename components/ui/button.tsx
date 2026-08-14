import * as React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { variant?: string; size?: string; }
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className = "", ...props }, ref) => (
  <button ref={ref} className={`inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 ${className}`} {...props} />
));
Button.displayName = "Button";
