import { describe, expect, it } from "vitest";
import { calculateLeaveDays, isValidManagerLogin, MANAGER_USERNAME } from "../shared/hr";

describe("قواعد نظام الموارد البشرية", () => {
  it("يتحقق من بيانات المدير الثابتة فقط", () => {
    expect(isValidManagerLogin(MANAGER_USERNAME, "bbsshhaarr6405")).toBe(true);
    expect(isValidManagerLogin("admin", "bbsshhaarr6405")).toBe(false);
    expect(isValidManagerLogin(MANAGER_USERNAME, "كلمة خاطئة")).toBe(false);
  });

  it("يحسب مدة الإجازة بشكل شامل ليومي البداية والنهاية", () => {
    expect(calculateLeaveDays("2026-08-18", "2026-08-20")).toBe(3);
    expect(calculateLeaveDays("2026-08-18", "2026-08-18")).toBe(1);
    expect(calculateLeaveDays("2026-08-20", "2026-08-18")).toBe(0);
  });
});
