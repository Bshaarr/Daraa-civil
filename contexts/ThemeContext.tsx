import React from "react";
export function ThemeProvider({ children, defaultTheme = "light" }: { children: React.ReactNode; defaultTheme?: string }) { React.useEffect(() => { document.documentElement.dataset.theme = defaultTheme; }, [defaultTheme]); return <>{children}</>; }
