export function LandingFooter() {
  return (
    <footer className="bg-brand-dark py-12 text-white">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <span className="font-heading text-2xl font-bold tracking-tight">فلاحك</span>
            <p className="mt-3 text-sm leading-relaxed text-white/60">
              منصة الجزائر الأولى لتجارة الدواجن. نجمع بين الفلاحين والموزعين والجزارين
              في سوق رقمي مباشر عبر 48 ولاية.
            </p>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-bold tracking-wider uppercase text-white/50">روابط سريعة</h4>
            <ul className="space-y-2 text-sm text-white/60">
              {["الرئيسية", "خدماتنا", "للفلاحين", "للموزعين", "للجزارين"].map((link) => (
                <li key={link}>
                  <a href="#" className="transition-colors hover:text-white">{link}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-bold tracking-wider uppercase text-white/50">الدعم</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li><a href="#" className="transition-colors hover:text-white">الشروط والأحكام</a></li>
              <li><a href="#" className="transition-colors hover:text-white">سياسة الخصوصية</a></li>
              <li><a href="#" className="transition-colors hover:text-white">اتصل بنا</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-white/10 pt-8 text-center text-sm text-white/50">
          &copy; {new Date().getFullYear()} فلاحك. جميع الحقوق محفوظة.
        </div>
      </div>
    </footer>
  )
}
