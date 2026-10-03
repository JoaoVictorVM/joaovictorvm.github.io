import { Brand } from "@/components/layout/Brand";
import { Container } from "@/components/layout/Container";

export function Header() {
  return (
    <header className="header-enter border-line bg-bg border-b">
      <Container>
        <div className="text-text flex items-center justify-between gap-4 py-4 text-xs">
          <Brand />
          {/* Reserva o espaço do menu de preferências, que flutua por cima (PreferencesDock). */}
          <div aria-hidden className="size-9 shrink-0" />
        </div>
      </Container>
    </header>
  );
}
