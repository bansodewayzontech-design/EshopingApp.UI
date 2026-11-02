export interface SavedAddress {
  id: string;
  label: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
}

export interface AuthUser {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  addresses: SavedAddress[];
}
