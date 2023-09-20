'use client'
import { buildPath } from "@/cms/base";
import { AvailableLocaleType } from "@/cms/types";
import Button from "@/components/common/ripple-button";
import Link from "next/link";
import React, { useState } from "react";
import debounce from 'lodash.debounce';
import { useRouter } from "next/navigation";

interface BlogPaginatorProps {
  locale: AvailableLocaleType
  previousUrl: string | null
  nextUrl: string | null
  pageIndex: number
  totalPage: number
}

export default function BlogPaginator({ locale, previousUrl, nextUrl, pageIndex, totalPage }: BlogPaginatorProps) {
  const router = useRouter();
  const [page, setPage] = useState<number>(pageIndex);

  const debouncedFunction = debounce(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    router.push(buildPath(`/blog/page/${page}`, locale));
  }, 3000);

  const onHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(Number(event.target.value));
    debouncedFunction();
  };
  
  return (
    <div
      className="relative flex flex-col lg:flex-row w-full items-center justify-center"
    >
      <div
        className="flex items-center justify-center"
      >
        { previousUrl && (
          <Link
            href={ previousUrl }
          >
            <Button
              className="text-secondary mr-2.5 px-2 py-1.5 border-2 border-solid border-secondary w-36 text-sm font-button capitalize leading-6 hover:bg-secondary hover:text-white transition-colors duration-300"
            >
              Previous
            </Button>
          </Link>
        )}
        { nextUrl && (
          <Link
            href={ nextUrl }
          >
            <Button
              className="text-white mr-2.5 px-2 py-1.5 bg-secondary border-2 border-solid border-secondary w-36 text-sm font-button capitalize leading-6 hover:bg-white hover:text-secondary transition-colors duration-300"
            >
              Next
            </Button>
          </Link>
        )}
      </div>
      <div className="mt-[1.875rem] relative lg:absolute lg:right-0  inline-flex items-center font-title text-[0.875rem] font-normal leading-[1.5rem] tracking-normal text-primary">
        <div>Page</div>
        <input
          className="w-[3.125rem] h-[1.75rem] text-center mx-2 px-0.25 py-0.25 pl-2 text-[0.875rem] focus:outline-none border border-solid border-[#d3d3d3]"
          type="number"
          value={page}
          min={1}
          max={totalPage}
          onChange={onHandleChange}
        />
        <div> of {totalPage}</div>
      </div>
    </div>
  )
}
