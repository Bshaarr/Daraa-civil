import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { adminProcedure, protectedProcedure, publicProcedure, router } from "./_core/trpc";
import { invokeLLM } from "./_core/llm";
import { createAnnouncement, createEmployee, createKnowledge, createLeave, createNotification, decideLeave, deleteEmployee, findEmployeeForLogin, listAnnouncements, listAttendance, listEmployees, listKnowledge, listLeaves, listNotifications, markNotificationRead, countUnreadNotifications, updateEmployee } from "./db";
import { sdk } from "./_core/sdk";
import { isValidManagerLogin } from "../shared/hr";
import { TRPCError } from "@trpc/server";
import { storagePut } from "./storage";
import { employees, leaveRequests } from "../drizzle/schema";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    localLogin: publicProcedure.input(z.object({mode:z.enum(["manager","employee"]),username:z.string().optional(),password:z.string().optional(),fullName:z.string().optional(),employeeNumber:z.string().optional(),nationalId:z.string().optional()})).mutation(async ({input,ctx}) => { let openId=""; let name=""; if(input.mode==="manager"){if(!isValidManagerLogin(input.username||"",input.password||"")) throw new TRPCError({code:"UNAUTHORIZED",message:"بيانات المدير غير صحيحة"}); openId="local_admin"; name="المدير العام";} else {const employee=await findEmployeeForLogin(input.fullName||"",input.employeeNumber||"",input.nationalId||""); if(!employee) throw new TRPCError({code:"UNAUTHORIZED",message:"بيانات الموظف غير مطابقة للسجل"}); openId=`local_employee_${employee.id}`; name=employee.fullName;} const token=await sdk.signSession({openId,appId:"internal",name}); const options=getSessionCookieOptions(ctx.req); ctx.res.cookie(COOKIE_NAME,token,options); return {success:true,role:input.mode==="manager"?"admin":"user",name}; }),
    logout: publicProcedure.mutation(({ ctx }) => { const cookieOptions=getSessionCookieOptions(ctx.req); ctx.res.clearCookie(COOKIE_NAME,{...cookieOptions,maxAge:-1}); return {success:true} as const; }),
  }),
  hr: router({
    employees: protectedProcedure.query(() => listEmployees()),
    addEmployee: adminProcedure.input(z.object({fullName:z.string().min(2),employeeNumber:z.string().min(2),nationalId:z.string().min(5),department:z.string().min(2),jobTitle:z.string().min(2),phone:z.string().optional()})).mutation(({input}) => createEmployee(input)),
    updateEmployee: adminProcedure.input(z.object({id:z.number(),data:z.object({fullName:z.string().optional(),department:z.string().optional(),jobTitle:z.string().optional(),phone:z.string().optional(),status:z.enum(["active","inactive"]).optional()})})).mutation(({input}) => updateEmployee(input.id,input.data)),
    deleteEmployee: adminProcedure.input(z.object({id:z.number()})).mutation(({input}) => deleteEmployee(input.id)),
    leaves: protectedProcedure.query(() => listLeaves()),
    submitLeave: protectedProcedure.input(z.object({employeeId:z.number(),leaveType:z.string(),startDate:z.string(),endDate:z.string(),days:z.number().int().positive(),reason:z.string().optional()})).mutation(({input}) => createLeave({...input,startDate:new Date(input.startDate),endDate:new Date(input.endDate),status:"pending"})),
    decideLeave: adminProcedure.input(z.object({id:z.number(),status:z.enum(["approved","rejected"]),managerNote:z.string().optional(),employeeId:z.number().optional()})).mutation(async ({input}) => { const result=await decideLeave(input.id,input.status,input.managerNote); if(input.employeeId){await createNotification({employeeId:input.employeeId,title:input.status==="approved"?"تمت الموافقة على طلب الإجازة":"تم رفض طلب الإجازة",body:input.managerNote||"تم تحديث حالة طلب الإجازة من قبل المدير",isRead:0});} return result; }),
    attendance: protectedProcedure.query(() => listAttendance()),
    announcements: protectedProcedure.query(() => listAnnouncements()),
    publishAnnouncement: adminProcedure.input(z.object({title:z.string().min(2),body:z.string().min(2),priority:z.enum(["normal","important"]).default("normal")})).mutation(async ({input,ctx}) => { const result=await createAnnouncement({...input,publishedBy:ctx.user.id}); const activeEmployees=(await listEmployees()).filter(employee=>employee.status==="active"); await Promise.all(activeEmployees.map(employee=>createNotification({employeeId:employee.id,title:input.title,body:input.body,isRead:0}))); return result; }),
    notifications: protectedProcedure.query(({ctx}) => listNotifications(ctx.user.id)),
    unreadNotifications: protectedProcedure.query(({ctx}) => countUnreadNotifications(ctx.user.id)),
    markNotificationRead: protectedProcedure.input(z.object({id:z.number()})).mutation(({input,ctx}) => markNotificationRead(input.id,ctx.user.id)),
    knowledge: protectedProcedure.query(() => listKnowledge()),
    addKnowledge: adminProcedure.input(z.object({title:z.string().min(2),content:z.string().min(2),fileKey:z.string().optional(),fileUrl:z.string().optional()})).mutation(({input,ctx}) => createKnowledge({...input,createdBy:ctx.user.id})),
    uploadKnowledge: adminProcedure.input(z.object({title:z.string().min(2),fileName:z.string().min(1),mimeType:z.string().min(1),dataBase64:z.string().min(10)})).mutation(async ({input,ctx}) => { const bytes=Buffer.from(input.dataBase64,"base64"); const stored=await storagePut(`knowledge/${Date.now()}-${input.fileName}`,bytes,input.mimeType); return createKnowledge({title:input.title,content:`ملف معتمد: ${input.fileName}`,fileKey:stored.key,fileUrl:stored.url,createdBy:ctx.user.id}); }),
    askKnowledge: protectedProcedure.input(z.object({question:z.string().min(2),context:z.string().optional()})).mutation(async ({input}) => { const entries=await listKnowledge(); const context=(entries as any[]).map(item=>`العنوان: ${item.title}\nالمحتوى: ${item.content}`).join("\n\n"); const response=await invokeLLM({messages:[{role:"system",content:"أنت مساعد موارد بشرية حكومي. أجب بالعربية حصراً وباختصار، واعتمد فقط على قاعدة المعرفة المقدمة. إذا لم تجد الإجابة، صرّح بذلك ولا تخترع معلومة."},{role:"user",content:`قاعدة المعرفة:\n${context||input.context||"لا يوجد محتوى بعد"}\n\nسؤال الموظف: ${input.question}`} ]}); return response.choices?.[0]?.message?.content || "لم أتمكن من إعداد إجابة حالياً."; }),
  }),
});
export type AppRouter = typeof appRouter;
