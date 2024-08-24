"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { MagnifyingGlassIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { useBoardStore } from "@/store/BoardStore";
import fetchSuggestion from "@/lib/fetchSuggestion";
import logo from "@/public/logo.svg";
import GPT from "@/public/gpt-star.svg";
import PopoverHeader from "./PopoverHeader";

function Header() {
  const [board, searchString, setSearchString] = useBoardStore((state) => [
    state.board,
    state.searchString,
    state.setSearchString,
  ]);
  const [loading, setLoading] = useState<boolean>(false);
  const [suggestion, setSuggestion] = useState<string>("");

  useEffect(() => {
    if (board.columns.size === 0) return;
    setLoading(true);

    const fetchSuggestionFunc = async () => {
      const suggestion = await fetchSuggestion(board);
      setSuggestion(suggestion);
      setLoading(false);
    };

    fetchSuggestionFunc();
  }, [board]);

  return (
    <header>
      <div className="flex flex-col md:flex-row items-center pr-5 pl-5 pt-2 pb-2 bg-[#C4A5FF] rounded-b-2xl">
        {/* Gradient */}

        <div
          className="absolute top-0 left-0 w-full h-96 bg-gradient-to-br from-[#A6DFFF] to-[#dedfe1] rounded-md
          filter
          blur-3xl opacity-50 -z-50"
        />

        {/* Logo */}

        <Image
          src={logo}
          alt={"TaskStar logo"}
          width={300}
          height={100}
          className="w-44 md:w-[90px] object-contain"
        />

        {/* Search Box */}

        <div className="flex flex-col gap-4 mb-4 md:mb-0 md:flex-row items-center space-x-5 flex-1 justify-center md:justify-end w-full">
          {/* Popover */}

          <PopoverHeader />

          <form
            className="flex items-center space-x-1 bg-white rounded-full p-2 shadow-md h-12" // h-12 é 48px
            action=""
          >
            <MagnifyingGlassIcon className="h-5 w-5 ml-2 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              value={searchString}
              onChange={(e) => setSearchString(e.target.value)}
              className="flex-1 outline-none p-2 h-full"
            />
            <button type="submit" hidden>
              Search
            </button>
          </form>
        </div>
      </div>

      {/* ChatGPT Box */}

      <div className="flex items-center justify-center px-5 py-2 md:py-5">
        <p className="flex items-center p-5 text-sm font-light pr-5 shadow-xl rounded-xl w-fit bg-white italic-max-w-3xl text-[#0055D1]">
          <Image
            src={GPT}
            alt={"GPT logo"}
            className={`inline-bloc h-8 w-8 mr-3
              ${loading && "animate-spin"}`}
          />

          {suggestion && !loading
            ? suggestion
            : "GPT is summarizing your tasks for the day..."}
        </p>
      </div>
    </header>
  );
}

export default Header;
