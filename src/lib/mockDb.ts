import { v4 as uuidv4 } from 'uuid';

export type User = {
  id: string;
  fullName: string;
  document: string;
  email: string;
  phone: string;
  password?: string;
  dob?: string;
};

export type CVDesign = 'masculino' | 'femenino' | 'ats';

export type FormalStudy = {
  id: string;
  institute: string;
  type: string;
  degree: string;
  endDate: string;
  city: string;
};

export type ComplementaryStudy = {
  id: string;
  institute: string;
  degree: string;
};

export type Experience = {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  city: string;
};

export type Reference = {
  id: string;
  name: string;
  type: 'Familiar' | 'Personal';
  phone: string;
  city: string;
};

export type CVData = {
  id: string;
  userId: string;
  design: CVDesign;
  createdAt: string;
  personal: {
    names: string;
    surnames: string;
    docType: string;
    document: string;
    docIssuePlace: string;
    dob: string;
    birthPlace: string;
    maritalStatus: string;
    phone: string;
    email: string;
    address: string;
    neighborhood: string;
    city: string;
  };
  hasFormalStudies: boolean;
  formalStudies: FormalStudy[];
  hasComplementaryStudies: boolean;
  complementaryStudies: ComplementaryStudy[];
  hasExperience: boolean;
  experiences: Experience[];
  hasReferences: boolean;
  references: Reference[];
};

class MockDatabase {
  private getUsers(): User[] {
    return JSON.parse(localStorage.getItem('cv_users') || '[]');
  }

  private saveUsers(users: User[]) {
    localStorage.setItem('cv_users', JSON.stringify(users));
  }

  public register(user: Omit<User, 'id'>): User {
    const users = this.getUsers();
    if (users.find(u => u.email === user.email)) {
      throw new Error('Email already exists');
    }
    const newUser = { ...user, id: uuidv4() };
    this.saveUsers([...users, newUser]);
    return newUser;
  }

  public login(email: string, password?: string): User {
    const users = this.getUsers();
    const user = users.find(u => u.email === email && (!password || u.password === password));
    if (!user) throw new Error('Invalid credentials');
    return user;
  }

  public updateUser(id: string, data: Partial<User>): User {
    const users = this.getUsers();
    const index = users.findIndex(u => u.id === id);
    if (index === -1) throw new Error('User not found');
    users[index] = { ...users[index], ...data };
    this.saveUsers(users);
    return users[index];
  }

  private getCVs(): CVData[] {
    return JSON.parse(localStorage.getItem('cv_data') || '[]');
  }

  private saveCVs(cvs: CVData[]) {
    localStorage.setItem('cv_data', JSON.stringify(cvs));
  }

  public getCVsByUser(userId: string): CVData[] {
    return this.getCVs().filter(cv => cv.userId === userId);
  }

  public getCVById(id: string): CVData | undefined {
    return this.getCVs().find(cv => cv.id === id);
  }

  public createCV(cv: Omit<CVData, 'id' | 'createdAt'>): CVData {
    const cvs = this.getCVs();
    const newCV = { ...cv, id: uuidv4(), createdAt: new Date().toISOString() };
    this.saveCVs([...cvs, newCV]);
    return newCV;
  }

  public deleteCV(id: string) {
    const cvs = this.getCVs();
    this.saveCVs(cvs.filter(cv => cv.id !== id));
  }
}

export const db = new MockDatabase();
