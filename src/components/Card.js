import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Logo from './../assets/logo.svg'

export default function Card() {
  const [isOpen, setIsOpen] = useState(false)

  const variants = {
    open: { rotateY: 0 },
    closed: { rotateY: 180 },
  }

  return (
    <motion.div
      style={{
        position: "relative",
        width: 100,
        height: 100,
        float: "left",
        margin: 5
      }}
    >
      <motion.div
        className="bg-vonCount flex items-center justify-center"
        style={{
          height: 100,
          width: 100,
          borderRadius: 10,
          position: "absolute",
          WebkitBackfaceVisibility: "visible"
        }}
        initial={{ rotateY: 0 }}
        animate={isOpen ? "open" : "closed"}
        variants={variants}
        transition={{ duration: 1 }}
        onClick={() => setIsOpen(isOpen => !isOpen)}
      >
        <img src={Logo} alt="brain" className="w-3/4" />
      </motion.div>

      <motion.div
        style={{
          background: "red",
          height: 100,
          width: 100,
          borderRadius: 10,
          position: "absolute",
          WebkitBackfaceVisibility: "hidden"
        }}
        initial={{ rotateY: 0 }}
        animate={isOpen ? "open" : "closed"}
        variants={variants}
        transition={{ duration: 1 }}
        onClick={() => setIsOpen(isOpen => !isOpen)}
      />
    </motion.div>
  )
}
