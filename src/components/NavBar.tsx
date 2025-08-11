import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const NavBar = () => {
  return (
    <div className="fixed top-0 left-0 w-full z-50 flex justify-center bg-[#e21833] px-3 py-4 gap-8">
      <FlyoutLink href="#home">Home</FlyoutLink>
      <FlyoutLink href="#recommended">Today's Recommended Meals</FlyoutLink>
      <FlyoutLink href="#Breakfast" FlyoutContent={TimeContent}>
        Time
      </FlyoutLink>
    </div>
  );
};

const FlyoutLink = ({
  children,
  href,
  FlyoutContent,
}: {
  children: React.ReactNode;
  href: string;
  FlyoutContent?: React.ElementType;
}) => {
  const [open, setOpen] = useState(false);

  const showFlyout = FlyoutContent && open;

  return (
    <div
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className="relative w-fit h-fit"
    >
      <a href={href} className="relative text-white">
        {children}
        <span
          style={{
            transform: showFlyout ? "scaleX(1)" : "scaleX(0)",
          }}
          className="absolute -bottom-2 -left-2 -right-2 h-1 origin-left scale-x-0 rounded-full bg-indigo-300 transition-transform duration-300 ease-out"
        />
      </a>
      <AnimatePresence>
        {showFlyout && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            style={{ translateX: "-50%" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute left-1/2 top-12 bg-white text-black"
          >
            <div className="absolute -top-6 left-0 right-0 h-6 bg-transparent" />
            <div className="absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-white" />
            <FlyoutContent />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const TimeContent = () => {
  return (
    <div className="w-64 bg-white p-6 shadow-xl">
      <div className="mb-3 space-y-3">
        <a href="#Breakfast" className="block text-sm hover:underline">
          Breakfast
        </a>
        <a href="#Lunch" className="block text-sm hover:underline">
          Lunch
        </a>
        <a href="#Dinner" className="block text-sm hover:underline">
          Dinner
        </a>
      </div>
    </div>
  );
};

export default NavBar;
