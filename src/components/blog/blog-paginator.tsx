import { AvailableLocaleType } from "@/cms/types";
import Button from "@/components/common/ripple-button";
import Link from "next/link";

interface BlogPaginatorProps {
  locale: AvailableLocaleType
  previousUrl: string | null
  nextUrl: string | null
}

export default function BlogPaginator({ locale, previousUrl, nextUrl }: BlogPaginatorProps) {
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

    </div>
  )
}
