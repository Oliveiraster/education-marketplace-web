export interface UserProfile {
  id: string;
  email: string;
  name: string;
  photo?: string;
  phone: string;
  whatsapp?: string;
  address?: string[];
  about?: {
    role?: string;
    objective?: string;
    skills?: string[];
    bio?: string;
  };
}
