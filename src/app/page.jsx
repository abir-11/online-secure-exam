import Feature from "@/components/Home/Feature/Feature";
import LearnerResources from "@/components/Home/LearnerResources/LearnerResources";
import GetStarted from "@/components/Home/Get-Started/GetStarted";
import HomeHero from "@/components/Home/Home-Hero/HomeHero";
import Trusted from "@/components/Home/Trusted/Trusted";

export default function Home() {
  return (
    <div>
      <HomeHero />
      <Trusted />
      <Feature />
      <LearnerResources />
      <GetStarted />
    </div>
  );
}
