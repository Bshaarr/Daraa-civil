import * as React from "react";
export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(({ className = "", ...props }, ref) => <textarea ref={ref} className={`w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-slate-400 ${className}`} {...props} />);
Textarea.displayName = "Textarea";
