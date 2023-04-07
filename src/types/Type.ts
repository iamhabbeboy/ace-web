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

export interface IExam {
  id: string;
  name: string;
  student_login_uri: string;
  description: string;
  student_count: string;
  created_by: string;
  created_at: string;
  updated_at: string;
  expired_at: string;
  user_id: string;
  subjects: Subject[];
  questions: Question[];
}

export interface Subject {
  name: string;
  slug: string;
  description?: string;
}

export interface Question {
  content: string;
  content_html: string;
  answer: string;
  options: Options[];
}

export interface Options {
  label: string;
  content: string;
  content_html: string;
}
