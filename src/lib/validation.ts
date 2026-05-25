import { CardData } from "@/types/card";

export interface ValidationWarning {
  field: keyof CardData;
  message: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function getCardValidationWarnings(data: CardData): ValidationWarning[] {
  const warnings: ValidationWarning[] = [];

  if (!data.fullName.trim()) {
    warnings.push({
      field: "fullName",
      message: "Officer name is empty — the card will show a placeholder.",
    });
  }

  if (data.email.trim() && !EMAIL_PATTERN.test(data.email.trim())) {
    warnings.push({
      field: "email",
      message: "Email format looks invalid.",
    });
  }

  return warnings;
}
