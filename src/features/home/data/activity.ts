/** Item de "Estudando" / "Lendo" na seção de atividade, editado à mão. */
export interface ActivityItem {
  title: {
    pt: string;
    en: string;
  };
  /** Linha de apoio abaixo do título (curso, autor). */
  detail: {
    pt: string;
    en: string;
  };
}

export const studying: ActivityItem = {
  title: {
    pt: "Segurança de Sistemas para Internet",
    en: "Internet Systems Security",
  },
  detail: {
    pt: "Matéria da graduação em Cibersegurança",
    en: "Course in my Cybersecurity degree",
  },
};

export const reading: ActivityItem = {
  title: { pt: "Competente o Suficiente", en: "Competente o Suficiente" },
  detail: { pt: "Fábio Akita", en: "Fábio Akita" },
};
