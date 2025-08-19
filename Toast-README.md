# 🍞 Advanced Toast Notification System

یک سیستم پیشرفته و کامل برای نمایش اعلان‌های Toast با امکانات بسیار زیاد و انیمیشن‌های جذاب.

## ✨ ویژگی‌های کلیدی

### 🎨 **انواع Toast**
- ✅ **Success** - برای عملیات موفق
- ❌ **Error** - برای خطاها و مشکلات
- ⚠️ **Warning** - برای هشدارها
- ℹ️ **Info** - برای اطلاعات عمومی
- 🔄 **Loading** - برای نمایش بارگذاری

### 📍 **موقعیت‌های مختلف**
- `top-left` - بالا چپ
- `top-right` - بالا راست (پیش‌فرض)
- `bottom-left` - پایین چپ
- `bottom-right` - پایین راست
- `center` - وسط صفحه

### 🎭 **انیمیشن‌های متنوع**
- `slide` - کشیده شدن از کنار
- `fade` - محو و ظاهر شدن
- `bounce` - پرش و جهش
- `zoom` - بزرگ و کوچک شدن
- `flip` - چرخش سه بعدی

### 🎨 **تم‌های مختلف**
- `modern` - مدرن با blur effect
- `classic` - کلاسیک با border
- `minimal` - مینیمال و ساده
- `glassmorphism` - شیشه‌ای و شفاف

### 📏 **اندازه‌های مختلف**
- `small` - کوچک (40px ارتفاع)
- `medium` - متوسط (50px ارتفاع) - پیش‌فرض
- `large` - بزرگ (60px ارتفاع)

## 🚀 راه‌اندازی سریع

### نصب و اتصال
```html
<!-- اضافه کردن فایل به HTML -->
<script src="advanced-toast.js"></script>
```

### استفاده ساده
```javascript
// نمایش Toast ساده
AdvancedToast.success('عملیات با موفقیت انجام شد!');

// نمایش Toast با تنظیمات سفارشی
AdvancedToast.show('پیام شما', {
    type: 'info',
    position: 'top-left',
    duration: 5000,
    animation: 'bounce'
});
```

## 📖 مستندات کامل

### 🎯 متدهای اصلی

#### نمایش Toast
```javascript
// متد کلی
const toastId = AdvancedToast.show(message, options);

// متدهای اختصاری
AdvancedToast.success('موفق!');
AdvancedToast.error('خطا!');
AdvancedToast.warning('هشدار!');
AdvancedToast.info('اطلاعات');
AdvancedToast.loading('در حال بارگذاری...');
```

#### مدیریت Toast ها
```javascript
// بستن Toast خاص
AdvancedToast.close(toastId);

// بستن همه Toast ها
AdvancedToast.closeAll();

// متوقف کردن Toast
AdvancedToast.pause(toastId);
AdvancedToast.pauseAll();

// ادامه دادن Toast
AdvancedToast.resume(toastId);
AdvancedToast.resumeAll();

// به‌روزرسانی Toast
AdvancedToast.update(toastId, 'پیام جدید', {
    description: 'توضیحات جدید'
});
```

#### اطلاعات و وضعیت
```javascript
// تعداد Toast های فعال
const count = AdvancedToast.getCount();

// بررسی وجود Toast
const exists = AdvancedToast.exists(toastId);
```

### ⚙️ تنظیمات کامل

```javascript
const options = {
    // موقعیت نمایش
    position: 'top-right', // top-left, top-right, bottom-left, bottom-right, center
    
    // مدت زمان نمایش (میلی‌ثانیه)
    duration: 4000,
    
    // نوع انیمیشن
    animation: 'slide', // slide, fade, bounce, zoom, flip
    
    // نوع Toast
    type: 'info', // success, error, warning, info, loading
    
    // نمایش نوار پیشرفت
    showProgressBar: true,
    
    // قابلیت بستن دستی
    closable: true,
    
    // نمایش آیکون
    showIcon: true,
    
    // پخش صدا
    playSound: false,
    
    // حداکثر تعداد Toast همزمان
    maxToasts: 5,
    
    // فاصله بین Toast ها
    spacing: 10,
    
    // تم ظاهری
    theme: 'modern', // modern, classic, minimal, glassmorphism
    
    // اندازه
    size: 'medium', // small, medium, large
    
    // پشتیبانی RTL
    rtl: true,
    
    // بسته شدن خودکار
    autoClose: true,
    
    // توقف هنگام hover
    pauseOnHover: true,
    
    // بسته شدن با کلیک
    clickToClose: false,
    
    // توضیحات اضافی
    description: 'متن توضیحات',
    
    // دکمه‌های اکشن
    actions: [
        {
            label: 'تایید',
            handler: 'handleConfirm()'
        },
        {
            label: 'لغو',
            handler: 'handleCancel()'
        }
    ]
};
```

### 🎨 تنظیمات سراسری

```javascript
// تغییر تنظیمات پیش‌فرض
AdvancedToast.configure({
    position: 'bottom-right',
    theme: 'glassmorphism',
    duration: 6000,
    rtl: true
});
```

