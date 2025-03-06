
import { Company } from "../types";

// Empresas reconocidas B2B
export const companies: Company[] = [
  {
    id: "c1",
    name: "Codelco",
    plan: "enterprise",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/26/Codelco_logo.svg",
    description: "Principal productor de cobre en Chile y el mundo",
  },
  {
    id: "c2",
    name: "BHP",
    plan: "enterprise",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/43/BHP_2017_logo.svg",
    description: "Compañía minera global con importantes operaciones en Chile",
  },
  {
    id: "c3",
    name: "Anglo American",
    plan: "enterprise",
    logo: "https://upload.wikimedia.org/wikipedia/commons/7/79/Anglo_American_logo.svg",
    description: "Operaciones de cobre y otros minerales en Chile",
  },
  {
    id: "c4",
    name: "Antofagasta Minerals",
    plan: "enterprise",
    logo: "https://upload.wikimedia.org/wikipedia/commons/3/3f/Antofagasta_Minerals_logo.svg",
    description: "Grupo minero chileno con foco en producción de cobre",
  },
  {
    id: "c5",
    name: "Freeport-McMoRan",
    plan: "enterprise",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/42/Freeport-McMoRan_logo.svg",
    description: "Compañía minera con operaciones de cobre en Chile",
  },
];

// Export the current company
export const currentCompany: Company = companies[0];
