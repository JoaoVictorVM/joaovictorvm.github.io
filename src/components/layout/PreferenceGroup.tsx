import { useId, type ReactNode } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

interface PreferenceGroupProps<T extends string> {
  label: string;
  value: T;
  onValueChange: (value: T) => void;
  children: ReactNode;
}

interface PreferenceOptionProps {
  value: string;
  label: string;
  children: ReactNode;
}

export function PreferenceGroup<T extends string>({
  label,
  value,
  onValueChange,
  children,
}: PreferenceGroupProps<T>) {
  const labelId = useId();

  return (
    <div className="flex items-center justify-between gap-6 py-1 pr-1 pl-3">
      <DropdownMenu.Label id={labelId} className="text-detail">
        {label}
      </DropdownMenu.Label>
      <DropdownMenu.RadioGroup
        aria-labelledby={labelId}
        value={value}
        onValueChange={(next) => {
          // Os valores possíveis são exatamente os das opções filhas, todas do tipo T.
          onValueChange(next as T);
        }}
        className="flex items-center gap-1"
      >
        {children}
      </DropdownMenu.RadioGroup>
    </div>
  );
}

function PreferenceOption({ value, label, children }: PreferenceOptionProps) {
  return (
    <DropdownMenu.RadioItem
      value={value}
      aria-label={label}
      title={label}
      // Mantém o menu aberto para trocar idioma e tema sem reabrir.
      onSelect={(event) => {
        event.preventDefault();
      }}
      className="group text-detail data-highlighted:text-text aria-checked:border-text aria-checked:text-text flex size-9 cursor-pointer items-center justify-center rounded-full border border-transparent transition-colors"
    >
      {children}
    </DropdownMenu.RadioItem>
  );
}

PreferenceGroup.Option = PreferenceOption;
