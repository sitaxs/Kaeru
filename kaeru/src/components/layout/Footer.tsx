import Link from "next/link";
import HeadLogo from "../ui/HeadLogo";
function Footer() {
  return (<footer className="border-t border-gray-200 bg-gray-50 mt-auto text-sm text-gray-d hover:text-orange transition-colors">
    <div className="max-w-[90rem] mx-auto px-6 md:px-12 py-8 pb-20 md:py-10 ">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 gap-x-12 mb-8 md:mb-10">
        <div>
          <h3 className="text-sm md:text-base font-bold text-m-t mb-4">Про KAERU</h3>
          <ul className="space-y-2 md:space-y-3">
            <li>
              <Link
                href="/about" >
                Про нас
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm md:text-base font-bold text-m-t mb-4">Для користувачів</h3>
          <ul className="space-y-2 md:space-y-3">
            <li> <Link href="/"  >Знайти івент</Link></li>
            <li> <Link href="/favorites"  >Мої вподобайки</Link></li>
            <li> <Link href="/reminders" >Нагадування</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm md:text-base font-bold text-m-t mb-4">Для організаторів</h3>
          <ul className="space-y-2 md:space-y-3">
            <li> <Link href="/">Створити івент</Link></li>
            <li> <Link href="/">Інструменти</Link></li>
            <li> <Link href="/">Аналітика</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm md:text-base font-bold text-m-t mb-4">Правова інформація</h3>
          <ul className="space-y-2 md:space-y-3">
            <li> <Link href="/" >Конфіденційність</Link></li>
            <li> <Link href="/" >Умови користування</Link></li>
            <li> <Link href="/">Контакти</Link></li>
          </ul>
        </div>

      </div>

      <div className="border-t border-gray-l my-6 md:my-8"></div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4">

        <div className="flex  items-center md:items-start flex-col gap-1 md:gap-2">
          <Link href='/' className="flex items-center  gap-2">
            <HeadLogo className="h-6.5" />
            <h2 className="text-lg md:text-xl font-medium text-m-t mb-1">
              KAERU</h2>
          </Link>

          <p className="text-xs text-gray-d">Платформа для пошуку та організації івентів</p>
        </div>
        <div className="text-center md:text-right">
          <p className="text-xs md:text-sm text-gray-d my-3 ">©  KAERU. Всі права захищені.</p>
        </div>

      </div>

    </div>
  </footer>);
}

export default Footer;