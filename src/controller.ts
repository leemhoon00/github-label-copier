import type { Octokit } from '@octokit/rest';
import type { GithubLabel } from './schemas/label';
import { Parser } from './parser';

const requestOptions = {
  headers: {
    'X-GitHub-Api-Version': '2022-11-28',
  },
};

export class DefaultCopier {
  private octokit: Octokit;
  private parser: Parser;

  constructor(octokit: Octokit) {
    this.octokit = octokit;
    this.parser = new Parser();
  }

  async getLabels(owner: string, repo: string) {
    const result = await this.octokit.request(
      `GET /repos/${owner}/${repo}/labels`,
      requestOptions
    );

    const data = result.data as GithubLabel[];
    return this.parser.parserGithubLabels(data);
  }
}

export class TokenCopier extends DefaultCopier {
  print() {
    console.log('TokenCopier');
  }
}
