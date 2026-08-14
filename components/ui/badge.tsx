import React from "react";

export function Badge({ variant = "default", className = "", ...props }: React.HTMLAttributes<HTMLSpanElement> & { variant?: string }) { return <span className={`inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700 ${className}`} {...props} />; }
