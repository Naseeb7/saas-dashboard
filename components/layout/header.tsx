import { Coins } from "lucide-react";
import Image from "next/image";
import { Button } from "../shared/button";

export function Header() {
  return (
    <header
      aria-label="Dashboard header"
      className="border-b border-black/8 px-5 py-2.75 flex items-center justify-end"
    >
      <div className="flex gap-4 items-center w-full justify-end">
        <div className="flex items-center justify-between px-2 py-1 bg-green-100 text-green-900 rounded-[10.5px] gap-4 opacity-80">
          <div className="flex font-medium items-center gap-2">
            <Coins size={16} />
            450000/5500000
          </div>
          <div className="bg-green-900 text-background py-0.5 rounded-[8.5px] text-xs font-medium px-2 leading-4 border border-transparent hover:cursor-pointer">
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
      </div>
    </header>
  );
}
