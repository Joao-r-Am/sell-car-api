export interface IUser {
  id: string;
  name: string;
  lastname: string;
  email: string;
  username: string;
  cnpjf: string;
  birthday?: Date;
  is_company: boolean;
  roles: string[];
  password: string;
  address?: string;
  zip_code?: string;
  phone?: string;
  active: boolean;
  entity?: string;
  portager?: string;
  municipal_inscription?: string;
  taxpayer?: string;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
}
