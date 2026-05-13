export type Role = "farmer" | "butcher" | "supplier";

export const ROLES = {
  FARMER: "farmer",
  BUTCHER: "butcher",
  SUPPLIER: "supplier",
} as const satisfies Record<string, Role>;

export function isFarmer(role: string): boolean {
  return role === ROLES.FARMER;
}

export function isButcher(role: string): boolean {
  return role === ROLES.BUTCHER;
}

export function isSupplier(role: string): boolean {
  return role === ROLES.SUPPLIER;
}

export function isBuyer(role: string): boolean {
  return role === ROLES.BUTCHER || role === ROLES.SUPPLIER;
}

export function canListProducts(role: string): boolean {
  return role === ROLES.FARMER || role === ROLES.SUPPLIER;
}

export function sellerRoleForBuyer(buyerRole: string): string | null {
  if (buyerRole === ROLES.BUTCHER) return ROLES.SUPPLIER;
  if (buyerRole === ROLES.SUPPLIER) return ROLES.FARMER;
  return null;
}

export function roleLabel(role: string): string {
  switch (role) {
    case ROLES.FARMER:
      return "فلاح";
    case ROLES.BUTCHER:
      return "جزار";
    case ROLES.SUPPLIER:
      return "مورد";
    default:
      return "";
  }
}
