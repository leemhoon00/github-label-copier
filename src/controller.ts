import type { OctokitService } from './service/octokit';
import { Label, isEqualLabel } from './domain/label';
import { Repository } from './domain/repository';
import fs from 'fs';
import path from 'path';
import YAML from 'yaml';

export class DefaultCopier {
  octokitService: OctokitService;

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

    const format = option.format ?? 'json';

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
  async copyLabels(option: { from: string; to: string }) {
    const fromRepo = new Repository(option.from);
    const toRepo = new Repository(option.to);

    const fromRepoInfo = fromRepo.getRepoInfo();
    const toRepoInfo = toRepo.getRepoInfo();

    const fromLabels = await this.octokitService.getLabels(fromRepoInfo);
    const toLabels = await this.octokitService.getLabels(toRepoInfo);

    const toDeleteLabels = toLabels.filter((toLabel) => {
      return !fromLabels.some((fromLabel) => {
        return isEqualLabel(fromLabel, toLabel);
      });
    });
    const toCreateLabels = fromLabels.filter((fromLabel) => {
      return !toLabels.some((toLabel) => {
        return isEqualLabel(fromLabel, toLabel);
      });
    });

    for await (const label of toDeleteLabels) {
      this.octokitService.deleteLabel({ ...toRepoInfo, label });
    }

    for await (const label of toCreateLabels) {
      this.octokitService.createLabel(toRepoInfo, label);
    }
  }

  async pushLabels(option: { filename: string; url: string }) {
    const repository = new Repository(option.url);
    const repoInfo = repository.getRepoInfo();

    const filePath = path.resolve(process.cwd(), option.filename);
    let labels: string;
    try {
      labels = fs.readFileSync(filePath, 'utf-8');
    } catch (e) {
      throw new Error('File not found');
    }
    const format = path.extname(filePath) === '.json' ? 'json' : 'yaml';
    const parsedLabels =
      format === 'json' ? JSON.parse(labels) : YAML.parse(labels);

    const toLabels = await this.octokitService.getLabels(repoInfo);

    const toDeleteLabels = toLabels.filter((toLabel) => {
      return !parsedLabels.some((parsedLabel: Label) => {
        return isEqualLabel(parsedLabel, toLabel);
      });
    });

    const toCreateLabels = parsedLabels.filter((parsedLabel: Label) => {
      return !toLabels.some((toLabel) => {
        return isEqualLabel(parsedLabel, toLabel);
      });
    });

    for await (const label of toDeleteLabels) {
      this.octokitService.deleteLabel({ ...repoInfo, label });
    }

    for await (const label of toCreateLabels) {
      this.octokitService.createLabel(repoInfo, label);
    }
  }
}
