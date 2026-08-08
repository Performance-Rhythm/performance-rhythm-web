import Link from "next/link";
import Image from "next/image";

export function LogoHorizontal({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`inline-flex items-center font-bold text-primary ${className}`} aria-label="Performance Rhythm home">
      <Image
        src="/brand/logo-performance-rhythm.svg"
        alt="Performance Rhythm"
        width={280}
        height={64}
        priority
        className="h-8 w-auto"
      />
    </Link>
  );
}
