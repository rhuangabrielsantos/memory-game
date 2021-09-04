import React from "react";
import { motion } from "framer-motion";

export default function Screen(props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: +70 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center bg-nosferatu h-screen w-screen"
    >
      {props.children}
    </motion.div>
  );
}
