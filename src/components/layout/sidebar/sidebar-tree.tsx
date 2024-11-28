import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { IRouteInterface } from "@/resources";
import { Link, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import React, { useState } from "react";
import { useMediaQuery } from "../../../hooks/use-media-query";

/**
 * Renders a child item in the sidebar with animation effects.
 *
 * This component creates a motion-enabled div that represents a child item
 * in the sidebar. It applies hover and tap animations for interactive feedback.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.label - The text to display for the child item.
 * @returns {JSX.Element} A motion.div element representing the child item.
 */

const ChildItem = ({ label, to }: { label: string; to: string }) => (
  <motion.div
    whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
    whileTap={{ scale: 0.95 }}
  >
    <Link
      to={to}
      className="relative block py-2 pl-3 mb-2 ml-1 mr-6 text-sm text-gray-600 rounded-md hover:text-white"
      activeProps={{
        className: "bg-black",
      }}
    >
      {label}
    </Link>
  </motion.div>
);

const LinkMotion = motion(Link);

/**
 * Renders a sidebar item with optional expandable children.
 *
 * This component creates an animated sidebar item that can contain child items.
 * It supports opening and closing animations for child items and hover effects.
 *
 * @param {Object} props - The properties for the SidebarItem component.
 * @param {React.ComponentType} props.icon - The icon component to display.
 * @param {string} props.label - The text label for the sidebar item.
 * @param {boolean} [props.hasChildren] - Whether the item has child elements.
 * @param {boolean} [props.isOpen] - Whether the child items are currently expanded.
 * @param {() => void} [props.onClick] - Callback function for click events.
 * @param {React.ReactNode} [props.children] - Child elements to render when expanded.
 * @returns {JSX.Element} A motion.div element representing the sidebar item.
 */
const SidebarItem = ({
  icon: Icon,
  label,
  to,
  hasChildren,
  isOpen,
  onClick,
  children,
}: {
  icon: any;
  label: string;
  to?: string;
  hasChildren?: boolean;
  isOpen?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}) => {
  return (
    <LinkMotion
      className="select-none"
      initial={false}
      animate={isOpen ? "open" : "closed"}
    >
      {hasChildren ? (
        <LinkMotion
          className="flex items-center justify-between px-4 py-2 text-sm rounded-lg cursor-pointer hover:text-primary"
          onClick={onClick}
          whileTap={{ scale: 1 }}
        >
          <motion.div className="flex items-center">
            <Icon className={cn("w-5 h-5 mr-3")} />
            <span>{label}</span>
          </motion.div>
          <motion.div
            className="text-gray-400"
            variants={{
              open: { rotate: -90 },
              closed: { rotate: 0 },
            }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </LinkMotion>
      ) : (
        <Link
          to={to}
          className="flex items-center px-4 py-2 text-sm rounded-lg hover:text-primary dark:hover:text-primary-foreground group"
          activeProps={{
            className:
              "bg-primary/10 dark:bg-card text-primary dark:text-primary-foreground",
          }}
        >
          <Icon className="w-5 h-5 mr-3" />
          <span>{label}</span>
          {to === "/announcement" && (
            <Badge className="flex items-center justify-center w-6 h-6 ml-auto -mr-1 rounded-full hover:bg-primary/80 group:hover:bg-primary/80 shrink-0">
              6
            </Badge>
          )}
        </Link>
      )}
      <AnimatePresence initial={false}>
        {hasChildren && isOpen && (
          <motion.div
            className="mt-1 ml-6 overflow-hidden"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <motion.div
              className="relative pl-4"
              variants={{ collapsed: { opacity: 0 }, open: { opacity: 1 } }}
              transition={{ duration: 0.2 }}
            >
              <div className="absolute top-0 bottom-0 left-0 w-4">
                <div className="absolute top-0 bottom-8 left-0 w-[2px] bg-border"></div>
              </div>
              {React.Children.map(children, (child, index) => (
                <motion.div
                  key={index}
                  initial={{ y: -25 }}
                  animate={{ y: 0 }}
                  exit={{ y: -25 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                >
                  <div className="relative">
                    <div className="absolute z-10 border-b-2 border-l-2 rounded-bl-sm border-border -top-0 -left-4 size-5"></div>
                    <div className="ml-1 rounded-md hover:text-primary">
                      {child}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </LinkMotion>
  );
};

/**
 * Creates an initial state object for open/closed status of sidebar items.
 */
const createInitialOpenState = (
  routes: IRouteInterface[]
): Record<string, boolean> => {
  return routes.reduce(
    (acc, route) => {
      acc[route.to] = true;
      if (route.children) {
        Object.assign(acc, createInitialOpenState(route.children));
      }
      return acc;
    },
    {} as Record<string, boolean>
  );
};

/**
 * Renders a tree-like sidebar structure with expandable items.
 *
 * This component creates a sidebar with a hierarchical structure of items,
 * supporting nested routes and animated transitions. It manages the state
 * of open/closed items and renders the sidebar structure based on the
 * provided routes configuration.
 *
 * @returns {JSX.Element} A motion.div element containing the rendered sidebar tree structure.
 */
export const SidebarTree = ({ routes }: { routes: IRouteInterface[] }) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const navigate = useNavigate();
  /**
   * State to keep track of which sidebar items are open.
   * @type {Record<string, boolean>}
   */
  const [openItems, setOpenItems] = useState<Record<string, boolean>>(
    isMobile ? {} : createInitialOpenState(routes)
  );

  /**
   * Toggles the open/closed state of a sidebar item.
   * @param {string} item - The identifier of the item to toggle.
   */
  const toggleItem = (item: string) => {
    setOpenItems((prev) => ({ ...prev, [item]: !prev[item] }));
    navigate({
      to: item,
    });
  };

  /**
   * Recursively renders the route structure as SidebarItems.
   * @param {typeof routes} items - The array of route items to render.
   * @returns {JSX.Element[]} An array of rendered SidebarItem components.
   */
  const renderRoutes = (items: typeof routes) => {
    return items.map((route) => (
      <SidebarItem
        key={route.to}
        icon={route.icon}
        label={route.label}
        to={route.to}
        hasChildren={!!route.children?.length}
        isOpen={openItems[route.to]}
        onClick={() => toggleItem(route.to)}
      >
        {route.children ? (
          renderRoutes(route.children)
        ) : (
          <ChildItem to={route.to} label={route.label} />
        )}
      </SidebarItem>
    ));
  };

  return (
    <motion.div
      initial={false}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="pt-4 text-muted-foreground">{renderRoutes(routes)}</div>
    </motion.div>
  );
};
