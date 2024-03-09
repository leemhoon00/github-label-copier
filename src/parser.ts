import type { GithubLabel, MyLabel } from './schemas/label';

export class Parser {
  parseGithubLabel(label: GithubLabel): MyLabel {
    return {
      name: label.name,
      color: label.color,
      description: label.description,
    };
  }

  parserGithubLabels(labels: GithubLabel[]): MyLabel[] {
    return labels.map((label) => {
      return this.parseGithubLabel(label);
    });
  }
}
