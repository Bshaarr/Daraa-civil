type MutationOptions = {
  onSuccess?: (value: unknown) => void | Promise<void>;
};

const MANAGER_USERNAME = "Admin";
const MANAGER_PASSWORD = "bbsshhaarr6405";

const employees = [
  { id: 1, name: "أحمد محمد العبدالله", number: "DR-1024", nationalId: "01010101010" },
  { id: 2, name: "سارة خالد الحسن", number: "DR-1041", nationalId: "02020202020" },
  { id: 3, name: "محمود يوسف النجار", number: "DR-1088", nationalId: "03030303030" },
  { id: 4, name: "ليان عادل الزعبي", number: "DR-1103", nationalId: "04040404040" },
];

let currentUser: { role: "admin" | "employee"; id: number } | null =
  typeof window !== "undefined"
    ? (() => {
        const role = window.localStorage.getItem("hr-role");
        const id = Number(window.localStorage.getItem("hr-user-id"));
        return role === "admin" || role === "employee"
          ? { role, id: Number.isFinite(id) && id > 0 ? id : 1 }
          : null;
      })()
    : null;

const noopMutation = (path: string, options?: MutationOptions) => ({
  mutate: (input?: any) => {
    const value = resolveMutation(path, input);
    void options?.onSuccess?.(value);
  },
  mutateAsync: async (input?: any) => {
    const value = resolveMutation(path, input);
    await options?.onSuccess?.(value);
    return value;
  },
  isPending: false,
});

function resolveMutation(path: string, input?: any) {
  if (path.endsWith("localLogin")) {
    if (input?.mode === "manager") {
      if (
        input?.username !== MANAGER_USERNAME ||
        input?.password !== MANAGER_PASSWORD
      ) {
        throw new Error("اسم المستخدم أو كلمة المرور غير صحيحة.");
      }
      currentUser = { role: "admin", id: 1 };
      if (typeof window !== "undefined") {
        window.localStorage.setItem("hr-role", "manager");
        window.localStorage.setItem("hr-user-id", "1");
      }
      return currentUser;
    }

    const employee = employees.find(
      (item) =>
        item.name === input?.fullName &&
        item.number === input?.employeeNumber &&
        item.nationalId === input?.nationalId,
    );

    if (!employee) {
      throw new Error("بيانات الموظف غير صحيحة.");
    }

    currentUser = { role: "employee", id: employee.id };
    if (typeof window !== "undefined") {
      window.localStorage.setItem("hr-role", "employee");
      window.localStorage.setItem("hr-user-id", String(employee.id));
    }
    return currentUser;
  }

  if (path.endsWith("logout")) {
    currentUser = null;
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("hr-role");
      window.localStorage.removeItem("hr-user-id");
    }
    return { success: true };
  }

  if (path.endsWith("me")) {
    return currentUser ? { id: currentUser.id } : undefined;
  }

  return { insertId: Date.now(), ...input };
}

const useQuery = (path: string) => {
  if (path.endsWith("notifications")) {
    return { data: [] as any[], isLoading: false, error: null };
  }

  if (path.endsWith("unreadNotifications")) {
    return { data: 0, isLoading: false, error: null };
  }

  if (path.endsWith("knowledge")) {
    return { data: undefined as any, isLoading: false, error: null };
  }

  if (path.endsWith("me")) {
    return { data: currentUser ? { id: currentUser.id } : undefined, isLoading: false, error: null };
  }

  return { data: undefined as any, isLoading: false, error: null };
};

function makeProxy(path = ""): any {
  return new Proxy(
    {},
    {
      get: (_target, property: string) => {
        const next = path ? `${path}.${property}` : property;

        if (property === "useQuery") return useQuery(path);
        if (property === "useMutation") {
          return (options?: MutationOptions) => noopMutation(path, options);
        }
        if (property === "invalidate") return async () => undefined;

        return makeProxy(next);
      },
    },
  );
}

export const trpc: any = Object.assign(makeProxy(), {
  useUtils: () => makeProxy("utils"),
});
