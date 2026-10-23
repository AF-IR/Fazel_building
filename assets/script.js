'use strict';
/* مجموعه تفریحی فاضل — اسکریپت مشترک */

/* منوی موبایل */
const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('.nav');
if (menuBtn && nav) {
  menuBtn.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', open);
  });
}

/* ظاهر شدن نرم بخش‌ها هنگام اسکرول */
const io = 'IntersectionObserver' in window
  ? new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    }), { threshold: .12 })
  : null;
document.querySelectorAll('.rv').forEach(el => io ? io.observe(el) : el.classList.add('in'));

/* سال شمسی در پابرگ */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().toLocaleDateString('fa-IR', { year: 'numeric' });

/* کاوشگر طبقات (فقط صفحه اصلی) */
const FLOORS = {
  roof:   { num: '۴', tag: 'پشت‌بام',   title: 'رستوران فاضل',
            badge: ['live', 'فعال — همین حالا باز است'],
            desc: 'سفره‌ی ایرانی و فست‌فود با هوای آزاد و نمای باز؛ از ناهار تا شام باز است و رزرو میز برای دورهمی‌ها و جشن‌ها پذیرفته می‌شود.',
            link: 'restaurant.html', linkText: 'صفحه‌ی رستوران' },
  first:  { num: '۳', tag: 'طبقه‌ی اول', title: 'واحد تجاری طبقه‌ی اول',
            badge: ['rent', 'آماده‌ی اجاره — شاید شما!'],
            desc: 'فضایی آرام و پرنور در بالاترین طبقه؛ مناسب آموزشگاه، دفتر کار یا استودیو، با تحویل فوری و اجاره‌ی توافقی.',
            link: 'rent.html#tabaqe-avval', linkText: 'شرایط اجاره‌ی این واحد' },
  ground: { num: '۲', tag: 'همکف',      title: 'واحد تجاری همکف',
            badge: ['rent', 'آماده‌ی اجاره — شاید شما!'],
            desc: 'ویترین رو به معبر با بیشترین تردد مجموعه؛ برای ویزیتور، نمایندگی فروش و هر کسب‌وکاری که دیده‌شدن می‌خواهد.',
            link: 'rent.html#hamkaf', linkText: 'شرایط اجاره‌ی این واحد' },
  base:   { num: '۱', tag: 'زیرزمین',   title: 'کافی‌نت فاضل',
            badge: ['live', 'فعال — همین حالا باز است'],
            desc: 'اینترنت پرسرعت، هشت دستگاه گیمینگ و فضای مطالعه؛ خنک‌ترین جای مجموعه در تابستان و دنج‌ترین در زمستان.',
            link: 'coffeenet.html', linkText: 'صفحه‌ی کافی‌نت' }
};

const detail = document.getElementById('floorDetail');
if (detail) {
  const render = key => {
    const f = FLOORS[key];
    if (!f) return;
    detail.innerHTML = `
      <span class="fd-num" aria-hidden="true">${f.num}</span>
      <div class="fd-badges">
        <span class="badge floor">${f.tag}</span>
        <span class="badge ${f.badge[0]}"><i></i>${f.badge[1]}</span>
      </div>
      <h3>${f.title}</h3>
      <p>${f.desc}</p>
      <a class="btn btn-solid" href="${f.link}">${f.linkText}
        <svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>
      </a>`;
  };
  document.querySelectorAll('.floor').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.floor').forEach(x => x.classList.remove('selected'));
      btn.classList.add('selected');
      render(btn.dataset.floor);
    });
  });
}
