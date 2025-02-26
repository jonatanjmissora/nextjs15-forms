
import Link from 'next/link'
import HeaderLink from './HeaderLink'

const NavLinks = [
  { href: "/01ClientAndServerAction", text: "Client Action + Server Action" },
  { href: "/02RHFAndServerAction", text: "RHF + Server Action" },
  { href: "/03UseActionState", text: "useActionState" },
  { href: "/04RHFAndUseActionState", text: "RHF + useActionState" },
  { href: "/05UseActionStateAndModal", text: "useActionState + Modal" },
]

export default async function Header() {

  return (
    <div className="navbar flex justify-between text-slate-200 bg-slate-900 px-4">
      <Link href={"/"} className="btn btn-ghost text-xl">K@to</Link>
      <nav>
        {
          NavLinks.map((link, i) => (
            <HeaderLink key={i} href={link.href} text={link.text} />
          ))
        }
      </nav>
      <div className="flex-none">

      </div>
    </div>
  )
}
