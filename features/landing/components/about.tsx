import { AboutConfig } from "../constant/about-config";
import { AboutCard } from "./about-card";

export const About = () => {
  return (
    <div className="flex flex-col items-center gap-10">
      <h1 className="text-xl font-semibold capitalize md:text-4xl">
        Tentang kerjatim
      </h1>
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
        {AboutConfig.map((item, index) => (
          <AboutCard
            key={index}
            text={item.text}
            image={item.image}
            label={item.label}
          />
        ))}
      </div>
    </div>
  );
};
