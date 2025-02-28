
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  iconColor: string;
  iconBgColor: string;
  title: string;
  description: string;
}

export const FeatureCard = ({ icon: Icon, iconColor, iconBgColor, title, description }: FeatureCardProps) => {
  return (
    <div className="flex flex-col items-center text-center">
      <div className={`${iconBgColor} w-16 h-16 rounded-full flex items-center justify-center mb-6`}>
        <Icon className={`h-8 w-8 ${iconColor}`} />
      </div>
      <h3 className="text-xl font-bold text-white mb-4">
        {title}
      </h3>
      <p className="text-[#9E9E9E] text-base leading-relaxed">
        {description}
      </p>
    </div>
  );
};
