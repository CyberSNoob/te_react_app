import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full h-full bg-default text-default-txtcolor py-6">
      <div className="flex flex-col items-center justify-center text-xl gap-2">
        <a
          href="https://github.com/CyberSNoob"
          className="flex items-center"
          rel="noopener noreferrer"
        >
          <FaGithub className="text-4xl" />
          <p className="p-2" aria-label="Github profile">
            CyberSNoob
          </p>
        </a>
        <p className="my-2">
          Built with React, Tailwind, Flask, Redis (for caching)
        </p>
      </div>
    </footer>
  );
};

export default Footer;
