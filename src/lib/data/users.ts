
import { User } from "../types";
import { currentCompany } from "./companies";

// Usuario actual ficticio
export const currentUser: User = {
  id: "u1",
  name: "Juan Pérez",
  email: "juan@techcorp.com",
  role: "admin",
  companyId: "c1",
  tokenLimit: 100000,
};

// Usuarios ficticios
export const users: User[] = [
  currentUser,
  {
    id: "u2",
    name: "María López",
    email: "maria@techcorp.com",
    role: "manager",
    companyId: "c1",
    tokenLimit: 75000,
    activityCount: 87
  },
  {
    id: "u3",
    name: "Carlos Rodríguez",
    email: "carlos@techcorp.com",
    role: "user",
    companyId: "c1",
    tokenLimit: 50000,
    activityCount: 134
  },
  {
    id: "u4",
    name: "Ana Martínez",
    email: "ana@retailpro.com",
    role: "admin",
    companyId: "c2",
    tokenLimit: 100000,
    activityCount: 56
  },
  {
    id: "u5",
    name: "Javier Sánchez",
    email: "javier@fooddelivery.com",
    role: "admin",
    companyId: "c3",
    tokenLimit: 80000,
    activityCount: 42
  },
  {
    id: "u6",
    name: "Laura Gómez",
    email: "laura@techcorp.com",
    role: "user",
    companyId: "c1",
    tokenLimit: 50000,
    activityCount: 97
  },
  {
    id: "u7",
    name: "Miguel Fernández",
    email: "miguel@techcorp.com",
    role: "user",
    companyId: "c1",
    tokenLimit: 50000,
    activityCount: 76
  },
];

// Función para obtener usuarios por empresa
export const getUsersByCompany = (companyId: string): User[] => {
  return users.filter((user) => user.companyId === companyId);
};
