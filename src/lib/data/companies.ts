
import { Company } from "../types";

// Empresas reconocidas B2B
export const companies: Company[] = [
  {
    id: "c1",
    name: "Codelco",
    plan: "enterprise",
    logo: "/lovable-uploads/ecb58b3f-888b-42ac-939c-afeba1996b28.png",
    description: "Principal productor de cobre en Chile y el mundo",
  },
  {
    id: "c2",
    name: "BHP",
    plan: "enterprise",
    logo: "https://www.bhp.com/-/media/project/bhp1ip/bhp-com-en/images/bhp-logo/bhp-logo.png",
    description: "Compañía minera global con importantes operaciones en Chile",
  },
  {
    id: "c3",
    name: "Anglo American",
    plan: "enterprise",
    logo: "https://www.angloamerican.com/~/media/Images/A/Anglo-American-Group/media-images/logos/anglo-american-logo.svg",
    description: "Operaciones de cobre y otros minerales en Chile",
  },
  {
    id: "c4",
    name: "Antofagasta Minerals",
    plan: "enterprise",
    logo: "https://www.aminerals.cl/minisitios/memoria2021/img/antofagastalogoblack.png",
    description: "Grupo minero chileno con foco en producción de cobre",
  },
  {
    id: "c5",
    name: "Freeport-McMoRan",
    plan: "enterprise",
    logo: "https://fcx.com/sites/fcx/templates/fcx_master/images/fcx-logo-blue.svg",
    description: "Compañía minera con operaciones de cobre en Chile",
  },
  {
    id: "c6",
    name: "Albemarle",
    plan: "enterprise",
    logo: "https://www.albemarle.com/themes/custom/albemarle/logo.svg",
    description: "Líder mundial en la producción de litio con operaciones en el Salar de Atacama, Chile",
  },
];

// Export the current company
export const currentCompany: Company = companies[0];
