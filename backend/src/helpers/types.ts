export interface User {
  id: string;
  username: string;
  email: string;
  hobby: string;
}

export interface IProfileRepository {
  getAllProfiles(): Promise<User[]>;

  getProfileById(userId: string): Promise<User>;

  createProfile(user: User): Promise<{ id: string }>;
}
