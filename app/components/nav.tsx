import Link from "next/link";
import { NavLink } from "./nav-link";
import { BookButton } from "./book-button";
import { SiInstagram } from "@icons-pack/react-simple-icons";

export function Nav() {
  return (
    <header className="flex justify-between w-full">
      <div>
        <p className="font-serif text-5xl">MILENA&apos;S</p>
        <p className="text-end">beauty bar</p>
      </div>
      <nav className="flex items-baseline justify-between gap-8">
        <ul className="flex items-baseline justify-between gap-8">
          <li>
            <NavLink href="#about">About</NavLink>
          </li>
          <li>
            <NavLink href="#brows">Brows</NavLink>
          </li>
          <li>
            <NavLink href="#lashes">Lashes</NavLink>
          </li>
          <li>
            <NavLink href="#facial-wax">Facial Wax</NavLink>
          </li>
          <li>
            <NavLink href="#faqs">FAQs</NavLink>
          </li>
          <li>
            <BookButton href="https://milenasbeautybar.as.me/schedule/13baf9e3" />
          </li>
          <li>
            <Link
              href="https://www.instagram.com/milenas.beautybar/"
              target="_blank"
            >
              <SiInstagram className="inline-flex" />
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
