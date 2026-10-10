import React from 'react';
import {
  Cloud,
  ShieldCheck,
  FileCheck,
  Zap,
  SlidersHorizontal,
  MonitorSmartphone,
  EyeOff,
  Sparkles,
} from 'lucide-react';
import { getSiteConfig } from '../services/siteConfigService';

interface FeaturesProps {
  onGetStarted?: () => void;
}

export const Features: React.FC<FeaturesProps> = () => {

  const featureCards = [
    {
      title: 'Cloud-First Workflow',
      tag: 'Cloud-First',
      description:
        'Seamlessly import files straight from Google Drive or cloud storage, merge in real time, and save back instantly to your workspace.',
      highlight: 'Google Workspace Ready',
      icon: Cloud,
      iconBg: 'bg-[#e0f2fe]',
      iconColor: 'text-[#0284c7]',
    },
    {
      title: 'Enterprise-Grade Security',
      tag: 'Enterprise Security',
      description:
        'Documents are protected with client-side 256-bit encryption. Strict zero-storage architecture complies with corporate compliance standards.',
      highlight: 'ISO 27001 & HIPAA Aligned',
      icon: ShieldCheck,
      iconBg: 'bg-[#e8f7f6]',
      iconColor: 'text-[#0a5255]',
    },
    {
      title: 'Verified Signatures & Standards',
      tag: 'Verified Signatures',
      description:
        'Preserves digital signatures, embedded font glyphs, and ISO 32000-2 archival PDF/A fidelity without file degradation or tampering.',
      highlight: 'Cryptographic Integrity',
      icon: FileCheck,
      iconBg: 'bg-[#ede9fe]',
      iconColor: 'text-[#7c3aed]',
    },
    {
      title: 'High-Performance Scalability',
      tag: 'Scalability',
      description:
        'Engineered to combine dozens of multi-megabyte PDFs or massive documents in seconds with multi-threaded, low-latency processing.',
      highlight: 'Sub-Second Speed',
      icon: Zap,
      iconBg: 'bg-[#ffedd5]',
      iconColor: 'text-[#c2410c]',
    },
    {
      title: 'Precision Page Organization',
      tag: 'Visual Control',
      description:
        'Take full command of your documents. Reorder pages, rotate orientations, remove blank sheets, and preview each sheet interactively.',
      highlight: 'Intuitive Drag & Drop',
      icon: SlidersHorizontal,
      iconBg: 'bg-[#fce7f3]',
      iconColor: 'text-[#be185d]',
    },
    {
      title: 'Universal Device Access',
      tag: 'Cross-Platform',
      description:
        'Merge documents across macOS, Windows, iPhone, Android, and Linux directly in your browser with zero plugins or installation required.',
      highlight: 'Zero Software Install',
      icon: MonitorSmartphone,
      iconBg: 'bg-[#e0e7ff]',
      iconColor: 'text-[#4338ca]',
    },
    {
      title: 'Zero Data Retention',
      tag: '100% Privacy',
      description:
        'Files are processed in temporary browser memory and never uploaded to remote servers. All session data is immediately discarded upon closing.',
      highlight: 'Client-Memory Only',
      icon: EyeOff,
      iconBg: 'bg-[#f3f4f6]',
      iconColor: 'text-[#374151]',
    },
    {
      title: 'Seamless User Experience',
      tag: 'User Experience',
      description:
        'A clean, modern interface designed for speed and simplicity. Merge multiple PDFs in one click and preview or download immediately.',
      highlight: 'Frictionless Workflow',
      icon: Sparkles,
      iconBg: 'bg-[#ccfbf1]',
      iconColor: 'text-[#0f766e]',
    },
  ];

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-950 mb-4 font-['Plus_Jakarta_Sans']">
          {getSiteConfig().seo.h2 || 'Combine Multiple PDF Files into One Document'}
        </h2>
        <p className="text-base sm:text-lg text-gray-600 font-normal leading-relaxed">
          Engineered for security, scalability, and seamless user experience. Merge PDFs effortlessly with our fast, free tool. Combine multiple files into one organized document in just a few clicks without compromising privacy.
        </p>
      </div>

      {/* 8 Feature Cards Grid matching Screenshot */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {featureCards.map((card, index) => {
          const IconComponent = card.icon;
          return (
            <div
              key={card.title}
              className="bg-[#fcfbf9] border border-[#f1ece5] rounded-3xl p-6 sm:p-7 flex flex-col justify-between hover:bg-white hover:border-gray-300 hover:shadow-lg transition-all duration-300 group relative"
            >
              <div>
                {/* Icon & Category Tag */}
                <div className="flex items-center justify-between mb-5">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center ${card.iconBg} ${card.iconColor} shadow-2xs group-hover:scale-105 transition-transform duration-300`}
                  >
                    <IconComponent className="w-6 h-6 stroke-[2]" />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#7a8b9e] font-['Plus_Jakarta_Sans']">
                    {card.tag}
                  </span>
                </div>

                {/* Card Title */}
                <h3 className="text-lg font-bold text-gray-950 mb-2 font-['Plus_Jakarta_Sans'] group-hover:text-black">
                  {card.title}
                </h3>

                {/* Card Description */}
                <p className="text-sm text-gray-600 leading-relaxed font-normal mb-6">
                  {card.description}
                </p>
              </div>

              {/* Bottom Card Footer */}
              <div className="pt-3.5 border-t border-gray-200/70 flex items-center justify-between">
                <span className="text-[11px] font-semibold text-gray-500 group-hover:text-gray-800 transition-colors">
                  {card.highlight}
                </span>
                <span className="text-xs text-gray-400 font-mono">0{index + 1}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
