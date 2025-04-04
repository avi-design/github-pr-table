export interface PullRequest {
    id: number;
    title: string;
    html_url: string;
    user: {
      login: string;
    };
    labels: {
      name: string;
    }[];
  }

  export interface ModalDetails {
      updated_at: string;
      body: React.ReactNode;
      title: React.ReactNode;
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