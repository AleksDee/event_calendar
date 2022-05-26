import React, { FC, useState } from "react";
import { Form, Input, Button, DatePicker, Row, Select } from "antd";
import { rules } from "../utils/rules";
import { IUser } from "../models/IUser";
import { IEvent } from "../models/IEvent";
import { Moment } from "moment";
import { formatDate } from "../utils/date";
import { useTypedSelector } from "../hooks/useTypedSelector";

const { Option } = Select;

interface EventFormProps {
  guests: IUser[];
  onSubmit: (event: IEvent) => void;
}

const EventForm: FC<EventFormProps> = (props) => {
  const [event, setEvent] = useState<IEvent>({
    author: "",
    date: "",
    description: "",
    guest: "",
  });

  const { user } = useTypedSelector((state) => state.auth);

  const submitForm = () => {
    props.onSubmit({ ...event, author: user.username });
    // console.log({ ...event, author: user.username });
  };

  const selectDate = (date: Moment | null) => {
    if (date) {
      setEvent({ ...event, date: formatDate(date.toDate()) });
      // console.log(formatDate(date.toDate()));
    }
  };
  return (
    <Form onFinish={submitForm}>
      <Form.Item
        label="Описание события"
        name="description"
        rules={[rules.required()]}
      >
        <Input
          onChange={(e) => setEvent({ ...event, description: e.target.value })}
          value={event.description}
        />
      </Form.Item>
      <Form.Item
        label="Дата события"
        name="date"
        rules={[
          rules.required(),
          rules.isDateAfter("Нельзя создать событие в прошлом"),
        ]}
      >
        <DatePicker onChange={(date) => selectDate(date)} />
      </Form.Item>
      <Form.Item label="Выберите гостя" name="guest" rules={[rules.required()]}>
        <Select onChange={(guest: string) => setEvent({ ...event, guest })}>
          {props.guests.map((guest: IUser) => (
            <Select.Option key={guest.username} value={guest.username}>
              {guest.username}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Row justify="end">
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Добавить событие
          </Button>
        </Form.Item>
      </Row>
    </Form>
  );
};

export default EventForm;
