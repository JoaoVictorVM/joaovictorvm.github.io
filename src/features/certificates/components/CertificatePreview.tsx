import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { CertificateImage } from "@/features/certificates/data/certificates";
import { useFollowPointer } from "@/shared/hooks/useFollowPointer";
import { asset } from "@/shared/lib/asset";
import { cn } from "@/shared/lib/cn";

interface CertificatePreviewProps {
  /** Imagem do certificado em foco; `undefined` esconde o preview. */
  image: CertificateImage | undefined;
  /** Mouse sobre a lista: acompanha o cursor (mesmo sem preview visível). */
  isTracking: boolean;
}

/**
 * Card com a imagem do certificado em foco, seguindo o cursor. Decorativo: o
 * nome do certificado já está no texto da linha. Ao sair, mantém a última
 * imagem até o fade terminar. Vai direto no <body>: dentro de um ancestral com
 * `transform` (as animações de entrada), o `fixed` deixaria de ser relativo à tela.
 */
export function CertificatePreview({
  image,
  isTracking,
}: CertificatePreviewProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [lastImage, setLastImage] = useState(image);
  if (image && image !== lastImage) {
    setLastImage(image);
  }
  useFollowPointer(ref, isTracking);

  return createPortal(
    <div
      ref={ref}
      aria-hidden
      data-visible={image ? "" : undefined}
      // Acima do conteúdo e dos menus; abaixo do cursor personalizado (z-60).
      className="group pointer-events-none fixed top-0 left-0 z-50"
    >
      {lastImage && (
        <div
          className={cn(
            "origin-top-left scale-95 opacity-0 transition duration-200 group-data-visible:scale-100 group-data-visible:opacity-100 motion-reduce:transition-none",
            lastImage.kind === "certificate"
              ? "border-line w-80 overflow-hidden rounded-lg border"
              : "w-32",
          )}
        >
          <img
            src={asset(lastImage.src)}
            width={lastImage.width}
            height={lastImage.height}
            alt=""
            decoding="async"
            className="block h-auto w-full"
          />
        </div>
      )}
    </div>,
    document.body,
  );
}
