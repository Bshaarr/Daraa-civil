# نشر المشروع على Vercel

## الإعداد
- Framework: Vite
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

لا تضع `npm run dev` كأمر Build.

## الإصلاحات الأساسية
- تم استبدال `src/pages/Home.tsx` المعطوب بنسخة Home الفعلية.
- تم توحيد المشروع على بنية جذرية واحدة بدل خلط `src/` مع ملفات الجذر.
- تم إصلاح alias `@` ليشير إلى جذر المشروع.
- تم إصلاح `tsconfig.json` ليتابع جميع ملفات TypeScript/TSX الفعلية.
- تم إصلاح `index.html` والأيقونة بوضع الأيقونة داخل `public/`.
- تم حذف الاعتماد على `react-router-dom` من App لأنه غير مستخدم وغير موجود في dependencies.
- تم إضافة fallback مناسب لتطبيق SPA عبر `vercel.json`.

## ملاحظة
واجهة المشروع الحالية تستخدم طبقة `src/lib/trpc` الأصلية الموجودة في النسخة المرفقة كطبقة محلية تجريبية؛ لذلك لا ينبغي اعتبارها Backend حقيقيًا لقاعدة بيانات حتى يتم ربط API/قاعدة البيانات فعليًا.
