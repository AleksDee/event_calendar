import { AppDispatch } from "./../../index";
import {
  AuthActionEnum,
  SetAuthAction,
  SetErrorAction,
  SetIsLoadingAction,
  SetUserAction,
} from "./types";
import { IUser } from "./../../../models/IUser";
import axios from "axios";
import UserService from "../../../api/UserService";
export const AuthActionCreators = {
  setUser: (user: IUser): SetUserAction => ({
    type: AuthActionEnum.SET_USER,
    payload: user,
  }),
  setAuth: (auth: boolean): SetAuthAction => ({
    type: AuthActionEnum.SET_AUTH,
    payload: auth,
  }),
  setIsLoading: (loading: boolean): SetIsLoadingAction => ({
    type: AuthActionEnum.SET_IS_LOADING,
    payload: loading,
  }),
  setError: (error: string): SetErrorAction => ({
    type: AuthActionEnum.SET_ERROR,
    payload: error,
  }),
  login:
    (username: string, password: string) => async (dispatch: AppDispatch) => {
      debugger;
      debugger;
      try {
        dispatch(AuthActionCreators.setIsLoading(true));
        setTimeout(async () => {
          const response = await UserService.getUsers();
          const mockUser = response.data.find((user: IUser) => {
            debugger;
            return user.username === username && user.password;
          });
          if (mockUser) {
            dispatch(AuthActionCreators.setError(""));
            localStorage.setItem("auth", "true");
            localStorage.setItem("username", mockUser.username);
            dispatch(AuthActionCreators.setUser(mockUser));
            dispatch(AuthActionCreators.setAuth(true));
          } else {
            dispatch(
              AuthActionCreators.setError("Некорректный логин или пароль")
            );
          }
          dispatch(AuthActionCreators.setIsLoading(false));
        }, 1000);
        // console.log(mockUsers);
      } catch (error) {
        dispatch(AuthActionCreators.setError("Произошла ошибка при логине"));
      }
    },
  logout: () => async (dispatch: AppDispatch) => {
    debugger;
    localStorage.removeItem("auth");
    localStorage.removeItem("username");
    dispatch(AuthActionCreators.setUser({} as IUser));
    dispatch(AuthActionCreators.setAuth(false));
  },
};
