import ArchitectureDiagram from "@/components/AboutPage/OurTechnologySection/ArchitectureDiagram";
import GlobalDeployment from "@/components/AboutPage/OurTechnologySection/GlobalDeployment";
import OperatingSystems from "@/components/AboutPage/OurTechnologySection/OperatingSystems";
import TechnologyHero from "@/components/AboutPage/OurTechnologySection/TechnologyHero";
import VerificationEngines from "@/components/AboutPage/OurTechnologySection/VerificationEngine";



const page = () => {
  return (
    <main className="min-h-screen bg-background">
      <TechnologyHero showKnowMoreButton={false} />
      <VerificationEngines />
      <OperatingSystems />
      <ArchitectureDiagram />
      <GlobalDeployment />
    </main>
  );
};

export default page;
