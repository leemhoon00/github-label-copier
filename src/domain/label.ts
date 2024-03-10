export interface Label {
  name: string;
  color: string;
  description: string;
}

export interface GithubLabel extends Label {
  id: number;
  node_id: string;
  url: string;
  default: boolean;
}
