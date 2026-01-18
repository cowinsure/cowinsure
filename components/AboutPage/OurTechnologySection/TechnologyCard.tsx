'use client';
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface TechnologyCardProps {
  icon: LucideIcon;
  title: string;
  subtitle?: string;
  description: string;
  features?: string[];
  index: number;
  variant?: "default" | "accent" | "highlight";
}

const TechnologyCard = ({
  icon: Icon,
  title,
  subtitle,
  description,
  features,
  index,
  variant = "default",
}: TechnologyCardProps) => {
  const variants = {
    default: "bg-white border-gray-200",
    accent: "bg-gray-50 border-gray-200",
    highlight: "bg-white border-green-200 shadow-lg hover:shadow-xl",
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`group relative rounded-2xl border p-8 transition-all duration-300 ${variants[variant]}`}
    >
      {/* Icon Container */}
      <div className="mb-6 inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-green-500 to-green-600 shadow-md">
        <Icon className="w-7 h-7 text-white" />
      </div>

      {/* Title */}
      <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-2">
        {title}
      </h3>

      {/* Subtitle */}
      {subtitle && (
        <p className="text-sm font-medium text-green-700 mb-4">{subtitle}</p>
      )}

      {/* Description */}
      <p className="text-gray-600 leading-relaxed mb-6">{description}</p>

      {/* Features List */}
      {features && features.length > 0 && (
        <ul className="space-y-3">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0" />
              <span className="text-sm text-gray-600">{feature}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Hover Effect Border */}
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-green-300 transition-colors duration-300 pointer-events-none" />
    </motion.article>
  );
};

export default TechnologyCard;
