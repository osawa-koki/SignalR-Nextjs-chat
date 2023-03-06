import React, { useEffect, useState } from "react";

import { HubConnectionBuilder } from "@microsoft/signalr";

import { Button, Alert, Form } from 'react-bootstrap';
import Layout from "../components/Layout";

import { DataContext } from "../src/DataContext";

export default function ChatPage() {

  const [connection, setConnection] = useState(null);
  const [messages, setMessages] = useState([]);

  const handleSendMessage = () => {
    const user = sharedData.username;
    const message = sharedData.message;
    connection.invoke("SendMessage", user, message).catch((err) => {
      console.error(err);
    });
  };

  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl("http://localhost:8000/chatHub") // SignalRサーバーのURLを指定
      .build();

    setConnection(newConnection);
  }, []);

  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then(() => {
          console.log("SignalR connected.");
        })
        .catch((err) => {
          console.error(err);
        });

      connection.on("ReceiveMessage", (user, message) => {
        const newMessages = messages.concat(`${user}: ${message}`);
        setMessages(newMessages);
      });
    }
  }, [connection, messages]);

  const { sharedData, setSharedData } = React.useContext(DataContext);

  return (
    <Layout>
      <div id="Chat">
        <h1>Chat</h1>
        <Form>
          <Form.Group className="mt-3">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Enter username" value={sharedData.username} onInput={
              (e: React.FormEvent<HTMLInputElement>) => {
                setSharedData({ ...sharedData, username: e.currentTarget.value });
              }
            } />
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Label>Message</Form.Label>
            <Form.Control as="textarea" rows={5} value={sharedData.message} onInput={
              (e: React.FormEvent<HTMLTextAreaElement>) => {
                setSharedData({ ...sharedData, message: e.currentTarget.value });
              }
            } />
          </Form.Group>
          <Button variant="primary" className="mt-3 d-block m-auto" onClick={handleSendMessage}>Send 📨</Button>
        </Form>
        <hr />
        <ul>
          {messages.map((msg, idx) => (
            <li key={idx}>{msg}</li>
          ))}
        </ul>
      </div>
    </Layout>
  );
};
