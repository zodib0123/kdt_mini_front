'use client'
import Link from "next/link";
import { useAtomValue } from "jotai"
import { isLoginAtom } from "../atoms/atoms"
import { Search } from 'lucide-react';

export default function Header() {
  // const isLogin = useAtomValue(isLoginAtom) ;
  // console.log("Header", isLogin)
  return (
    <header className='h-25 flex justify-between items-center'>
      <div className='container mx-auto flex flex-col'>
        <div className='text-3xl font-bold '>전국 체육시설 종합 분석</div>
      </div>
      <form className="flex w-200 p-5 mr-5">
            <input type="text" placeholder="시설 이름 검색..."
              className="w-full h-12 text-md px-3 border-2 border-gray-200 rounded-2xl" />
            {/* <button className="w-15 h-15 ml-2 border-2 border-gray-400 rounded-2xl" ><IoSearch /></button> */}
            <button className="ml-2 text-5xl text-gray-400 ">
              <Search />
            </button>
          </form>
    </header>
  )
}
