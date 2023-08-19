import { UserView } from "./user-view";

export class UserPut {
    id: string;
    active: boolean;
    userAutorization: number;
    groupAutorizationId: string;

  constructor(user:UserView) {
    this.id = user.id;
    this.active = user.active;
    this.userAutorization = user.userAutorization;
    this.groupAutorizationId = user.userGroupAutorization;
  }

}
