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
}
