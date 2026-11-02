export interface SavedAddress {
  id: string;
  label: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  fullName?: string;
  phone?: string;
  email?: string;
  house?: string;
  street?: string;
  landmark?: string;
}

export interface AuthUser {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  addresses: SavedAddress[];
}
