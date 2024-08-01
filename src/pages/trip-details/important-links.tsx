import { Link2, Plus } from "lucide-react";
import { Button } from "../../components/button";
import { useEffect, useState } from "react";
import { CreateLinkModal } from "./create-link-modal";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";

interface Link {
  title: string;
  url: string;
}

export function ImportantLinks() {
  const [isCreateLinkModalOpen, setIsCreateLinkModalOpen] = useState(false);
  const { tripId } = useParams();
  const [links, setLink] = useState<Link[]>([]);

  useEffect(() => {
    api
      .get(`/trips/${tripId}/links`)
      .then((response) => setLink(response.data.links));
  }, [tripId]);

  function openCreateLinkModal() {
    setIsCreateLinkModalOpen(true);
  }

  function closeCreateLinkModal() {
    setIsCreateLinkModalOpen(false);
  }

  function renderCreateLinkModal() {
    if (!isCreateLinkModalOpen) return null;

    return <CreateLinkModal closeCreateLinkModal={closeCreateLinkModal} />;
  }

  function renderLinks() {
    if (links.length === 0) return null;

    return links.map((link, index) => {
      return (
        <div
          key={`${link.url}-${index}`}
          className="flex items-center justify-between gap-4"
        >
          <div className="space-y-1.5 flex-1">
            <span className="block font-medium text-zinc-100">
              {link.title}
            </span>
            <a
              href="https://google.com/teste-de-url-com-bastante-texto-texto-texto"
              className="block text-xs text-zinc-400 truncate hover:text-zinc-200"
            >
              {link.url}
            </a>
          </div>
          <Link2 className="size-5 text-zinc-400" />
        </div>
      );
    });
  }

  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-xl">Links importantes</h2>
      <div className="space-y-5">{renderLinks()}</div>
      <Button variant="secondary" size="full" onClick={openCreateLinkModal}>
        <Plus className="size-5" />
        Cadastrar novo link
      </Button>
      {renderCreateLinkModal()}
    </div>
  );
}
