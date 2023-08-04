export interface IGoogleOauth {
    access_token: string;
    token_type: string;
    expires_in: number;
    scope: string;
    authuser?: string;
    prompt: string;
}
export interface IUser {
  id: string;
  name: string;
  picture: string;
  email: string;
  token: string;
  assigned_subjects: string[];
  subjects: ISubject[],
  onboarding: boolean,
  family_name: string;
  given_name: string;
  companies?: ICompany[];
  subject_slugs?: string[];
  username?: string;
  password?: string;
  created_at?: string;
  updated_at?: string;
}


export interface ICompany {
  name: string;
  logo: string;
  description: string;
}

export interface IExam {
  id: string;
  name: string;
  student_login_uri: string;
  description: string;
  created_by: string;
  created_at: string;
  updated_at: string;
  expired_at: string;
  subject_slugs: Subjects[];
  questions: IQuestion[];
}

export interface Subjects {
  title: string;
  slug: string;
  duration: number;
}

export interface ISubject {
  title: string;
  slug: string;
  duration: number;
}

export interface IQuestion {
  content: string;
  answer: string;
  subject: string;
  images: string[];
  content_html: string;
  subject_slug: string;
  options: IOptions[];
}

export interface IPaginatedQuestion {
  data: IQuestion[];
  cursor: string;
  total: number;
}

export interface IOptions {
  label: string;
  content: string;
  content_html?: string;
}

export interface UserToken {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
  authuser: string;
  prompt: string;
}
