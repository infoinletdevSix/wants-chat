import React from 'react';
import { useTranslation } from 'react-i18next';
import { LucideIcon } from 'lucide-react';

interface ToolContainerProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  children: React.ReactNode;
  className?: string;
}

export const ToolContainer: React.FC<ToolContainerProps> = ({
  title,
  description,
  icon: Icon,
  children,
  className = '',
}) => {
  const { t } = useTranslation();
  return (
    <div
      className={`w-full max-w-4xl mx-auto bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-700 ${className}`}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-[#6096B4]/20 to-[#6096B4]/10 border-b border-gray-700 px-6 py-4">
        <div className="flex items-center gap-3">
          {Icon && (
            <div className="p-2 bg-[#6096B4]/20 rounded-lg border border-[#6096B4]/30">
              <Icon className="w-6 h-6 text-[#6096B4]" />
            </div>
          )}
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-white">{title}</h2>
            {description && (
              <p className="text-sm text-gray-400 mt-1">{description}</p>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {children}
      </div>

      {/* Decorative gradient border */}
      <div className="h-1 bg-gradient-to-r from-transparent via-[#6096B4] to-transparent opacity-50" />
    </div>
  );
};
