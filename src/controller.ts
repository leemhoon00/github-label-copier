import type { OctokitService } from './service/octokit';
import type { Label } from './domain/label';
import { Parser } from './util/parser';
import { Repository } from './domain/repository';

export class DefaultCopier {
  private octokitService: OctokitService;
  private parser: Parser;

  constructor(octokit: OctokitService) {
    this.octokitService = octokit;
    this.parser = new Parser();
  }

  async getLabels(option: {
    url?: string;
    owner?: string;
    repo?: string;
  }): Promise<Label[]> {
    const repository = new Repository(option);
    const result = await this.octokitService.getLabels(repository);
    return this.parser.parseGithubLabels(result);
  }
}

export class TokenCopier extends DefaultCopier {}
