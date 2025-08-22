export interface IUser {
  id: number;
  username: string;
  personId: number;
  personName?: string; // 👈 opcional, solo viene del back en GET
  email: string;
  password: string;
  isDelete: boolean;
  createdDate: string;
  active: boolean;
}
