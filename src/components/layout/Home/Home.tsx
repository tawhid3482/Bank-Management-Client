import { CallToAction } from "./CallToAction";
import CreditLimitAndHowItWorks from "./Credit";
import { Hero } from "./Hero";
import { IndustrySolutions } from "./IndustrySolutions";

const Home = () => {
  return (
    <div>
      <Hero />
      <IndustrySolutions></IndustrySolutions>
      <CreditLimitAndHowItWorks />
      <CallToAction />
    </div>
  );
};

export default Home;
