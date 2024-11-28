import { Icon, SquaresFour } from '@phosphor-icons/react'
import { VariantProps } from 'class-variance-authority'
import * as React from 'react'
import { SidebarButton, sidebarButtonVariants } from './sidebar-button'

interface Route {
  to: string
  label: string
  icon: Icon
}

interface SidebarButtonContainerProps {
  routes: Route[]
  variant?: VariantProps<typeof sidebarButtonVariants>['variant']
  size?: VariantProps<typeof sidebarButtonVariants>['size']
}

const SidebarButtonContainer: React.FC<SidebarButtonContainerProps> = ({
  routes,
  variant = 'default',
  size = 'default',
}) => {
  return (
    <>
      {routes.map((route, index) => (
        <SidebarButton
          className="w-full shadow-none sm:mx-4 md:mx-0"
          key={index}
          to={route.to}
          variant={variant}
          size={size}
        >
          <div className="flex justify-start">
            {route.icon ? (
              <route.icon className="w-6 h-6 mr-2" size={24} />
            ) : (
              <SquaresFour className="w-6 h-6 mr-2" size={24} />
            )}
            <span className="mt-[2px]">{route.label}</span>
          </div>
        </SidebarButton>
      ))}
    </>
  )
}

export default SidebarButtonContainer
