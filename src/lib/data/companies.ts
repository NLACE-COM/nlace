
import { Company } from "../types";

// Empresas reconocidas B2B
export const companies: Company[] = [
  {
    id: "c1",
    name: "Codelco",
    plan: "enterprise",
    logo: "", // Removed logo URL to use the Building icon
    description: "Principal productor de cobre en Chile y el mundo",
  },
  {
    id: "c2",
    name: "BHP",
    plan: "enterprise",
    logo: "",
    description: "Compañía minera global con importantes operaciones en Chile",
  },
  {
    id: "c3",
    name: "Anglo American",
    plan: "enterprise",
    logo: "",
    description: "Operaciones de cobre y otros minerales en Chile",
  },
  {
    id: "c4",
    name: "Antofagasta Minerals",
    plan: "enterprise",
    logo: "",
    description: "Grupo minero chileno con foco en producción de cobre",
  },
  {
    id: "c5",
    name: "Freeport-McMoRan",
    plan: "enterprise",
    logo: "",
    description: "Compañía minera con operaciones de cobre en Chile",
  },
  {
    id: "c6",
    name: "Albemarle",
    plan: "enterprise",
    logo: "",
    description: "Líder mundial en la producción de litio con operaciones en el Salar de Atacama, Chile",
  },
];

// Export the current company
export const currentCompany: Company = companies[0];
