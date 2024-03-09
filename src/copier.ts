import type { Octokit } from '@octokit/rest';
import type { Label } from './label';

export class DefaultCopier {
  constructor(private octokit: Octokit) {}

  async getLabels(owner: string, repo: string) {
    const result = await this.octokit.request(
      `GET /repos/${owner}/${repo}/labels`,
      {
        headers: {
          'X-GitHub-Api-Version': '2022-11-28',
        },
      }
    );

    const data = result.data as Label[];
    return data.map((label) => {
      return {
        name: label.name,
        color: label.color,
        description: label.description,
      };
    });
  }
}

export class TokenCopier extends DefaultCopier {}
