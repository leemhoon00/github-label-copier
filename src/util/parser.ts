import type { GithubLabel, Label } from '../domain/label';

export class Parser {
  parseGithubLabel(label: GithubLabel): Label {
    return {
      name: label.name,
      color: label.color,
      description: label.description,
    };
  }

  parseGithubLabels(labels: GithubLabel[]): Label[] {
    return labels.map((label) => {
      return this.parseGithubLabel(label);
    });
  }
}
