import React, { useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Code2, Layers, Database, Terminal, Bot, Cpu } from 'lucide-react';
import { HeaderShowcase } from '../components/HeaderShowcase';
import { TechTable } from '../components/TechTable';
import { ProximitySidebar } from '../components/ProximitySidebar';
import { TechEntry } from '../types/tech';
import { highlightWithRetry } from '../lib/highlight';

import rawLanguages from '../data/languages.json';
import rawFrameworks from '../data/frameworks.json';
import rawDatabases from '../data/databases.json';
import rawLinuxDistros from '../data/linux-distros.json';
import rawAiTools from '../data/ai-tools.json';
import rawAiInfrastructure from '../data/ai-infrastructure.json';

export const SoftwarePage: React.FC = () => {
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

  const sortedLinuxDistros = useMemo(() => {
    return [...(rawLinuxDistros as TechEntry[])].sort(
      (a, b) => b.popularity.totalStars - a.popularity.totalStars
    );
  }, []);

  const sortedAiTools = useMemo(() => {
    return [...(rawAiTools as TechEntry[])].sort(
      (a, b) => b.popularity.totalStars - a.popularity.totalStars
    );
  }, []);

  const sortedAiInfrastructure = useMemo(() => {
    return [...(rawAiInfrastructure as TechEntry[])].sort(
      (a, b) => b.popularity.totalStars - a.popularity.totalStars
    );
  }, []);

  const sections = [
    { id: 'section-languages', label: t('sections.languages') },
    { id: 'section-frameworks', label: t('sections.frameworks') },
    { id: 'section-databases', label: t('sections.databases') },
    { id: 'section-linux-distros', label: t('sections.linuxDistros') },
    { id: 'section-ai-tools', label: t('sections.aiTools') },
    { id: 'section-ai-infrastructure', label: t('sections.aiInfrastructure') },
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

        <TechTable
          id="section-linux-distros"
          title={t('sections.linuxDistros')}
          icon={<Terminal className="w-5 h-5" />}
          entries={sortedLinuxDistros}
        />

        <TechTable
          id="section-ai-tools"
          title={t('sections.aiTools')}
          icon={<Bot className="w-5 h-5" />}
          entries={sortedAiTools}
        />

        <TechTable
          id="section-ai-infrastructure"
          title={t('sections.aiInfrastructure')}
          icon={<Cpu className="w-5 h-5" />}
          entries={sortedAiInfrastructure}
        />
      </div>
    </div>
  );
};
