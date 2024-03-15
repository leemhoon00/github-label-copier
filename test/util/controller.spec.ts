import { TokenCopier } from 'src/controller';
import { OctokitService } from 'src/service/octokit';
import YAML from 'yaml';

jest.mock('fs');
import fs from 'fs';

describe('DefaultCopier', () => {
  let tokenCopier: TokenCopier;

  beforeEach(() => {
    // Create a mock OctokitService
    const octokitServiceMock = {
      getLabels: jest.fn(),
      deleteLabel: jest.fn(),
      createLabel: jest.fn(),
    } as unknown as OctokitService;

    tokenCopier = new TokenCopier(octokitServiceMock);
  });

  describe('saveLabels', () => {
    it('should save labels in json format when format is not specified', async () => {
      // given
      const getLabelsMock = jest.fn().mockResolvedValue([
        { name: 'name1', color: '000000', description: 'description1' },
        { name: 'name2', color: '000000', description: 'description2' },
      ]);
      tokenCopier.octokitService.getLabels = getLabelsMock;

      // when
      await tokenCopier.saveLabels({
        url: 'https://github.com/leemhoon00/github-label-copier',
      });

      // then
      expect(fs.writeFileSync).toHaveBeenCalledWith(
        'leemhoon00-github-label-copier-labels.json',
        JSON.stringify(
          [
            { name: 'name1', color: '000000', description: 'description1' },
            { name: 'name2', color: '000000', description: 'description2' },
          ],
          null,
          2
        )
      );
    });

    it('should save labels in yaml format', async () => {
      // given
      const getLabelsMock = jest.fn().mockResolvedValue([
        { name: 'name1', color: '000000', description: 'description1' },
        { name: 'name2', color: '000000', description: 'description2' },
      ]);
      tokenCopier.octokitService.getLabels = getLabelsMock;

      // when
      await tokenCopier.saveLabels({
        url: 'https://github.com/leemhoon00/github-label-copier',
        format: 'yaml',
      });

      // then
      expect(fs.writeFileSync).toHaveBeenCalledWith(
        'leemhoon00-github-label-copier-labels.yaml',
        YAML.stringify([
          { name: 'name1', color: '000000', description: 'description1' },
          { name: 'name2', color: '000000', description: 'description2' },
        ])
      );
    });
  });
});
