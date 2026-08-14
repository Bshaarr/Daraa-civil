# Cevil-page

هذا المستودع هو واجهة وتطبيق إدارة لمركز الشؤون المدنية. هذا الملف يشرح كيفية تشغيل المشروع محلياً وكيفية النشر على Vercel.

## تعليمات تشغيل محلي
1. انسخ المستودع:
   git clone https://github.com/Bshaarr/Cevil-page.git
   git checkout prep/vercel-deploy
2. ثبّت الاعتماديات:
   npm ci
3. شغّل التطبيق في بيئة التطوير:
   npm run dev

## إعداد متغيرات البيئة (Environment Variables)
قبل البناء أو النشر على Vercel تحتاج لإعداد المتغيرات التالية في صفحة المشروع على Vercel (Settings > Environment Variables):

- DATABASE_URL (مثال: mysql://user:pass@host:3306/dbname)
- SESSION_SECRET أو COOKIE_SECRET (سري للجلسات)
- VITE_ANALYTICS_WEBSITE_ID (اختياري)
- VITE_ANALYTICS_ENDPOINT (اختياري)
- S3_BUCKET, S3_ENDPOINT, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY (إن كنت تستخدم تخزين خارجي)

## نشر على Vercel
1. سجل دخولك إلى https://vercel.com وقم بربط حساب GitHub.
2. اختر المستودع `Bshaarr/Cevil-page` وابدأ عملية الاستيراد.
3. اضبط إعدادات البناء:
   - Install Command: `npm ci`
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. أضف متغيرات البيئة أعلاه إلى إعدادات المشروع على Vercel.
5. نشر تلقائي سيبدأ بعد الربط. بعد اكتمال النشر سيظهر رابط المشروع في لوحة Vercel.

## تهيئة قاعدة البيانات
في المجلد يوجد ملف SQL: `0001_windy_nightmare.sql` يمكنك تشغيله على قاعدة MySQL:

```bash
mysql -u user -p dbname < 0001_windy_nightmare.sql
```

أو استخدم أدوات الهجرة إن كنت تفضل (drizzle-kit).

## ملاحظات
- أبقيت ملف `app-debug.apk` كما طلبت، لكنه مشمول في `.gitignore` لمنع إضافات مستقبلية عن طريق الخطأ.
- تأكد من عدم رفع أي أسرار مباشرة ضمن الشيفرة.

