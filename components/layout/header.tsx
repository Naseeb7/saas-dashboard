import { Menu, Coins } from "lucide-react";
import Image from "next/image";

interface HeaderProps {
  onMobileMenuClick?: () => void;
}

export function Header({ onMobileMenuClick }: HeaderProps) {
  return (
    <header
      aria-label="Dashboard header"
      className="border-b border-black/8 px-5 py-3 flex items-center justify-end"
    >
      <div className="flex w-full items-center justify-end gap-4">
        <div className="flex items-center justify-between px-2 py-1 bg-success-bg text-success-text rounded-[10.5px] gap-4 opacity-90">
          <div className="flex font-medium items-center gap-2">
            <Coins size={16} />
            450000/5500000
          </div>
          <div className="bg-success-text text-surface py-0.5 rounded-[8.5px] text-xs font-medium px-2 leading-4 border border-transparent hover:cursor-pointer">
            Booster Plan
          </div>
        </div>
        <Image
          src={"/images/sidebar/person2.webp"}
          alt="person"
          height={28}
          width={28}
          className="h-7 w-7 rounded-full object-cover"
        />
        {onMobileMenuClick ? (
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center md:hidden"
            onClick={onMobileMenuClick}
            aria-label="Open navigation menu"
          >
            <Menu size={16} />
          </button>
        ) : null}
      </div>
    </header>
  );
}
