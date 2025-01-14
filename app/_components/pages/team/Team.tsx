import React from 'react';
import type { TeamPayload } from '@/types';
import TeamHero from '@/app/_components/shared/heros/team-hero';
import TeamInsightsGrid from '@/app/_components/shared/blocks/team-insights-grid';
import MoreTeamMembers from '@/app/_components/shared/blocks/more-team-members';

export interface TeamProps {
  data: TeamPayload | null;
}

function Team({ data }: TeamProps) {
  return (
    <div>
      <div className="mb-14">
        {/* Hero */}
        {data && <TeamHero {...data} />}

        {/* Team Insights */}
        {data && <TeamInsightsGrid slug={data.slug!} name={data.name} />}

        {/* More Team Members */}
        {data?.slug && <MoreTeamMembers currentMember={data.slug} />}
      </div>
    </div>
  );
}

export default Team;
