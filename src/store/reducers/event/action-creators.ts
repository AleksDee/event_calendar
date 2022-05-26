import { AppDispatch } from "./../../index";
import { IEvent } from "./../../../models/IEvent";
import { IUser } from "./../../../models/IUser";
import axios from "axios";
import { EventActionEnum } from "./types";
import UserService from "../../../api/UserService";

export const EventActionCreators = {
  setGuests: (guests: IUser) => ({
    type: EventActionEnum.SET_GUESTS,
    payload: guests,
  }),
  setEvents: (events: IEvent) => ({
    type: EventActionEnum.SET_EVENTS,
    payload: events,
  }),
  fetchGuests: () => async (dispatch: AppDispatch) => {
    try {
      const response = await UserService.getUsers();
      dispatch(EventActionCreators.setGuests(response.data as any) as any);
    } catch (e) {
      console.log(e);
    }
  },
  createEvent: (event: IEvent) => async (dispatch: AppDispatch) => {
    try {
      const events = localStorage.getItem("events") || "[]";
      const json = JSON.parse(events) as IEvent[];
      json.push(event);
      dispatch(EventActionCreators.setEvents(json as any) as any);
      localStorage.setItem("events", JSON.stringify(json));
    } catch (e) {
      console.log(e);
    }
  },
  fetchEvents: (username: string) => async (dispatch: AppDispatch) => {
    try {
      const events = localStorage.getItem("events") || "[]";
      const json = JSON.parse(events) as IEvent[];
      const currentUserEvents = json.filter(
        (ev) => ev.author === username || ev.guest === username
      );
      dispatch(EventActionCreators.setEvents(currentUserEvents as any) as any);
    } catch (e) {}
  },
};
