import { Octokit } from '@octokit/rest';
import { Label } from './interface/label';

export class Copier {
  private octokit: Octokit;
  constructor(githubToken?: string) {
    if (!githubToken) {
      this.octokit = new Octokit();
    } else {
      this.octokit = new Octokit({
        auth: githubToken,
      });
    }
  }

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
