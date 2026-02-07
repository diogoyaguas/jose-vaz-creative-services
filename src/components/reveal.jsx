import * as React from "react"

import { motion } from "framer-motion"

const variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
}

export default function Reveal({ children, as: Tag = "div", delay = 0, once = true }) {
  return (
    <motion.div
      as={Tag}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount: 0.2, margin: "-80px" }}
      variants={{
        hidden: variants.hidden,
        show: { ...variants.show, transition: { ...variants.show.transition, delay } },
      }}
    >
      {children}
    </motion.div>
  )
}
