// import Image from "next/image";

// export default function Home() {
//   return (
//     <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
//       <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
//         <h2>git try - skm1</h2>
//       </main>
//     </div>
//   );
// }

import Feature from "@/components/Home/Feature/Feature";
import GetStarted from "@/components/Home/Get-Started/GetStarted";
import HomeHero from "@/components/Home/Home-Hero/HomeHero";
import Trusted from "@/components/Home/Trusted/Trusted";

export default function Home() {
  return (
    <div>
      <HomeHero />
      <Trusted />
      <Feature />
      <GetStarted />
    </div>
  );
}
