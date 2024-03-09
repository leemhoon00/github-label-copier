import type { Octokit } from '@octokit/rest';
import type { GithubLabel } from './schemas/label';
import { Parser } from './parser';

const octokitOptions = {
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

  async getLabels(options: { url?: string; owner?: string; repo?: string }) {
    let { url, owner, repo } = options;
    if (!url && (!owner || !repo)) {
      throw new Error('Either url or owner and repo should be provided');
    }
    if (url) {
      const parsedInfo = this.parser.parseUrl(url);
      owner = parsedInfo.owner;
      repo = parsedInfo.repo;
    }
    const result = await this.octokit.request(
      `GET /repos/${owner}/${repo}/labels`,
      octokitOptions
    );

    const data = result.data as GithubLabel[];
    return this.parser.parseGithubLabels(data);
  }
}

export class TokenCopier extends DefaultCopier {}
