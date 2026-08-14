export const MANAGER_USERNAME = "Admin";
export const MANAGER_PASSWORD = "bbsshhaarr6405";

export function calculateLeaveDays(startDate: string, endDate: string) {
  const start = new Date(`${startDate}T00:00:00Z`).getTime();
  const end = new Date(`${endDate}T00:00:00Z`).getTime();
  if (!Number.isFinite(start) || !Number.isFinite(end) || end < start) return 0;
  return Math.floor((end - start) / 86_400_000) + 1;
}

export function isValidManagerLogin(username: string, password: string) {
  return username === MANAGER_USERNAME && password === MANAGER_PASSWORD;
}
