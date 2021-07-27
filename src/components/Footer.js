import React from "react";
import { FaGithub, FaLinkedin, FaTwitter, FaCodepen } from "react-icons/fa";

function Footer() {
  return (
    <footer>
      <div className="flex items-center justify-center w-screen absolute bottom-0 left-0 mb-5">
        <a
          href="https://github.com/rhuangabrielsantos"
          title="Github"
          target="_blanked"
          className="no-underline text-gray-400 text-3xl mx-1 my-0 hover:text-gray-600 duration-300"
        >
          <FaGithub />
        </a>
        <a
          href="https://www.linkedin.com/in/rhuangabrielsantos/"
          title="Linkedin"
          target="_blanked"
          className="no-underline text-gray-400 text-3xl mx-1 my-0 hover:text-gray-600 duration-300"
        >
          <FaLinkedin />
        </a>
        <a
          href="https://twitter.com/rhuangs_"
          title="Twitter"
          target="_blanked"
          className="no-underline text-gray-400 text-3xl mx-1 my-0 hover:text-gray-600 duration-300"
        >
          <FaTwitter />
        </a>
        <a
          href="https://codepen.io/rhuangabrielsantos"
          title="Codepen"
          target="_blanked"
          className="no-underline text-gray-400 text-3xl mx-1 my-0 hover:text-gray-600 duration-300"
        >
          <FaCodepen />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
