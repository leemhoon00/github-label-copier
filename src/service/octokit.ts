import { Octokit } from '@octokit/rest';
import { GithubLabel, Label } from '../domain/label';
import { Parser } from '../util/parser';

const octokitOption = {
  headers: {
    'X-GitHub-Api-Version': '2022-11-28',
  },
};

export class OctokitService {
  constructor(private octokit: Octokit) {}

  async getLabels({
    owner,
    repo,
  }: {
    owner: string;
    repo: string;
  }): Promise<Label[]> {
    const result = await this.octokit.request(
      `GET /repos/${owner}/${repo}/labels`,
      octokitOption
    );

    const parser = new Parser();
    return parser.parseGithubLabels(result.data as GithubLabel[]);
  }

  async deleteAllLabels({ owner, repo }: { owner: string; repo: string }) {
    const labels = await this.getLabels({ owner, repo });

    for (const label of labels) {
      let name = label.name.replace(/\s/g, '%20');
      name = name.replace(/:/g, '%3A');
      await this.octokit.request(
        `DELETE /repos/${owner}/${repo}/labels/${name}`,
        octokitOption
      );
    }
  }

  async createLabel(
    { owner, repo }: { owner: string; repo: string },
    label: Label
  ) {
    await this.octokit.request(`POST /repos/${owner}/${repo}/labels`, {
      ...octokitOption,
      name: label.name,
      color: label.color,
      description: label.description,
    });
  }
}
