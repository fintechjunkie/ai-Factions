'use client';

import { Faction } from '@/lib/types';
import { FACTION_ICONS } from '@/lib/icons';
import FactionDetail from './FactionDetail';
import DetailModal from '@/components/shared/DetailModal';

interface FactionModalProps {
  faction: Faction;
  onClose: () => void;
}

export default function FactionModal({ faction, onClose }: FactionModalProps) {
  const icon = FACTION_ICONS[faction.id];

  return (
    <DetailModal
      title={faction.name}
      subtitle={`${faction.code} · ${faction.category} · ${faction.posture}`}
      emoji={icon?.emoji || '⚡'}
      color={faction.color}
      onClose={onClose}
    >
      <FactionDetail faction={faction} />
    </DetailModal>
  );
}
