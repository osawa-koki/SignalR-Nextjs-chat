import React from "react";

import { Button, Alert, Form } from 'react-bootstrap';
import Layout from "../components/Layout";

import { DataContext } from "../src/DataContext";

export default function ChatPage() {

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
          <Button variant="primary" className="mt-3 d-block m-auto">Send 📨</Button>
        </Form>
      </div>
    </Layout>
  );
};