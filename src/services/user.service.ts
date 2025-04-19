import { axiosWithAuth } from "@/api/interceptors";
import {
  ICurrientUserResponse,
  IEditCurrientUserResponse,
  IEditUserForm,
} from "@/types/user.types";

class UserService {
  async getCurrientUserData() {
    const response = await axiosWithAuth.get<ICurrientUserResponse>("/api/get_auth_user");
    return response;
  }

  async editCurrientUser(data: IEditUserForm) {
    const response = await axiosWithAuth.patch<IEditCurrientUserResponse>("/api/edit_user", data);
    return response;
  }
}

export const userService = new UserService();