## 💡 نمونه‌های کاربرد

### 1️⃣ Toast ساده
```javascript
AdvancedToast.success('عملیات انجام شد!');
```

### 2️⃣ Toast با توضیحات
```javascript
AdvancedToast.info('اطلاعات کاربر', {
    description: 'اطلاعات شما با موفقیت به‌روزرسانی شد.',
    duration: 5000
});
```

### 3️⃣ Toast با دکمه‌های اکشن
```javascript
const toastId = AdvancedToast.warning('آیا مطمئن هستید؟', {
    description: 'این عمل قابل برگشت نیست.',
    autoClose: false,
    actions: [
        {
            label: 'تایید',
            handler: 'confirmDelete()'
        },
        {
            label: 'لغو',
            handler: `AdvancedToast.close('${toastId}')`
        }
    ]
});
```

### 4️⃣ Toast بارگذاری
```javascript
const loadingId = AdvancedToast.loading('در حال آپلود...', {
    autoClose: false,
    showProgressBar: true
});

// پس از اتمام بارگذاری
setTimeout(() => {
    AdvancedToast.update(loadingId, 'آپلود کامل شد!', {
        type: 'success'
    });
    
    setTimeout(() => {
        AdvancedToast.close(loadingId);
    }, 2000);
}, 3000);
```

### 5️⃣ Toast سفارشی
```javascript
AdvancedToast.show('پیام سفارشی', {
    type: 'info',
    position: 'center',
    animation: 'bounce',
    theme: 'glassmorphism',
    size: 'large',
    duration: 8000,
    showIcon: true,
    showProgressBar: true,
    pauseOnHover: true,
    clickToClose: true,
    playSound: true
});
```

## 🎵 پشتیبانی صدا

برای فعال کردن صداها، فایل‌های صوتی زیر را در پوشه `/sounds/` قرار دهید:

- `success.mp3` - صدای موفقیت
- `error.mp3` - صدای خطا  
- `warning.mp3` - صدای هشدار
- `info.mp3` - صدای اطلاعات

```javascript
// فعال کردن صدا
AdvancedToast.success('موفق!', {
    playSound: true
});
```

## 📱 پشتیبانی موبایل

سیستم Toast کاملاً ریسپانسیو است و بر روی دستگاه‌های موبایل به خوبی کار می‌کند:

- **Swipe Up** برای بستن Toast
- **تنظیمات خودکار عرض** در موبایل
- **Touch-friendly** اندازه دکمه‌ها

## 🔧 پیشرفته

### دسترسی به Instance
```javascript
const toastInstance = AdvancedToast.getInstance();

// تغییر تنظیمات مستقیم
toastInstance.config.duration = 10000;
```

### Event Listeners سفارشی
```javascript
// تشخیص بستن Toast
document.addEventListener('toastClosed', (event) => {
    console.log('Toast بسته شد:', event.detail.toastId);
});
```

### کنترل از طریق کیبرد
- **ESC** - بستن همه Toast ها
- **Space** - توقف/ادامه Toast فعال

## 🎨 سفارشی‌سازی CSS

```css
/* تغییر فونت */
.toast-container * {
    font-family: 'IranSans', sans-serif !important;
}

/* تغییر رنگ‌ها */
.toast-success {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
}

/* انیمیشن سفارشی */
@keyframes customSlide {
    from {
        transform: translateX(200px) rotate(45deg);
        opacity: 0;
    }
    to {
        transform: translateX(0) rotate(0deg);
        opacity: 1;
    }
}
```

## 🐛 عیب‌یابی

### مشکلات رایج

#### Toast نمایش داده نمی‌شود
```javascript
// بررسی console برای خطاها
console.log(AdvancedToast.getCount());

// تست با تنظیمات ساده
AdvancedToast.show('تست', { type: 'info' });
```

#### صدا پخش نمی‌شود
- مطمئن شوید فایل‌های صوتی در مسیر `/sounds/` قرار دارند
- در مرورگر، صدا باید توسط کاربر فعال شود (کلیک اول)

#### انیمیشن کار نمی‌کند
- مطمئن شوید Tailwind CSS لود شده است
- CSS های سفارشی را بررسی کنید

## 📄 لایسنس

این پروژه تحت لایسنس MIT منتشر شده است.

## 🤝 مشارکت

برای مشارکت در این پروژه:

1. Fork کنید
2. شاخه جدید بسازید (`git checkout -b feature/amazing-feature`)
3. تغییرات را commit کنید (`git commit -m 'Add amazing feature'`)
4. به شاخه push کنید (`git push origin feature/amazing-feature`)
5. Pull Request باز کنید

## 📞 پشتیبانی

اگر سوالی دارید یا به کمک نیاز دارید:

- 📧 Email: support@example.com
- 💬 Issues: GitHub Issues
- 📖 Wiki: GitHub Wiki

---

**ساخته شده با ❤️ برای جامعه توسعه‌دهندگان ایرانی**

نسخه: 2.0.0 | آخرین به‌روزرسانی: ۱۹ اوت ۲۰۲۵
