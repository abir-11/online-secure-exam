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
