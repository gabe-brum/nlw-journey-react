import { Plus } from "lucide-react";
import { useState } from "react";
import { CreateActivityModal } from "./create-activity-modal";
import { ImportantLinks } from "./important-links";
import { Guests } from "./guests";
import { Activities } from "./activities";
import { DestinationAndDateHeader } from "./destination-and-date-header";
import { Button } from "../../components/button";

export function TripDetailsPage() {
  const [isCreateActivityModalOpen, setIsCreateActivityModalOpen] =
    useState(false);

  function openCreateActivityModal() {
    setIsCreateActivityModalOpen(true);
  }

  function closeCreateActivityModal() {
    setIsCreateActivityModalOpen(false);
  }

  function renderCreateActivityModal() {
    if (!isCreateActivityModalOpen) return null;

    return (
      <CreateActivityModal
        closeCreateActivityModal={closeCreateActivityModal}
      />
    );
  }

  return (
    <div className="max-w-6xl py-10 px-6 mx-auto space-y-8">
      <DestinationAndDateHeader />
      <main className="flex gap-16 px-4">
        <div className="flex-1 space-y-6">
          <header className="flex items-center justify-between">
            <h2 className="text-3xl font-semibold">Atividades</h2>
            <Button variant="primary" onClick={openCreateActivityModal}>
              <Plus className="size-5" />
              Cadastrar atividade
            </Button>
          </header>
          <Activities />
        </div>
        <aside className="w-80 space-y-6">
          <ImportantLinks />
          <div className="w-full h-px bg-zinc-800" />
          <Guests />
        </aside>
      </main>
      {renderCreateActivityModal()}
    </div>
  );
}
