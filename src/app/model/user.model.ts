export class User {
  userId: string;
  username: string;
  email: string;
  emailVerified: boolean;
  fullName: string;
  firstName: string;
  lastName: string;
  roles!: string[];
  birthday!: Date;
  weight!: string;
  height!: string;
  profilePhoto!: Blob;
  createdAt!: Date;
  updatedAt!: Date;

  constructor(userInfo: any) {
    this.userId = userInfo.id || '';
    this.username = userInfo.username || '';
    this.email = userInfo.email || '';
    this.emailVerified = userInfo.emailVerified;
    this.firstName = userInfo.firstName || '';
    this.lastName = userInfo.lastName || '';
    this.fullName = this.firstName + ' ' + this.lastName;
  }
}
