export class User {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: string[];

  constructor(userInfo: any) {
    this.username = userInfo.preferred_username || '';
    this.email = userInfo.email || '';
    this.firstName = userInfo.given_name || '';
    this.lastName = userInfo.family_name || '';
    this.roles = userInfo.realm_access?.roles || [];
  }
}
