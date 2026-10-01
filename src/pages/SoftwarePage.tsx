import React from 'react';
import { useTranslation } from 'react-i18next';
import { Code2, Layers } from 'lucide-react';
import { PageInfo } from '../components/PageInfo';
import { TechSection } from '../components/TechSection';
import { TechEntry } from '../types/tech';

import rawLanguages from '../data/languages.json';
import rawFrameworks from '../data/frameworks.json';

const languagesData = rawLanguages as TechEntry[];
const frameworksData = rawFrameworks as TechEntry[];

export const SoftwarePage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      <PageInfo
        title={t('nav.software')}
        description={t('info.software')}
        badge="Software Ecosystem"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <TechSection
          title={t('sections.languages')}
          icon={<Code2 className="w-5 h-5" />}
          entries={languagesData}
        />

        <TechSection
          title={t('sections.frameworks')}
          icon={<Layers className="w-5 h-5" />}
          entries={frameworksData}
        />
      </div>
    </div>
  );
};
