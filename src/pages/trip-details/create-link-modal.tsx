import { Tag, X } from "lucide-react";
import { Button } from "../../components/button";
import { FormEvent } from "react";
import { api } from "../../lib/axios";
import { useParams } from "react-router-dom";

interface CreateLinkModalProps {
  closeCreateLinkModal: () => void;
}

export function CreateLinkModal({
  closeCreateLinkModal,
}: CreateLinkModalProps) {
  const { tripId } = useParams();

  async function createActivity(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const title = data.get("title")?.toString();
    const url = data.get("url")?.toString();

    await api.post(`/trips/${tripId}/links`, {
      title,
      url,
    });

    window.document.location.reload();
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="font-lg font-semibold">Cadastrar link</h2>
            <button>
              <X
                className="size-5 text-zinc-400"
                onClick={closeCreateLinkModal}
              />
            </button>
          </div>

          <p className="text-sm text-zinc-400">
            Todos os convidados podem visualizar os links
          </p>
        </div>

        <form onSubmit={createActivity} className="space-y-3">
          <div className="px-4 flex-1 h-14 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <Tag className="text-zinc-400 size-5" />
            <input
              type="text"
              name="title"
              placeholder="Informe o título do link:"
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
            />
          </div>
          <div className="flex items-center gap-2">
            <div className="px-4 flex-1 h-14 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
              <Tag className="text-zinc-400 size-5" />
              <input
                type="text"
                name="url"
                placeholder="Informe a URL do link:"
                className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1 [color-scheme:dark]"
              />
            </div>
          </div>
          <Button variant="primary" size="full">
            Salvar link
          </Button>
        </form>
      </div>
    </div>
  );
}
