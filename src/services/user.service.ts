import { axiosWithAuth } from "@/api/interceptors";
import { ICurrientUserResponse } from "@/types/user.types";

class UserService {
  async getCurrientUserData() {
    const response = await axiosWithAuth.get<ICurrientUserResponse>("/api/get_auth_user");
    return response;
  }
}

export const userService = new UserService();
