import { ArrowRight, UserRoundPlus } from "lucide-react";
import { Button } from "../../../components/button";

interface InviteGuestsStepProps {
  emailsToInvite: string[];
  openGuestsModal: () => void;
  openConfirmTripModal: () => void;
}

export function InviteGuestsStep({
  emailsToInvite,
  openConfirmTripModal,
  openGuestsModal,
}: InviteGuestsStepProps) {
  function renderInvitedPeople() {
    if (emailsToInvite.length === 0)
      return (
        <span className="text-zinc-400 text-lg flex-1">
          Quem estará na viagem?
        </span>
      );

    const invitedPeople = emailsToInvite.length;
    return (
      <span className="text-zinc-100 text-lg flex-1">
        {`${invitedPeople} pessoa(s) convidada(s)`}
      </span>
    );
  }

  return (
    <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
      <button
        type="button"
        onClick={openGuestsModal}
        className="flex items-center gap-2 flex-1 text-left"
      >
        <UserRoundPlus className="size-5 text-zinc-400" />
        {renderInvitedPeople()}
      </button>

      <div className="w-px h-6 bg-zinc-800" />

      <Button variant="primary" onClick={openConfirmTripModal}>
        Confirmar viagem
        <ArrowRight className="size-5" />
      </Button>
    </div>
  );
}
