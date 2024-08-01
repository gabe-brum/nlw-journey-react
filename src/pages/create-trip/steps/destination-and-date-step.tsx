import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  ArrowRight,
  Calendar,
  ChevronLeftIcon,
  ChevronRightIcon,
  MapPin,
  Settings2,
  X,
} from "lucide-react";
import { Button } from "../../../components/button";
import { useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

interface DestinationAndDateStepProps {
  isGuestsInputOpen: boolean;
  eventStartAndEndDates: DateRange | undefined;
  closeGuestsInput: () => void;
  openGuestsInput: () => void;
  setDestination: (destination: string) => void;
  setEventStartAndEndDates: (dates: DateRange | undefined) => void;
}

export function DestinationAndDateStep({
  closeGuestsInput,
  openGuestsInput,
  setDestination,
  setEventStartAndEndDates,
  eventStartAndEndDates,
  isGuestsInputOpen,
}: DestinationAndDateStepProps) {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const displayedDate =
    eventStartAndEndDates &&
    eventStartAndEndDates.from &&
    eventStartAndEndDates.to
      ? format(eventStartAndEndDates.from, "d' de 'LLL")
          .concat(" até ")
          .concat(format(eventStartAndEndDates.to, "d' de 'LLL"))
      : null;

  const today = new Date();

  function openDatePicker() {
    setIsDatePickerOpen(true);
  }

  function closeDatePicker() {
    setIsDatePickerOpen(false);
  }

  function renderGuestsInputButton() {
    if (isGuestsInputOpen) {
      return (
        <Button variant="secondary" onClick={closeGuestsInput}>
          Alterar local/data
          <Settings2 className="size-5" />
        </Button>
      );
    }

    return (
      <Button variant="primary" onClick={openGuestsInput}>
        Continuar
        <ArrowRight className="size-5" />
      </Button>
    );
  }

  function renderDatePickerModal() {
    if (!isDatePickerOpen) return null;

    return (
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
        <div className="rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Selecione a data</h2>
              <button type="button" onClick={closeDatePicker}>
                <X className="size-5 text-zinc-400" />
              </button>
            </div>
          </div>
          <DayPicker
            mode="range"
            locale={ptBR}
            showOutsideDays={true}
            selected={eventStartAndEndDates}
            onSelect={setEventStartAndEndDates}
            disabled={{ before: today }}
            classNames={{
              months:
                "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
              month: "space-y-4",
              caption: "flex justify-center pt-1 relative items-center",
              caption_label: "text-sm font-medium",
              nav: "space-x-1 flex items-center",
              nav_button:
                "h-7 w-7 hover:opacity-100 shadow-sm hover:bg-accent hover:text-accent-foreground flex justify-center items-center rounded-md",
              nav_button_previous: "absolute left-1",
              nav_button_next: "absolute right-1",
              head_row: "flex",
              head_cell: "w-8 font-normal text-[0.8rem]",
              row: "flex w-full mt-2",
              cell: "p-0",
              day: "h-8 w-8 p-0 ease-in-out hover:rounded-md aria-selected:bg-lime-300 aria-selected:text-lime-950 aria-selected:hover:rounded-none",
              day_range_start:
                "day-range-start rounded-l-md aria-selected:hover:rounded-l-md aria-selected:hover:bg-lime-500",
              day_range_end:
                "day-range-end rounded-r-md aria-selected:hover:rounded-r-md aria-selected:hover:bg-lime-500",
              day_today:
                "text-accent-foreground bg-zinc-950/95 rounded-md aria-selected:rounded-r-none",
              day_outside:
                "day-outside text-muted-foreground opacity-50 aria-selected:opacity-100 aria-selected:bg-lime-300 aria-selected:text-lime-950",
              day_disabled: "text-muted-foreground opacity-50",
              day_range_middle:
                "aria-selected:bg-lime-300/90 rounded-none aria-selected:hover:bg-lime-500",
            }}
            components={{
              IconLeft: () => <ChevronLeftIcon className="size-5" />,
              IconRight: () => <ChevronRightIcon className="size-5" />,
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
      <div className="flex items-center gap-2 flex-1">
        <MapPin className="size-5 text-zinc-400" />
        <input
          disabled={isGuestsInputOpen}
          type="text"
          placeholder="Para onde você vai?"
          className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
          onChange={(event) => setDestination(event.target.value)}
        />
      </div>

      <button
        disabled={isGuestsInputOpen}
        onClick={openDatePicker}
        className="flex items-center gap-2 outline-none text-left w-56"
      >
        <Calendar className="size-5 text-zinc-400" />
        <span className="text-lg text-zinc-400 w-40 flex-1">
          {displayedDate || "Quando?"}
        </span>
      </button>

      {renderDatePickerModal()}

      <div className="w-px h-6 bg-zinc-800" />
      {renderGuestsInputButton()}
    </div>
  );
}