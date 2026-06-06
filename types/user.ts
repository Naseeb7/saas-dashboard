export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  company: string;
  location: string;
  initials: string;
  companyWebsite?: string;
  companyLocation?: string;
  companyHeadcount?: string;
  managementLevel?: string;
}
