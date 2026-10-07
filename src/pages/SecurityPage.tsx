import React, { useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ShieldCheck, Terminal } from 'lucide-react';
import { HeaderShowcase } from '../components/HeaderShowcase';
import { TechTable } from '../components/TechTable';
import { ProximitySidebar } from '../components/ProximitySidebar';
import { TechEntry } from '../types/tech';
import { highlightWithRetry } from '../lib/highlight';

import rawSecurityTools from '../data/security-tools.json';
import rawSecurityDistros from '../data/security-distros.json';

export const SecurityPage: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    const stateTarget = (location.state as { targetId?: string })?.targetId;
    const hashTarget = location.hash ? location.hash.replace('#', '') : null;
    const targetId = stateTarget || hashTarget;
    if (targetId) {
      highlightWithRetry(targetId);
    }
  }, [location]);

  const sortedSecurityTools = useMemo(() => {
    return [...(rawSecurityTools as TechEntry[])].sort(
      (a, b) => b.popularity.totalStars - a.popularity.totalStars
    );
  }, []);

  const sortedSecurityDistros = useMemo(() => {
    return [...(rawSecurityDistros as TechEntry[])].sort(
      (a, b) => b.popularity.totalStars - a.popularity.totalStars
    );
  }, []);

  const sections = [
    { id: 'section-security', label: t('sections.securityTools') },
    { id: 'section-security-distros', label: t('sections.securityDistros') },
  ];

  return (
    <div className="space-y-4 relative">
      <ProximitySidebar sections={sections} />

      <HeaderShowcase mode="security" />

      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 space-y-12">
        <TechTable
          id="section-security"
          title={t('sections.securityTools')}
          icon={<ShieldCheck className="w-5 h-5" />}
          entries={sortedSecurityTools}
        />

        <TechTable
          id="section-security-distros"
          title={t('sections.securityDistros')}
          icon={<Terminal className="w-5 h-5" />}
          entries={sortedSecurityDistros}
        />
      </div>
    </div>
  );
};
