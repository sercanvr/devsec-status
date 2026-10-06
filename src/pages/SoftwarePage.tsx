import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Code2, Layers, Database } from 'lucide-react';
import { HeaderShowcase } from '../components/HeaderShowcase';
import { TechTable } from '../components/TechTable';
import { ProximitySidebar } from '../components/ProximitySidebar';
import { TechEntry } from '../types/tech';

import rawLanguages from '../data/languages.json';
import rawFrameworks from '../data/frameworks.json';
import rawDatabases from '../data/databases.json';

export const SoftwarePage: React.FC = () => {
  const { t } = useTranslation();

  // Dynamically sort entries by totalStars descending for accurate ranking
  const sortedLanguages = useMemo(() => {
    return [...(rawLanguages as TechEntry[])].sort(
      (a, b) => b.popularity.totalStars - a.popularity.totalStars
    );
  }, []);

  const sortedFrameworks = useMemo(() => {
    return [...(rawFrameworks as TechEntry[])].sort(
      (a, b) => b.popularity.totalStars - a.popularity.totalStars
    );
  }, []);

  const sortedDatabases = useMemo(() => {
    return [...(rawDatabases as TechEntry[])].sort(
      (a, b) => b.popularity.totalStars - a.popularity.totalStars
    );
  }, []);

  const sections = [
    { id: 'section-languages', label: t('sections.languages') },
    { id: 'section-frameworks', label: t('sections.frameworks') },
    { id: 'section-databases', label: t('sections.databases') },
  ];

  return (
    <div className="space-y-4 relative">
      <ProximitySidebar sections={sections} />

      <HeaderShowcase mode="software" />

      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 space-y-12">
        <TechTable
          id="section-languages"
          title={t('sections.languages')}
          icon={<Code2 className="w-5 h-5" />}
          entries={sortedLanguages}
        />

        <TechTable
          id="section-frameworks"
          title={t('sections.frameworks')}
          icon={<Layers className="w-5 h-5" />}
          entries={sortedFrameworks}
        />

        <TechTable
          id="section-databases"
          title={t('sections.databases')}
          icon={<Database className="w-5 h-5" />}
          entries={sortedDatabases}
        />
      </div>
    </div>
  );
};
