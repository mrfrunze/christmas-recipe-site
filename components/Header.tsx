import Image from "next/image";
import { IoMdSearch } from "react-icons/io";
import logo from "@/public/logo-cooker.png"

export default function Header() {
  return (
    <header className="bg-[#d32f2f] text-white">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between px-4 py-4">
        <div className="flex items-center justify-center w-[50px] h-[50px] overflow-hidden">
          <Image src={logo} alt="logo"   width={45} height={45} className="object-contain"/>
        </div>
        <nav className="mt-3 sm:mt-0 flex space-x-6 text-sm font-semibold uppercase">
          <a href="#" className="hover:underline">Hem</a>
          <a href="#" className="hover:underline">Julrecept</a>
          <a href="#" className="hover:underline">Sök</a>
        </nav>
      </div>
      <div className="flex flex-col items-center text-center py-2 px-2">
        <h1 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
          Julens söta favoriter
        </h1>

        <div className="w-full max-w-md flex items-center bg-white rounded-lg shadow-md px-3 py-2">
          <input
            type="text"
            placeholder="Sök recept..."
            className="w-full outline-none text-gray-700 text-sm px-2"
          />
          <button className="text-gray-500 hover:text-gray-700 cursor-pointer">
            <IoMdSearch className="text-2xl" />
          </button>
        </div>
      </div>
    </header>
    )
}