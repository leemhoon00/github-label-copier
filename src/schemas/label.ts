export type GithubLabel = {
  id: number;
  node_id: string;
  url: string;
  name: string;
  color: string;
  default: boolean;
  description: string;
};

export type Label = {
  name: string;
  color: string;
  description: string;
};
