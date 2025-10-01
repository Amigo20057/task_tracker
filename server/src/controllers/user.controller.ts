import { UserService } from "../services/user.service";

export class UserController {
  public constructor(private readonly userService: UserService) {}
}
