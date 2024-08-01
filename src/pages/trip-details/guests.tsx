import { CircleDashed, CircleCheck, UserCog } from "lucide-react";
import { Button } from "../../components/button";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";

interface Participant {
  id: string;
  name: string | null;
  email: string;
  is_confirmed: boolean;
}

export function Guests() {
  const { tripId } = useParams();
  const [participants, setParticipants] = useState<Participant[]>([]);

  useEffect(() => {
    api
      .get(`/trips/${tripId}/participants`)
      .then((response) => setParticipants(response.data.participants));
  }, [tripId]);

  function renderParticipants() {
    if (participants.length === 0) return null;

    return participants.map((participant, index) => {
      return (
        <div
          className="flex items-center justify-between gap-4"
          key={participant.id}
        >
          <div className="space-y-1.5 flex-1">
            <span className="block font-medium text-zinc-100">
              {participant.name || `Convidado ${index}`}
            </span>
            <span className="block text-sm text-zinc-400 truncate">
              {participant.email}
            </span>
          </div>
          {renderParticipantIcon(participant.is_confirmed)}
        </div>
      );
    });
  }

  function renderParticipantIcon(isConfirmed: boolean) {
    if (isConfirmed) return <CircleCheck className="size-5 text-lime-400" />;

    return <CircleDashed className="size-5 text-zinc-400" />;
  }

  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-xl">Convidados</h2>
      <div className="space-y-5">{renderParticipants()}</div>
      <Button variant="secondary" size="full">
        <UserCog className="size-5" />
        Gerenciar convidados
      </Button>
    </div>
  );
}
