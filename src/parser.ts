import type { GithubLabel, Label } from './schemas/label';

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

  parseUrl(url: string): { owner: string; repo: string } {
    const [owner, repo] = url.split('/').slice(3);

    if (!owner || !repo) {
      throw new Error('Invalid url');
    }
    return { owner, repo };
  }
}
