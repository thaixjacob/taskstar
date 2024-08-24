import Image from "next/image";
import {
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from "@headlessui/react";

function PopoverHeader() {
  return (
    <PopoverGroup className="flex justify-center items-center gap-4">
      <Popover className="relative">
        <PopoverButton className="font-medium hover:font-bold hover:underline text-white text-lg outline-none">
          Who made this?
        </PopoverButton>

        <PopoverPanel
          anchor="bottom"
          transition
          className="flex flex-col text-gray-800 bg-white/60 rounded-md p-2 gap-2 [--anchor-gap:4px] transition duration-200 ease-out data-[closed]:scale-95 data-[closed]:opacity-0"
        >
          <div className="hover:bg-white/80 p-2 flex justify-start items-center gap-2 rounded-md">
            <a
              href="https://www.linkedin.com/in/thaisjacob/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center font-normal hover:font-semibold"
            >
              <Image
                src="/linkedin.png"
                alt="LinkedIn"
                width={20}
                height={20}
                className="mr-2"
              />
              LinkedIn
            </a>
          </div>
          <div className="hover:bg-white/80 p-2 flex justify-start items-center gap-2 rounded-md">
            <a
              href="https://github.com/thaixjacob"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center font-normal hover:font-semibold"
            >
              <Image
                src="/github.png"
                alt="Github"
                width={20}
                height={20}
                className="mr-2"
              />
              Github
            </a>
          </div>
        </PopoverPanel>
      </Popover>
    </PopoverGroup>
  );
}

export default PopoverHeader;
