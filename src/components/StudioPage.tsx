import React from 'react';
import { MergeTool } from './MergeTool';

interface StudioPageProps {
  onGoToMerge?: () => void;
  onPreviewPdf: (url: string, name: string) => void;
}

export const StudioPage: React.FC<StudioPageProps> = ({ onPreviewPdf }) => {
  return (
    <div className="py-6 sm:py-10 animate-in fade-in duration-200">
      <MergeTool
        onPreviewPdf={onPreviewPdf}
        hideHeaderTitle={false}
        embedded={false}
      />
    </div>
  );
};
