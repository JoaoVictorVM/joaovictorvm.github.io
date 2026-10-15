import type { Certificate } from "@/features/certificates/data/certificates";
import { asset } from "@/shared/lib/asset";

/** Baixa as imagens de uma vez, para a troca no hover ser instantânea. */
export function preloadCertificateImages(list: readonly Certificate[]) {
  for (const certificate of list) {
    if (certificate.image) {
      new Image().src = asset(certificate.image.src);
    }
  }
}
