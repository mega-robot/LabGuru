import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ReactNode } from "react";

interface LabCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  to: string;
  gradient?: string;
}

export const LabCard = ({ title, description, icon, to }: LabCardProps) => {
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      onClick={() => navigate(to)}
      className="group cursor-pointer"
    >
      <div className="relative overflow-hidden rounded-3xl bg-card border border-border/50 p-8 shadow-soft transition-shadow duration-300 hover:shadow-float">
        {/* Subtle gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="relative z-10">
          {/* Icon container */}
          <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent text-accent-foreground transition-transform duration-300 group-hover:scale-110">
            {icon}
          </div>

          {/* Title */}
          <h3 className="font-serif text-2xl font-semibold text-foreground mb-3 transition-colors">
            {title}
          </h3>

          {/* Description */}
          <p className="text-muted-foreground leading-relaxed">
            {description}
          </p>

          {/* Arrow indicator */}
          <div className="mt-6 flex items-center text-primary font-medium">
            <span className="text-sm">Explore</span>
            <motion.svg
              className="ml-2 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              initial={{ x: 0 }}
              whileHover={{ x: 5 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </motion.svg>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
