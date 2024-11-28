import BlurFade from "@/components/magicui/blur-fade";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Megaphone } from "lucide-react";

const StudentBanner = ({
  title,
  content,
}: {
  title: string;
  content: string;
  className?: string;
}) => (
  <Card className="flex flex-col sm:flex-row justify-between p-4 sm:p-8 border-none rounded-lg group text-primary-foreground bg-primary [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]">
    <div className="flex flex-col items-start justify-between transition-all duration-300 ease-out">
      <div>
        <h1 className="inline-flex items-center gap-2 mb-2 text-2xl font-bold sm:text-3xl">
          {title}
        </h1>
        <p className="text-sm dark:text-muted-foreground">{content}</p>
      </div>
    </div>
    <BlurFade delay={0.25}>
      <div className="w-[150px] sm:w-[250px] pointer-events-none mt-4 sm:mt-0">
        <div className="relative pt-4 transition-all duration-300 ease-out rounded-tr-none sm:absolute rounded-tl-md sm:-right-8 sm:-top-8">
          <motion.div
            initial={{ rotate: 45, scale: 0.5 }}
            animate={{
              rotate: [45, 55, 35, 45],
              scale: [0.8, 1, 0.9, 1],
            }}
            transition={{
              duration: 0.75,
              ease: "easeInOut",
            }}
          >
            <Megaphone className="w-24 h-24 opacity-100 sm:w-36 sm:h-36" />
          </motion.div>
        </div>
      </div>
    </BlurFade>
  </Card>
);

StudentBanner.displayName = "StudentBanner";

export { StudentBanner };
