import {
  SiFacebook,
  SiInstagram,
  SiTiktok,
} from "@icons-pack/react-simple-icons";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="flex flex-col gap-4 bg-[#F0DED3] p-4 w-full items-center justify-center">
      <p>
        <em>Address and phone number available with booking</em>
      </p>
      <div className="flex flex-row gap-4 items-center justify-center">
        <Link
          href="https://www.instagram.com/milenas.beautybar/"
          target="_blank"
        >
          <SiInstagram />
        </Link>
        <Link
          href="https://www.instagram.com/milenas.beautybar/"
          target="_blank"
        >
          <SiFacebook />
        </Link>
        <Link
          href="https://www.instagram.com/milenas.beautybar/"
          target="_blank"
        >
          <SiTiktok />
        </Link>
      </div>
      <p>&copy; 2025 Milena&apos;s Beauty Bar. All rights reserved.</p>
    </footer>
  );
}
