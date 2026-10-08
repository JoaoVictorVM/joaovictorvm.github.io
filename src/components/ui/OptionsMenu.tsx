import { useId, type ReactNode } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Check } from "lucide-react";
import { iconButtonClassName } from "@/components/ui/iconButton";
import { cn } from "@/shared/lib/cn";

interface OptionsMenuProps {
  /** Nome acessível do botão (inclua o estado, ex.: "filtros ativos"). */
  label: string;
  icon: ReactNode;
  /** Mostra um ponto no botão: há opções fora do padrão. */
  hasActiveOptions: boolean;
  children: ReactNode;
}

interface OptionsMenuGroupProps<T extends string> {
  label: string;
  value: T;
  onValueChange: (value: T) => void;
  children: ReactNode;
}

interface OptionsMenuOptionProps {
  value: string;
  children: ReactNode;
}

/**
 * Menu de opções em grupos de escolha única (ex.: filtro e ordenação de uma
 * lista), no visual do menu de preferências. Composição:
 * `<OptionsMenu>` → `<OptionsMenu.Group>` → `<OptionsMenu.Option>`, com
 * `<OptionsMenu.Separator>` entre grupos.
 */
export function OptionsMenu({
  label,
  icon,
  hasActiveOptions,
  children,
}: OptionsMenuProps) {
  return (
    // Não modal, como o de preferências: o modal trava o scroll e compensa a
    // barra de rolagem no body.
    <DropdownMenu.Root modal={false}>
      <DropdownMenu.Trigger
        aria-label={label}
        title={label}
        className={cn(iconButtonClassName, "relative")}
      >
        {icon}
        {hasActiveOptions && (
          <span
            aria-hidden
            className="bg-text absolute top-1.5 right-1.5 size-1.5 rounded-full"
          />
        )}
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="end"
          sideOffset={6}
          collisionPadding={8}
          className="border-line bg-bg text-text z-50 min-w-48 rounded-lg border p-1 text-xs"
        >
          {children}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

function OptionsMenuGroup<T extends string>({
  label,
  value,
  onValueChange,
  children,
}: OptionsMenuGroupProps<T>) {
  const labelId = useId();

  return (
    <div>
      <DropdownMenu.Label id={labelId} className="text-detail px-3 py-1.5">
        {label}
      </DropdownMenu.Label>
      <DropdownMenu.RadioGroup
        aria-labelledby={labelId}
        value={value}
        onValueChange={(next) => {
          // Os valores possíveis são exatamente os das opções filhas, todas do tipo T.
          onValueChange(next as T);
        }}
      >
        {children}
      </DropdownMenu.RadioGroup>
    </div>
  );
}

function OptionsMenuOption({ value, children }: OptionsMenuOptionProps) {
  return (
    <DropdownMenu.RadioItem
      value={value}
      // Mantém o menu aberto para combinar opções sem reabrir.
      onSelect={(event) => {
        event.preventDefault();
      }}
      className="text-detail data-highlighted:text-text aria-checked:text-text flex cursor-pointer items-center justify-between gap-6 rounded px-3 py-2 transition-colors outline-none"
    >
      {children}
      <DropdownMenu.ItemIndicator>
        <Check size={14} aria-hidden />
      </DropdownMenu.ItemIndicator>
    </DropdownMenu.RadioItem>
  );
}

function OptionsMenuSeparator() {
  return <DropdownMenu.Separator className="bg-line mx-2 my-1 h-px" />;
}

OptionsMenu.Group = OptionsMenuGroup;
OptionsMenu.Option = OptionsMenuOption;
OptionsMenu.Separator = OptionsMenuSeparator;
