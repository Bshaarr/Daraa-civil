import * as React from "react";

type DialogContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const DialogContext = React.createContext<DialogContextValue | null>(null);

function useDialogContext() {
  const context = React.useContext(DialogContext);
  if (!context) {
    throw new Error("DialogTrigger/DialogContent must be used inside Dialog.");
  }
  return context;
}

export function Dialog({
  open: controlledOpen,
  onOpenChange,
  children,
}: {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;

  const setOpen = React.useCallback(
    (nextOpen: boolean) => {
      if (!isControlled) setUncontrolledOpen(nextOpen);
      onOpenChange?.(nextOpen);
    },
    [isControlled, onOpenChange],
  );

  return (
    <DialogContext.Provider value={{ open, setOpen }}>
      {children}
    </DialogContext.Provider>
  );
}

export function DialogTrigger({
  asChild,
  children,
}: {
  asChild?: boolean;
  children: React.ReactElement;
}) {
  const { setOpen } = useDialogContext();

  const handleClick = (event: React.MouseEvent) => {
    children.props.onClick?.(event);
    if (!event.defaultPrevented) setOpen(true);
  };

  if (asChild) {
    return React.cloneElement(children, { onClick: handleClick });
  }

  return <button onClick={handleClick}>{children}</button>;
}

export function DialogContent({
  children,
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { open, setOpen } = useDialogContext();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4">
      <div
        role="dialog"
        aria-modal="true"
        className={`relative max-h-[90vh] w-full max-w-lg overflow-auto rounded-xl bg-white p-6 shadow-2xl ${className}`}
        {...props}
      >
        <button
          type="button"
          aria-label="إغلاق"
          className="absolute left-4 top-3 text-xl text-slate-500 hover:text-slate-800"
          onClick={() => setOpen(false)}
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
}

export const DialogHeader = ({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`mb-4 ${className}`} {...props} />
);

export const DialogTitle = ({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h2 className={`text-lg font-bold ${className}`} {...props} />
);
