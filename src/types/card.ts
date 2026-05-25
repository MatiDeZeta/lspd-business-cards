export interface CardData {
  rank: string;
  fullName: string;
  serialNumber: string;
  division: string;
  assignment: string;
  phone: string;
  cell: string;
  fax: string;
  email: string;
  address: string;
}

export const DEFAULT_CARD_DATA: CardData = {
  rank: "Police Officer III",
  fullName: "Michael R. Torres",
  serialNumber: "38291",
  division: "Central Division",
  assignment: "Community Relations Officer",
  phone: "(213) 486-1163",
  cell: "(213) 555-0147",
  fax: "",
  email: "m.torres@lspdonline.org",
  address: "1401 Sinner Street\nLos Santos, SA 90017",
};

export const CARD_STORAGE_KEY = "lspd-card-generator-data";
