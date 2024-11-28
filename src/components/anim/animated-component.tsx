import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'

interface AnimatedComponentProps {
  children: React.ReactNode
}

export const AnimatedComponent: React.FC<AnimatedComponentProps> = ({
  children,
}) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
