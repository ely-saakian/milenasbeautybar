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
          rel="noopener noreferrer"
          aria-label="Follow Milena's Beauty Bar on Instagram"
        >
          <SiInstagram aria-hidden="true" />
        </Link>
        <Link
          href="https://www.facebook.com/share/1K1kAsUdd9/?mibextid=wwXIfr"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Follow Milena's Beauty Bar on Facebook"
        >
          <SiFacebook aria-hidden="true" />
        </Link>
        <Link
          href="https://www.tiktok.com/@milenasbeautybar"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Follow Milena's Beauty Bar on TikTok"
        >
          <SiTiktok aria-hidden="true" />
        </Link>
      </div>
      <p>&copy; 2025 Milena&apos;s Beauty Bar. All rights reserved.</p>
    </footer>
  );
}
