"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
  MotionValue,
} from "framer-motion";
import {
  Children,
  cloneElement,
  isValidElement,
  ReactElement,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Home,
  User,
  Briefcase,
  GraduationCap,
  FolderOpen,
  Settings,
  Mail,
  LucideIcon,
} from "lucide-react";

// ===== Types =====
interface DockItemProps {
  children: ReactNode;
  onClick?: () => void;
  mouseX: MotionValue<number>;
  spring: { mass: number; stiffness: number; damping: number };
  distance: number;
  magnification: number;
  baseItemSize: number;
  isMobile: boolean;
}

interface DockLabelProps {
  children: ReactNode;
  isHovered?: MotionValue<number>;
}

interface DockIconProps {
  children: ReactNode;
}

// ===== Sub-Components =====

function DockItem({
  children,
  onClick,
  mouseX,
  spring,
  distance,
  magnification,
  baseItemSize,
  isMobile,
}: DockItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isHovered = useMotionValue(0);

  const mouseDistance = useTransform(mouseX, (val) => {
    const rect = ref.current?.getBoundingClientRect() ?? {
      x: 0,
      width: baseItemSize,
    };
    return val - rect.x - baseItemSize / 2;
  });

  const targetSize = useTransform(
    mouseDistance,
    [-distance, 0, distance],
    [baseItemSize, isMobile ? baseItemSize : magnification, baseItemSize]
  );

  const size = useSpring(targetSize, spring);

  return (
    <motion.div
      ref={ref}
      style={{ width: size, height: size }}
      onHoverStart={() => !isMobile && isHovered.set(1)}
      onHoverEnd={() => !isMobile && isHovered.set(0)}
      onTap={onClick}
      onClick={!isMobile ? onClick : undefined}
      tabIndex={0}
      role="button"
      className="relative flex items-center justify-center rounded-xl bg-white/60 hover:bg-white/90 backdrop-blur-sm cursor-pointer transition-colors flex-shrink-0"
    >
      {Children.map(children, (child) =>
        isValidElement(child)
          ? cloneElement(child as ReactElement<DockLabelProps>, { isHovered })
          : child
      )}
    </motion.div>
  );
}

function DockLabel({ children, isHovered }: DockLabelProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isHovered) return;
    return isHovered.on("change", (latest) => setIsVisible(latest === 1));
  }, [isHovered]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: -45 }}
          exit={{ opacity: 0, y: 0 }}
          transition={{ duration: 0.2 }}
          style={{ left: "50%", x: "-50%" }}
          className="absolute -top-1 px-3 py-1 text-xs font-medium bg-black/90 text-white rounded-md whitespace-nowrap pointer-events-none border border-gray-700 shadow-lg"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function DockIcon({ children }: DockIconProps) {
  return (
    <div className="text-gray-800 flex items-center justify-center w-full h-full">
      {children}
    </div>
  );
}

// ===== Main Dock Component =====

export interface DockProps {
  onHomeClick: () => void;
  onProfileClick: () => void;
  onExperienceClick: () => void;
  onEducationClick: () => void;
  onProjectsClick: () => void;
  onSkillsClick: () => void;
  onContactClick: () => void;
}

interface DockMenuItem {
  label: string;
  Icon: LucideIcon;
  onClick: () => void;
}

export default function Dock({
  onHomeClick,
  onProfileClick,
  onExperienceClick,
  onEducationClick,
  onProjectsClick,
  onSkillsClick,
  onContactClick,
}: DockProps) {
  const [isMobile, setIsMobile] = useState(false);
  const mouseX = useMotionValue(Infinity);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const spring = isMobile
    ? { mass: 0.1, stiffness: 100, damping: 15 }
    : { mass: 0.1, stiffness: 150, damping: 12 };

  const baseItemSize = isMobile ? 40 : 48;
  const magnification = isMobile ? 40 : 70;
  const distance = isMobile ? 150 : 180;
  const iconSize = isMobile ? 20 : 22;

  const items: DockMenuItem[] = [
    { label: "Home", Icon: Home, onClick: onHomeClick },
    { label: "Profile", Icon: User, onClick: onProfileClick },
    { label: "Experience", Icon: Briefcase, onClick: onExperienceClick },
    { label: "Education", Icon: GraduationCap, onClick: onEducationClick },
    { label: "Projects", Icon: FolderOpen, onClick: onProjectsClick },
    { label: "Skills", Icon: Settings, onClick: onSkillsClick },
    { label: "Contact", Icon: Mail, onClick: onContactClick },
  ];

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 1.2, ease: "easeOut" }}
      className="fixed bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-auto"
    >
      <motion.div
        onMouseMove={(e) => !isMobile && mouseX.set(e.pageX)}
        onMouseLeave={() => !isMobile && mouseX.set(Infinity)}
        className="flex items-end gap-2 md:gap-3 px-4 md:px-6 py-2.5 md:py-3 rounded-3xl bg-gray-400/60 backdrop-blur-md border border-white/30 shadow-xl"
        role="toolbar"
      >
        {items.map((item) => (
          <DockItem
            key={item.label}
            onClick={item.onClick}
            mouseX={mouseX}
            spring={spring}
            distance={distance}
            magnification={magnification}
            baseItemSize={baseItemSize}
            isMobile={isMobile}
          >
            <DockIcon>
              <item.Icon size={iconSize} strokeWidth={2.2} />
            </DockIcon>
            <DockLabel>{item.label}</DockLabel>
          </DockItem>
        ))}
      </motion.div>
    </motion.div>
  );
}