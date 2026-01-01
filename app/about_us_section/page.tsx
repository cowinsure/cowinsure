import ArchitectureDiagram from "@/components/AboutPage/AboutUsSectionComponent/ArchitectureDiagram";
import GlobalDeployment from "@/components/AboutPage/AboutUsSectionComponent/GlobalDeployment";
import OperatingSystems from "@/components/AboutPage/AboutUsSectionComponent/OperatingSystems";
import TechnologyHero from "@/components/AboutPage/AboutUsSectionComponent/TechnologyHero";
import VerificationEngines from "@/components/AboutPage/AboutUsSectionComponent/VerificationEngine";



const page = () => {
  return (
    <main className="min-h-screen bg-background">
      <TechnologyHero />
      <VerificationEngines />
      <OperatingSystems />
      <ArchitectureDiagram />
      <GlobalDeployment />
    </main>
  );
};

export default page;
