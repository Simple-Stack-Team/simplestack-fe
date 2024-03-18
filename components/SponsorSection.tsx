import { SiTailwindcss } from "react-icons/si";
import { FaReact } from "react-icons/fa";
import { SiTypescript } from "react-icons/si";
import { TbBrandNextjs } from "react-icons/tb";
import { SiNestjs } from "react-icons/si";
import { BiLogoMongodb } from "react-icons/bi";
import { FaGithub } from "react-icons/fa";

const SponsorsSection = () => {
  const size = 40;
  return (
    <div className="bg-black p-8 text-white">
      <ul className="flex flex-wrap justify-center gap-8">
        <li className="flex items-center gap-2">
          <SiTailwindcss size={size} />
          <p>Tailwind CSS</p>
        </li>
        <li className="flex items-center gap-2">
          <FaReact size={size} />
          <p>React</p>
        </li>
        <li className="flex items-center gap-2">
          <SiTypescript size={size} />
          <p>TypeScript</p>
        </li>
        <li className="flex items-center gap-2">
          <TbBrandNextjs size={size} />
          <p>Next JS</p>
        </li>
        <li className="flex items-center gap-2">
          <SiNestjs size={size} />
          <p>Nest JS</p>
        </li>
        <li className="flex items-center gap-2">
          <BiLogoMongodb size={size} />
          <p>MongoDB</p>
        </li>
        <li className="flex items-center gap-2">
          <FaGithub size={size} />
          <p>GitHub</p>
        </li>
      </ul>
      <div>
        <p className="mx-auto mt-8 max-w-[800px] bg-gradient-to-r from-gray-300 via-white via-50% to-gray-300 to-80% bg-clip-text text-center text-xs text-transparent">
          Discover the perfect team partners for your projects with our
          innovative app! Using advanced matching algorithms, we provide a
          simplified experience in finding team members. Find people with the
          same interests and skills, communicate effectively and turn your
          projects into reality.
        </p>
      </div>
    </div>
  );
};

export default SponsorsSection;
