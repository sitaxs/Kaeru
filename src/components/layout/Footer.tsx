import Link from "next/link";
function Footer() {
    return ( <footer className="border-t border-gray-200 bg-gray-50 mt-auto">
          <div className="max-w-[90rem] mx-auto px-6 md:px-12 py-8 md:py-12">

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 mb-8 md:mb-12">

              <div>
                <h3 className="text-sm md:text-base font-bold text-m-t mb-4">Про KAERU</h3>
                <ul className="space-y-2 md:space-y-3">
                  <li>
                    <Link
                      href="/about"
                      className="text-gray-d text-xs md:text-sm hover:text-orange transition-colors"
                    >
                      Про нас
                    </Link>
                  </li>
                  <li><a href="#" className="text-gray-d text-xs md:text-sm hover:text-orange transition-colors">Блог</a></li>
                  <li><a href="#" className="text-gray-d text-xs md:text-sm hover:text-orange transition-colors">Кар'єра</a></li>
                </ul>
              </div>

              <div>
                <h3 className="text-sm md:text-base font-bold text-m-t mb-4">Для користувачів</h3>
                <ul className="space-y-2 md:space-y-3">
                  <li><a href="#" className="text-gray-d text-xs md:text-sm hover:text-orange transition-colors">Знайти івент</a></li>
                  <li><a href="#" className="text-gray-d text-xs md:text-sm hover:text-orange transition-colors">Мої закладки</a></li>
                  <li><a href="#" className="text-gray-d text-xs md:text-sm hover:text-orange transition-colors">Розписання</a></li>
                </ul>
              </div>

              <div>
                <h3 className="text-sm md:text-base font-bold text-m-t mb-4">Для організаторів</h3>
                <ul className="space-y-2 md:space-y-3">
                  <li><a href="#" className="text-gray-d text-xs md:text-sm hover:text-orange transition-colors">Створити івент</a></li>
                  <li><a href="#" className="text-gray-d text-xs md:text-sm hover:text-orange transition-colors">Інструменти</a></li>
                  <li><a href="#" className="text-gray-d text-xs md:text-sm hover:text-orange transition-colors">Аналітика</a></li>
                </ul>
              </div>

              <div>
                <h3 className="text-sm md:text-base font-bold text-m-t mb-4">Правова інформація</h3>
                <ul className="space-y-2 md:space-y-3">
                  <li><a href="#" className="text-gray-d text-xs md:text-sm hover:text-orange transition-colors">Конфіденційність</a></li>
                  <li><a href="#" className="text-gray-d text-xs md:text-sm hover:text-orange transition-colors">Умови користування</a></li>
                  <li><a href="#" className="text-gray-d text-xs md:text-sm hover:text-orange transition-colors">Контакти</a></li>
                </ul>
              </div>

            </div>

            <div className="border-t border-gray-l my-6 md:my-8"></div>

            <div className="flex flex-col md:flex-row justify-between items-center gap-4">

              <div>
                <h2 className="text-lg md:text-xl font-bold text-m-t mb-1">🐸 KAERU</h2>
                <p className="text-xs md:text-sm text-gray-d">Платформа для пошуку та організації подій</p>
              </div>

              <div className="flex gap-4 md:gap-6">
                <a href="#" className="w-10 h-10 rounded-full border border-gray-l flex items-center justify-center hover:bg-gray-l hover:border-orange transition-all group" aria-label="Facebook">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--gray-dark)" strokeWidth="2" className="group-hover:stroke-orange transition-colors">
                    <path d="M18 2h-3a6 6 0 0 0-6 6v4h-2v4h2v8h4v-8h3l1-4h-4V8a2 2 0 0 1 2-2h1z"></path>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full border border-gray-l flex items-center justify-center hover:bg-gray-l hover:border-orange transition-all group" aria-label="Instagram">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--gray-dark)" strokeWidth="2" className="group-hover:stroke-orange transition-colors">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <circle cx="17.5" cy="6.5" r="1.5"></circle>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full border border-gray-l flex items-center justify-center hover:bg-gray-l hover:border-orange transition-all group" aria-label="Twitter">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--gray-dark)" strokeWidth="2" className="group-hover:stroke-orange transition-colors">
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2s9 5 20 0a10.66 10.66 0 0 0-10-5.5"></path>
                  </svg>
                </a>
              </div>

              <div className="text-center md:text-right">
                <p className="text-xs md:text-sm text-gray-d">©  KAERU. Всі права захищені.</p>
              </div>

            </div>

          </div>
        </footer> );
}

export default Footer;