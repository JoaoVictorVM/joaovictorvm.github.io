export interface Certificate {
  id: string;
  institutionId: string;
  institution: string;
  title: {
    pt: string;
    en: string;
  };
  date: {
    pt: string;
    en: string;
  };
}

export interface CertificateGroup {
  institutionId: string;
  institution: string;
  certificates: Certificate[];
}

export const certificates: Certificate[] = [
  {
    id: "nlw-operator",
    institutionId: "rocketseat",
    institution: "Rocketseat",
    title: { pt: "NLW Operator - FullStack", en: "NLW Operator - FullStack" },
    date: { pt: "17/03/2026", en: "03/17/2026" },
  },
  {
    id: "nlw-pocket",
    institutionId: "rocketseat",
    institution: "Rocketseat",
    title: { pt: "NLW Pocket - FullStack", en: "NLW Pocket - FullStack" },
    date: { pt: "10/10/2025", en: "10/10/2025" },
  },
  {
    id: "introducao-csharp-dotnet",
    institutionId: "rocketseat",
    institution: "Rocketseat",
    title: { pt: "Introdução ao C# e .NET", en: "Introduction to C# & .NET" },
    date: { pt: "11/03/2026", en: "03/11/2026" },
  },
  {
    id: "microservices",
    institutionId: "rocketseat",
    institution: "Rocketseat",
    title: { pt: "Microsserviços Escaláveis", en: "Scalable Microservices" },
    date: { pt: "01/04/2026", en: "04/01/2026" },
  },
  {
    id: "frontend-uxui-design",
    institutionId: "origamid",
    institution: "Origamid",
    title: { pt: "Front-end & UX/UI Design", en: "Front-End & UX/UI Design" },
    date: { pt: "2026", en: "2026" },
  },
  {
    id: "html-css",
    institutionId: "origamid",
    institution: "Origamid",
    title: { pt: "HTML & CSS", en: "HTML & CSS" },
    date: { pt: "06/02/2026", en: "02/06/2026" },
  },
  {
    id: "jquery",
    institutionId: "origamid",
    institution: "Origamid",
    title: { pt: "JavaScript & jQuery", en: "JavaScript & jQuery" },
    date: { pt: "27/03/2026", en: "03/27/2026" },
  },
  {
    id: "css-flexbox",
    institutionId: "origamid",
    institution: "Origamid",
    title: { pt: "CSS Flexbox", en: "CSS Flexbox" },
    date: { pt: "11/02/2026", en: "02/11/2026" },
  },
  {
    id: "css-grid-layout",
    institutionId: "origamid",
    institution: "Origamid",
    title: { pt: "CSS Grid Layout", en: "CSS Grid Layout" },
    date: { pt: "20/02/2026", en: "02/20/2026" },
  },
  {
    id: "css-avancado",
    institutionId: "origamid",
    institution: "Origamid",
    title: { pt: "CSS Avançado", en: "Advanced CSS" },
    date: { pt: "27/02/2026", en: "02/27/2026" },
  },
  {
    id: "bootstrap",
    institutionId: "origamid",
    institution: "Origamid",
    title: { pt: "Bootstrap", en: "Bootstrap" },
    date: { pt: "13/03/2026", en: "03/13/2026" },
  },
  {
    id: "sass",
    institutionId: "origamid",
    institution: "Origamid",
    title: { pt: "CSS com SASS", en: "CSS with SASS" },
    date: { pt: "20/03/2026", en: "03/20/2026" },
  },
  {
    id: "tailwind-css",
    institutionId: "origamid",
    institution: "Origamid",
    title: { pt: "Tailwind CSS", en: "Tailwind CSS" },
    date: { pt: "06/03/2026", en: "03/06/2026" },
  },
];

export function groupCertificates(): CertificateGroup[] {
  const groups = new Map<string, CertificateGroup>();

  for (const certificate of certificates) {
    const existing = groups.get(certificate.institutionId);
    if (existing) {
      existing.certificates.push(certificate);
    } else {
      groups.set(certificate.institutionId, {
        institutionId: certificate.institutionId,
        institution: certificate.institution,
        certificates: [certificate],
      });
    }
  }

  return [...groups.values()];
}
