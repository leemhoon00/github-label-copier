import type { OctokitService } from './service/octokit';
import type { Label } from './domain/label';
import { Repository } from './domain/repository';
import fs from 'fs';
import YAML from 'yaml';

export class DefaultCopier {
  private octokitService: OctokitService;

  constructor(octokit: OctokitService) {
    this.octokitService = octokit;
  }

  async getLabels(option: {
    url?: string;
    owner?: string;
    repo?: string;
  }): Promise<Label[]> {
    const repository = new Repository(option);
    const repoInfo = repository.getRepoInfo();
    return await this.octokitService.getLabels(repoInfo);
  }

  async saveLabels(option: {
    url?: string;
    owner?: string;
    repo?: string;
    format?: 'json' | 'yaml';
  }) {
    const repository = new Repository(option);
    const repoInfo = repository.getRepoInfo();
    const labels = await this.octokitService.getLabels(repoInfo);

    const format = option.format || 'json';

    if (format === 'json') {
      fs.writeFileSync(
        `${repoInfo.owner}-${repoInfo.repo}-labels.json`,
        JSON.stringify(labels, null, 2)
      );
    } else {
      fs.writeFileSync(
        `${repoInfo.owner}-${repoInfo.repo}-labels.yaml`,
        YAML.stringify(labels)
      );
    }
  }
}

export class TokenCopier extends DefaultCopier {}
