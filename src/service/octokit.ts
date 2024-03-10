import { Octokit } from '@octokit/rest';
import { Repository } from '../domain/repository';
import { GithubLabel } from '../domain/label';

const octokitOption = {
  headers: {
    'X-GitHub-Api-Version': '2022-11-28',
  },
};

export class OctokitService {
  constructor(private octokit: Octokit) {}

  async getLabels(repository: Repository): Promise<GithubLabel[]> {
    const { owner, repo } = repository.getRepoInfo();
    const result = await this.octokit.request(
      `GET /repos/${owner}/${repo}/labels`,
      octokitOption
    );

    return result.data as GithubLabel[];
  }
}
