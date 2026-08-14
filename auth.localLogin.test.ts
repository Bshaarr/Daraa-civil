import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

function context(): TrpcContext {
  return {
    user: null,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: {
      cookie: () => undefined,
      clearCookie: () => undefined,
    } as TrpcContext["res"],
  };
}

describe("auth.localLogin", () => {
  it("يسمح ببيانات المدير الصحيحة فقط", async () => {
    const caller = appRouter.createCaller(context());
    const result = await caller.auth.localLogin({ mode: "manager", username: "Admin", password: "bbsshhaarr6405" });
    expect(result).toMatchObject({ success: true, role: "admin" });
    await expect(caller.auth.localLogin({ mode: "manager", username: "Admin", password: "wrong" })).rejects.toMatchObject({ code: "UNAUTHORIZED" });
  });

  it("يرفض موظفاً غير موجود في السجل", async () => {
    const caller = appRouter.createCaller(context());
    await expect(caller.auth.localLogin({ mode: "employee", fullName: "موظف غير مسجل", employeeNumber: "UNKNOWN", nationalId: "UNKNOWN" })).rejects.toMatchObject({ code: "UNAUTHORIZED" });
  }, 15000);
});
