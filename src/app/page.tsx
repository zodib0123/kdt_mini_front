import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import KoreaMap from "@/components/KoreaMap";
import DistrictCnt from "@/components/DistrictCnt";
import PacililtyChart from "@/components/PacililtyChart"
import { IoSearch } from "react-icons/io5";

export default function Home() {
  return (
    <div className="w-full h-screen ">
      {/* <Header /> */}
      <div className="w-full flex">
        <div className="w-130 flex flex-col mx-3 justify-end">
          <div className="border-2 border-gray-200 rounded-2xl py-5 px-1">
            <h1 className="text-2xl font-bold ml-10">전국공공체육시설 지도</h1>
            <KoreaMap />
          </div>
          <DistrictCnt />
        </div>
        <div className="flex-1 mr-3">
          <form className="flex p-5 mr-5">
            <input type="text" placeholder="체육 시설명 검색"
              className="w-full h-15 text-xl px-3 border-2 border-gray-400 rounded-2xl" />
            {/* <button className="w-15 h-15 ml-2 border-2 border-gray-400 rounded-2xl" ><IoSearch /></button> */}
            <button className="ml-2 text-5xl text-gray-400 ">
              <IoSearch />
            </button>
          </form>
          <PacililtyChart />
        </div>
      </div>
    </div>
  );
}
