import { Funnel } from "lucide-react";
import { OptionsMenu } from "@/components/ui/OptionsMenu";
import {
  certificateAreas,
  certificateGroupings,
  certificateSorts,
  type CertificateArea,
  type CertificateGrouping,
  type CertificateSort,
} from "@/features/certificates/data/certificates";
import type { CertificateView } from "@/features/certificates/hooks/useCertificateView";
import { useI18n } from "@/shared/hooks/useI18n";

type FilterOption = CertificateArea | "all";

const filterOptions: FilterOption[] = ["all", ...certificateAreas];

interface CertificateControlsProps {
  view: CertificateView;
}

/** Botão de filtro, ordenação e agrupamento da página de certificados. */
export function CertificateControls({ view }: CertificateControlsProps) {
  const t = useI18n().certificates.controls;

  return (
    <OptionsMenu
      label={view.isDefault ? t.label : t.activeLabel}
      icon={<Funnel size={16} aria-hidden />}
      hasActiveOptions={!view.isDefault}
    >
      <OptionsMenu.Group<FilterOption>
        label={t.filter}
        value={view.filter ?? "all"}
        onValueChange={(next) => {
          view.setFilter(next === "all" ? undefined : next);
        }}
      >
        {filterOptions.map((option) => (
          <OptionsMenu.Option key={option} value={option}>
            {t.filters[option]}
          </OptionsMenu.Option>
        ))}
      </OptionsMenu.Group>
      <OptionsMenu.Separator />
      <OptionsMenu.Group<CertificateSort>
        label={t.sort}
        value={view.sort}
        onValueChange={view.setSort}
      >
        {certificateSorts.map((option) => (
          <OptionsMenu.Option key={option} value={option}>
            {t.sorts[option]}
          </OptionsMenu.Option>
        ))}
      </OptionsMenu.Group>
      <OptionsMenu.Separator />
      <OptionsMenu.Group<CertificateGrouping>
        label={t.group}
        value={view.grouping}
        onValueChange={view.setGrouping}
      >
        {certificateGroupings.map((option) => (
          <OptionsMenu.Option key={option} value={option}>
            {t.groupings[option]}
          </OptionsMenu.Option>
        ))}
      </OptionsMenu.Group>
    </OptionsMenu>
  );
}
