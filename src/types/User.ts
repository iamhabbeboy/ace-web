export interface IUser {
  id: string;
  avatar: string;
  oauth_user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  companies: ICompany[];
  username: string;
  password: string;
  created_at: string;
  updated_at: string;
}

export interface ICompany {
    name: string;
    logo: string;
    description: string;
}