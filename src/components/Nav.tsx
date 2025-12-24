'use client';

import Link from "next/link";
import TailButton from "./TailButton";

const LogoutClick = () => {
    console.log("로그아웃이요")
}

export default function () {
    return (
        <div className='flex flex-col h-screen'>
            <img src="./KSPO_CI.png" className="my-5 p-3" />
            <ul className='flex flex-col my-10 justify-center items-center'>
                <li className="my-5">
                    <Link href="/dashboard"
                        className='text-2xl text-white font-bold p-2 rounded-sm hover:text-blue-900'>
                        DashBoard
                    </Link>
                </li>
                <li className="my-5">
                    <Link href="/search"
                        className='text-2xl text-white font-bold p-2 rounded-sm hover:text-blue-900'>
                        체육시설검색
                    </Link>
                </li>   
            </ul>
            <div className="mt-auto pb-10 text-white flex flex-col justify-center items-center px-5">
                <h1 className="my-3">환영합니다. X X X 님.</h1>
                <TailButton color="blue" caption="로그아웃" onHandle={LogoutClick} />
            </div>
        </div>
    );
}