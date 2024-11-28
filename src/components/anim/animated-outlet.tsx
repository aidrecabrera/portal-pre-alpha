import { getRouterContext, Outlet, useMatches } from '@tanstack/react-router'
import { motion, MotionProps, useIsPresent, Variants } from 'framer-motion'
import { cloneDeep } from 'lodash-es'
import { forwardRef, useContext, useRef } from 'react'

type Direction = 'left' | 'right' | 'up' | 'down'

type AnimatedOutletProps = MotionProps & {
  direction?: Direction
}

const OFFSET: Record<Direction, 1 | -1> = {
  left: 1,
  right: -1,
  up: 1,
  down: -1,
}

const AXIS: Record<Direction, 'x' | 'y'> = {
  left: 'x',
  right: 'x',
  up: 'y',
  down: 'y',
}

export const RouteTransitionVariants: Variants = {
  initial: (direction: Direction = 'left') => ({
    [AXIS[direction]]: `${OFFSET[direction] * 100}vw`,
    opacity: 0,
  }),
  animate: (direction: Direction = 'left') => ({
    [AXIS[direction]]: 0,
    opacity: 1,
  }),
  exit: (direction: Direction = 'left') => ({
    [AXIS[direction]]: `${OFFSET[direction] * -100}vw`,
    opacity: 0,
  }),
}

export const TransitionProps = {
  variants: {
    initial: { opacity: 0, scale: 1 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.02 },
  },
  initial: 'initial',
  animate: 'animate',
  exit: 'exit',
  transition: {
    type: 'tween',
    ease: [0.25, 0.1, 0.25, 1],
    duration: 0.5,
  },
  style: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
} as const

const AnimatedOutlet = forwardRef<HTMLDivElement, AnimatedOutletProps>(
  ({ direction, ...props }, ref) => {
    const isPresent = useIsPresent()

    const matches = useMatches()
    const prevMatches = useRef(matches)

    const RouterContext = getRouterContext()
    const routerContext = useContext(RouterContext)

    let renderedContext = routerContext

    if (isPresent) {
      prevMatches.current = cloneDeep(matches)
    } else {
      renderedContext = cloneDeep(routerContext)
      renderedContext.__store.state.matches = [
        ...matches.map((m, i) => ({
          ...(prevMatches.current[i] || m),
          id: m.id,
        })),
        ...prevMatches.current.slice(matches.length),
      ]
    }

    return (
      <motion.div
        ref={ref}
        className="outlet"
        custom={direction}
        {...TransitionProps}
        transition={{
          duration: 1,
          ease: 'easeInOut',
          staggerChildren: 0.05,
        }}
        initial={{ opacity: 0, scale: 1 }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        exit={{
          opacity: 0,
          scale: 1,
        }}
        {...props}
      >
        <RouterContext.Provider value={renderedContext}>
          <div className="flex flex-col h-screen">
            <Outlet />
          </div>
        </RouterContext.Provider>
      </motion.div>
    )
  }
)

export default AnimatedOutlet
