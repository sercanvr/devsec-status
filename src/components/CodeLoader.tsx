import React from 'react';

interface CodeLoaderProps {
  className?: string;
}

export const CodeLoader: React.FC<CodeLoaderProps> = ({ className = '' }) => {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading content"
      className={`fixed inset-0 z-[1050] flex items-center justify-center bg-black/75 backdrop-blur-md animate-fade-in pointer-events-auto ${className}`}
    >
      <div className="code-loader">
        <span>{'{'}</span>
        <span>{'}'}</span>
      </div>
    </div>
  );
};

export default CodeLoader;
