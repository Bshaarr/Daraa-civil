import * as React from "react";
export const Card = ({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) => <div className={`rounded-xl border border-slate-200 bg-white shadow-sm ${className}`} {...props} />;
export const CardHeader = ({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) => <div className={`p-5 ${className}`} {...props} />;
export const CardContent = ({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) => <div className={`p-5 pt-0 ${className}`} {...props} />;
export const CardTitle = ({ className = "", ...props }: React.HTMLAttributes<HTMLHeadingElement>) => <h3 className={`text-base font-bold ${className}`} {...props} />;
