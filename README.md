<div align="center">

  [![ar](https://img.shields.io/badge/lang-ar-brightgreen.svg)](README.md)
  [![en](https://img.shields.io/badge/lang-en-red.svg)](README.en.md)

</div>

<h1 dir="rtl">quran-detector-web</h1>

<p dir="rtl">
موقع ثابت (بدون خطوة build) يتيح للمستخدم لصق نص وإرسال طلب مباشرة إلى خدمة
<strong>quran-detector-api</strong> على المسار <code dir="ltr">POST /v1/annotate</code>،
ثم عرض النص بعد وسمه بمراجع الآيات.
</p>

<ul dir="rtl">
  <li>واجهة الـ API (الإنتاج): <a href="https://quran-detector-api.ieasybooks.com/" target="_blank">https://quran-detector-api.ieasybooks.com/</a></li>
  <li>المكتبة: <a href="https://github.com/ieasybooks/quran-detector" target="_blank">https://github.com/ieasybooks/quran-detector</a></li>
</ul>

<h2 dir="rtl">مميزات الموقع</h2>

<ul dir="rtl">
  <li>دعم العربية والإنجليزية مع تبديل RTL/LTR.</li>
  <li>إرسال الطلب إلى الـ API مباشرة من المتصفح عبر <code>fetch</code> (بدون وسيط).</li>
  <li>إعدادات متقدمة لتعديل إعدادات الكشف وعنوان الـ API.</li>
  <li>تصميم متجاوب مع طبقة انتظار (Loading) مريحة أثناء معالجة الطلب.</li>
  <li>خطوط جميلة عبر CDN (Google Fonts).</li>
</ul>

<h2 dir="rtl">الملفات</h2>

<ul dir="rtl">
  <li><code dir="ltr">index.html</code></li>
  <li><code dir="ltr">style.css</code></li>
  <li><code dir="ltr">script.js</code></li>
</ul>

<h2 dir="rtl">كيف يعمل</h2>

<p dir="rtl">يقوم الموقع بإرسال طلب بالشكل التالي:</p>

<pre dir="ltr"><code>{
  "text": "...",
  "settings": {
    "find_errors": true,
    "find_missing": false,
    "allowed_error_pct": 0.25,
    "min_match": 3
  }
}</code></pre>

<p dir="rtl">إلى:</p>

<pre dir="ltr"><code>https://quran-detector-api.ieasybooks.com/v1/annotate</code></pre>

<p dir="rtl">ويتوقع ردًا بالشكل:</p>

<pre dir="ltr"><code>{ "annotated_text": "..." }</code></pre>

<h2 dir="rtl">التشغيل محليًا</h2>

<p dir="rtl">أي خادم ملفات ثابتة (static server) مناسب.</p>

<h3 dir="rtl">الخيار A: Python</h3>

<pre dir="ltr"><code>python -m http.server 5173 --directory quran-detector-web</code></pre>

<p dir="rtl">افتح: <code dir="ltr">http://127.0.0.1:5173</code></p>

<h3 dir="rtl">الخيار B: npx serve</h3>

<pre dir="ltr"><code>npx serve -l 5173 quran-detector-web</code></pre>

<h2 dir="rtl">عنوان الـ API و CORS</h2>

<p dir="rtl">
افتراضيًا الموقع يستخدم <code dir="ltr">https://quran-detector-api.ieasybooks.com/</code> (ويحفظه في <code>localStorage</code>).
يمكنك تغييره من <strong>الإعدادات المتقدمة</strong>.
</p>

<p dir="rtl">
إذا استخدمت عنوان API مختلف، يجب أن يسمح بالوصول من نطاق موقعك عبر CORS (متغير <code dir="ltr">QD_API_CORS_ORIGINS</code> في خدمة الـ API).
</p>
