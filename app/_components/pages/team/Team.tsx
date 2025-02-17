import React from 'react';
import type { TeamPayload } from '@/types';
import TeamHero from '@/app/_components/shared/heros/team-hero';
import TeamInsightsGrid from '@/app/_components/shared/blocks/team-insights-grid';
import MoreTeamMembers from '@/app/_components/shared/blocks/more-team-members';
import SchemaMarkup from '@/app/_components/global/SchemaMarkup/Component';

export interface TeamProps {
  data: TeamPayload | null;
}

function Team({ data }: TeamProps) {
  return (
    <>
      {/* SCHEMA MARKUP */}
      {data?.metaData?.schemaMarkup && (
        <SchemaMarkup schema={data.metaData.schemaMarkup} />
      )}

      <div className="mb-14">
        {/* Hero */}
        {data && <TeamHero {...data} />}

        {/* Team Insights */}
        {data && <TeamInsightsGrid slug={data.slug!} name={data.name} />}

        {/* More Team Members */}
        {data?.slug && <MoreTeamMembers currentMember={data.slug} />}
      </div>
    </>
  );
}

export default Team;
