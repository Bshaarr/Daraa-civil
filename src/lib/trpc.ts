type MutationOptions = { onSuccess?: (value: unknown) => void | Promise<void> };
const noopMutation = (path: string, options?: MutationOptions) => ({
  mutate: (input?: any) => { const value = resolveMutation(path, input); void options?.onSuccess?.(value); },
  mutateAsync: async (input?: any) => { const value = resolveMutation(path, input); await options?.onSuccess?.(value); return value; },
  isPending: false,
});
function resolveMutation(path: string, input?: any) {
  if (path.endsWith("localLogin")) return { role: input?.mode === "manager" ? "admin" : "employee", id: 1 };
  if (path.endsWith("me")) return { id: 1 };
  return { insertId: Date.now(), ...input };
}
const useQuery = (path: string) => {
  if (path.endsWith("notifications")) return { data: [] as any[], isLoading: false, error: null };
  if (path.endsWith("unreadNotifications")) return { data: 0, isLoading: false, error: null };
  if (path.endsWith("knowledge")) return { data: undefined as any, isLoading: false, error: null };
  if (path.endsWith("me")) return { data: undefined as any, isLoading: false, error: null };
  return { data: undefined as any, isLoading: false, error: null };
};
function makeProxy(path = ""): any {
  return new Proxy({}, { get: (_target, property: string) => {
    const next = path ? `${path}.${property}` : property;
    if (property === "useQuery") return useQuery(path);
    if (property === "useMutation") return (options?: MutationOptions) => noopMutation(path, options);
    if (property === "invalidate") return async () => undefined;
    return makeProxy(next);
  }});
}
export const trpc: any = Object.assign(makeProxy(), { useUtils: () => makeProxy("utils") });
