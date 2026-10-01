import React from 'react';
import { useTranslation } from 'react-i18next';
import { ShieldCheck } from 'lucide-react';
import { PageInfo } from '../components/PageInfo';
import { TechSection } from '../components/TechSection';
import { TechEntry } from '../types/tech';

import rawSecurityTools from '../data/security-tools.json';

const securityToolsData = rawSecurityTools as TechEntry[];

export const SecurityPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      <PageInfo
        title={t('nav.security')}
        description={t('info.security')}
        badge="Cybersecurity & SecOps"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <TechSection
          title={t('sections.securityTools')}
          icon={<ShieldCheck className="w-5 h-5 text-emerald-400" />}
          entries={securityToolsData}
        />
      </div>
    </div>
  );
};
