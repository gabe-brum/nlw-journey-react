import { CircleCheck } from "lucide-react";
import { api } from "../../lib/axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface ActivityInfo {
  id: string;
  title: string;
  occurs_at: string;
}

interface Activity {
  date: string;
  activities: ActivityInfo[];
}

export function Activities() {
  const { tripId } = useParams();
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    api
      .get(`/trips/${tripId}/activities`)
      .then((response) => setActivities(response.data.activities));
  }, [tripId]);

  function renderActivitiesPerDate() {
    if (activities?.length === 0)
      return (
        <h2 className="uppercase text-3xl text-zinc-300">
          Nenhuma atividade cadastrada ainda.
        </h2>
      );

    return activities?.map((activity) => {
      return (
        <div key={activity.date} className="space-y-2.5">
          <div className="flex gap-2 items-baseline">
            <span className="text-zinc-300 text-xl font-semibold">
              Dia {format(activity.date, "d")}
            </span>
            <span className="text-zinc-500 text-xs">
              {format(activity.date, "EEEE", { locale: ptBR })}
            </span>
          </div>
          {renderActivitiesOfTheDate(activity.activities)}
        </div>
      );
    });
  }

  function renderActivitiesOfTheDate(activities: ActivityInfo[]) {
    if (activities.length === 0) {
      return (
        <p className="text-sm text-zinc-500">
          Nenhuma atividade cadastrada nessa data.
        </p>
      );
    }

    return activities.map((activity) => {
      return (
        <div
          key={activity.id}
          className="px-4 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex items-center gap-3"
        >
          <CircleCheck className="size-5 text-lime-300" />
          <span className="text-zinc-100">{activity.title}</span>
          <span className="text-zinc-400 text-sm ml-auto">
            {format(activity.occurs_at, "HH:mm", { locale: ptBR })}h
          </span>
        </div>
      );
    });
  }

  return <div className="space-y-8">{renderActivitiesPerDate()}</div>;
}
