import React from 'react';
export interface PullRequestResponse {
  id: number;
  title: string;
  html_url: string;
  user: {
    login: string;
  };
  labels: {
    name: string;
  }[];
  status:number
}

export interface ModalDetails {
  updated_at: string;
  body: React.ReactNode;
  title: string;
}

export interface getPrDetailsType {
  id: string;
  url: string;
  title: string;
  number: number;
  created_at: string;
  author: string;
  labels: {
    name: string;
    description: string;
    color: string;
  }[];
}
