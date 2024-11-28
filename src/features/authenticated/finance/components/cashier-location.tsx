import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { useMediaQuery } from "@/hooks/use-media-query";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";
import { Clock, Mail, MapPin, Phone, PhoneCall } from "lucide-react";
import * as React from "react";

const MapEmbed: React.FC = React.memo(() => (
  <iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1387.913931734422!2d125.35344481064254!3d6.751766221221215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32f9b0fbe35f77c1%3A0x640848910a5349b7!2sCor%20Jesu%20College%2C%20Inc.!5e0!3m2!1sen!2sph!4v1723327055080!5m2!1sen!2sph"
    width="100%"
    height="100%"
    style={{ border: 0 }}
    className="w-full h-full rounded-xl"
    allowFullScreen
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
  />
));

MapEmbed.displayName = "MapEmbed";

const InfoItem: React.FC<{
  icon: React.ReactNode;
  content: React.ReactNode;
  delay: number;
}> = ({ icon, content, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="flex items-start space-x-3"
  >
    {icon}
    {content}
  </motion.div>
);

const Address: React.FC = () => (
  <InfoItem
    icon={<MapPin className="w-4 h-4 mt-1 md:w-5 md:h-5 text-primary" />}
    content={
      <p className="text-xs md:text-sm">
        Sacred Heart Avenue
        <br />
        Barangay Zone 2<br />
        Digos City, Davao del Sur
        <br />
        Philippines 8002
      </p>
    }
    delay={0.2}
  />
);

const OfficeHours: React.FC = () => (
  <InfoItem
    icon={<Clock className="w-4 h-4 mt-1 md:w-5 md:h-5 text-primary" />}
    content={
      <div>
        <p className="text-xs font-semibold md:text-sm">Office Hours:</p>
        <p className="text-xs md:text-sm">
          Monday – Friday: 8:00AM – 5:00PM
          <br />
          Saturday: 8:00AM – 12:00NN
        </p>
      </div>
    }
    delay={0.4}
  />
);

const PhoneNumber: React.FC = () => (
  <InfoItem
    icon={<Phone className="w-4 h-4 md:w-5 md:h-5 text-primary" />}
    content={<p className="text-xs md:text-sm">0985 062 0281</p>}
    delay={0.6}
  />
);

const Email: React.FC = () => (
  <InfoItem
    icon={<Mail className="w-4 h-4 md:w-5 md:h-5 text-primary" />}
    content={
      <a
        href="mailto:customerservice@cjc.edu.ph"
        className="text-xs text-blue-600 md:text-sm hover:underline"
      >
        customerservice@cjc.edu.ph
      </a>
    }
    delay={0.8}
  />
);

const ActionButtons: React.FC = () => (
  <div className="grid w-full grid-cols-2 gap-2 pt-4 mt-2 md:mt-4">
    <Button className="w-full text-xs md:text-sm" variant="destructive">
      <PhoneCall className="w-4 h-4 mr-2" />
      <span>Contact Us</span>
    </Button>
    <DialogClose>
      <Button className="w-full text-xs md:text-sm" variant="secondary">
        Close
      </Button>
    </DialogClose>
  </div>
);

const CashierLocation: React.FC = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="overflow-hidden">
      <div className="relative">
        <div className="w-full p-4 md:p-0 h-[80vh] md:h-[400px] lg:h-[600px]">
          <MapEmbed />
        </div>
        <div className="absolute bottom-0 right-0 w-full p-4 space-y-2 bg-card md:w-3/5 lg:w-2/5 md:p-6 md:space-y-4 bg-opacity-90 rounded-xl">
          <Address />
          <OfficeHours />
          <PhoneNumber />
          <Email />
          <ActionButtons />
        </div>
      </div>
    </div>
  </motion.div>
);

const LocationButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <Button
    variant="link"
    onClick={onClick}
    className="-ml-4 decoration-primary-foreground"
  >
    <span className="inline-flex text-xs text-primary-foreground">
      Get Location <ArrowRightIcon className="w-4 h-4 ml-2" />
    </span>
  </Button>
);

export const CashierLocationDialog: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const handleOpen = React.useCallback(() => setOpen(true), []);

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <LocationButton onClick={handleOpen} />
        </DialogTrigger>
        <DialogContent className="max-w-5xl">
          <CashierLocation />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <LocationButton onClick={handleOpen} />
      </DrawerTrigger>
      <DrawerContent className="h-[85vh]">
        <CashierLocation />
      </DrawerContent>
    </Drawer>
  );
};
