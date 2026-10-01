import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Code2, Layers, Database } from 'lucide-react';
import { PageInfo } from '../components/PageInfo';
import { TechSection } from '../components/TechSection';
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

  return (
    <div className="space-y-4">
      <PageInfo
        title={t('nav.software')}
        description={t('info.software')}
        badge="Software Ecosystem"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <TechSection
          title={t('sections.languages')}
          icon={<Code2 className="w-5 h-5 text-[#CEFF00]" />}
          entries={sortedLanguages}
        />

        <TechSection
          title={t('sections.frameworks')}
          icon={<Layers className="w-5 h-5 text-[#CEFF00]" />}
          entries={sortedFrameworks}
        />

        <TechSection
          title={t('sections.databases')}
          icon={<Database className="w-5 h-5 text-[#CEFF00]" />}
          entries={sortedDatabases}
        />
      </div>
    </div>
  );
};
