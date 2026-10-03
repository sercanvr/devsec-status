import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ShieldCheck } from 'lucide-react';
import { PageInfo } from '../components/PageInfo';
import { TechSection } from '../components/TechSection';
import { ProximitySidebar } from '../components/ProximitySidebar';
import { TechEntry } from '../types/tech';

import rawSecurityTools from '../data/security-tools.json';

export const SecurityPage: React.FC = () => {
  const { t } = useTranslation();

  const sortedSecurityTools = useMemo(() => {
    return [...(rawSecurityTools as TechEntry[])].sort(
      (a, b) => b.popularity.totalStars - a.popularity.totalStars
    );
  }, []);

  const sections = [
    { id: 'section-security', label: t('sections.securityTools') },
  ];

  return (
    <div className="space-y-4 relative">
      <ProximitySidebar sections={sections} />

      <PageInfo
        title={t('nav.security')}
        description={t('info.security')}
        badge="Cybersecurity & SecOps"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <TechSection
          id="section-security"
          title={t('sections.securityTools')}
          icon={<ShieldCheck className="w-5 h-5 text-[#CEFF00]" />}
          entries={sortedSecurityTools}
        />
      </div>
    </div>
  );
};
