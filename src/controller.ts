import type { OctokitService } from './service/octokit';
import type { Label } from './domain/label';
import { Repository } from './domain/repository';
import fs from 'fs';
import YAML from 'yaml';

export class DefaultCopier {
  protected octokitService: OctokitService;

  constructor(octokit: OctokitService) {
    this.octokitService = octokit;
  }

  async getLabels(option: { url: string }): Promise<Label[]> {
    const repository = new Repository(option.url);
    const repoInfo = repository.getRepoInfo();
    return await this.octokitService.getLabels(repoInfo);
  }

  async saveLabels(option: { url: string; format?: 'json' | 'yaml' }) {
    const repository = new Repository(option.url);
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

export class TokenCopier extends DefaultCopier {
  constructor(octokit: OctokitService) {
    super(octokit);
  }

  async copyLabels(option: { from: string; to: string }) {
    const fromRepo = new Repository(option.from);
    const toRepo = new Repository(option.to);

    const fromRepoInfo = fromRepo.getRepoInfo();
    const toRepoInfo = toRepo.getRepoInfo();

    const labels = await this.octokitService.getLabels(fromRepoInfo);
    await this.octokitService.deleteAllLabels(toRepoInfo);

    for (const label of labels) {
      await this.octokitService.createLabel(toRepoInfo, label);
    }
  }
}
