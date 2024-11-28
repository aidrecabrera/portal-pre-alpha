import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { StrictMode, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "./components/providers/theme-provider";
import { NotFoundComponent } from "./components/shared/not-found";
import "./index.css";
import { routeTree } from "./routeTree.gen";
import { isAuthenticated } from "./supabase/authHooks";

const queryClient = new QueryClient();

const router = createRouter({
  routeTree,
  defaultPendingMinMs: 1000,
  defaultPendingComponent: () => (
    <motion.div
      className="flex items-center justify-center w-screen h-screen bg-primary/90"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div className="relative w-36 h-36">
        <motion.img
          src="/public/cjc.png"
          alt="CJC Logo"
          className="object-contain w-full h-full"
          initial={{ scale: 0.95, opacity: 0, filter: "blur(1px)" }}
          animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
          exit={{ scale: 0.5, opacity: 0, filter: "blur(1px)" }}
          transition={{ duration: 0.5 }}
        />
      </motion.div>
    </motion.div>
  ),
  // TODO: implement proper error handling and fallback components #FIXED
  defaultErrorComponent: () => <h1>ERROR</h1>,
  defaultNotFoundComponent: NotFoundComponent,
  context: {
    auth: undefined!,
  },
});

function InnerApp() {
  const [auth, setAuth] = useState<boolean | undefined>(undefined);
  useEffect(() => {
    const checkAuth = async () => {
      const authStatus = await isAuthenticated();
      setAuth(authStatus);
    };
    checkAuth();
  }, []);
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} context={{ auth }} />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

function App() {
  return (
    <StrictMode>
      <InnerApp />
    </StrictMode>
  );
}

const rootElement = document.getElementById("root");
if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
}
