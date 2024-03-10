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

export function isEqualLabel(label1: Label, label2: Label) {
  return (
    label1.name === label2.name &&
    label1.color === label2.color &&
    label1.description === label2.description
  );
}
