import { TokenCopier } from 'src/controller';
import { OctokitService } from 'src/service/octokit';
import YAML from 'yaml';

jest.mock('fs');
import fs from 'fs';

describe('DefaultCopier', () => {
  let tokenCopier: TokenCopier;

  beforeEach(() => {
    const octokitServiceMock = {
      getLabels: jest.fn(),
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

describe('TokenCopier', () => {
  let tokenCopier: TokenCopier;
  let octokitServiceMock: jest.Mocked<OctokitService>;

  beforeEach(() => {
    octokitServiceMock = {
      getLabels: jest.fn(),
      deleteLabel: jest.fn(),
      createLabel: jest.fn(),
    } as unknown as jest.Mocked<OctokitService>;

    tokenCopier = new TokenCopier(octokitServiceMock);
  });

  describe('copyLabels', () => {
    it('should delete one label and create two labels', async () => {
      //given
      octokitServiceMock.getLabels
        .mockResolvedValueOnce([
          { name: 'name2', color: '000000', description: 'description2' },
          { name: 'name3', color: '000000', description: 'description3' },
          { name: 'name4', color: '000000', description: 'description4' },
        ])
        .mockResolvedValueOnce([
          { name: 'name1', color: '000000', description: 'description1' },
          { name: 'name2', color: '000000', description: 'description2' },
        ]);

      // when
      await tokenCopier.copyLabels({
        from: 'https://github.com/leemhoon00/github-label-copier',
        to: 'https://github.com/leemhoon00/github-label-copier2',
      });

      // then
      expect(octokitServiceMock.deleteLabel).toHaveBeenCalledTimes(1);
      expect(octokitServiceMock.deleteLabel).toHaveBeenCalledWith({
        owner: 'leemhoon00',
        repo: 'github-label-copier2',
        label: { name: 'name1', color: '000000', description: 'description1' },
      });
      expect(octokitServiceMock.createLabel).toHaveBeenCalledTimes(2);
      expect(octokitServiceMock.createLabel).toHaveBeenCalledWith(
        {
          owner: 'leemhoon00',
          repo: 'github-label-copier2',
        },
        { name: 'name3', color: '000000', description: 'description3' }
      );
      expect(octokitServiceMock.createLabel).toHaveBeenCalledWith(
        {
          owner: 'leemhoon00',
          repo: 'github-label-copier2',
        },
        { name: 'name4', color: '000000', description: 'description4' }
      );
    });

    it('should delete label when color or description is different', async () => {
      //given
      octokitServiceMock.getLabels
        .mockResolvedValueOnce([
          { name: 'name1', color: '000000', description: 'description1' },
          { name: 'name2', color: '000000', description: 'description2' },
        ])
        .mockResolvedValueOnce([
          { name: 'name1', color: 'ffffff', description: 'description1' },
          {
            name: 'name2',
            color: '000000',
            description: 'different description',
          },
        ]);

      // when
      await tokenCopier.copyLabels({
        from: 'https://github.com/leemhoon00/github-label-copier',
        to: 'https://github.com/leemhoon00/github-label-copier2',
      });

      // then
      expect(octokitServiceMock.deleteLabel).toHaveBeenCalledTimes(2);
      expect(octokitServiceMock.deleteLabel).toHaveBeenCalledWith({
        owner: 'leemhoon00',
        repo: 'github-label-copier2',
        label: { name: 'name1', color: 'ffffff', description: 'description1' },
      });
      expect(octokitServiceMock.deleteLabel).toHaveBeenCalledWith({
        owner: 'leemhoon00',
        repo: 'github-label-copier2',
        label: {
          name: 'name2',
          color: '000000',
          description: 'different description',
        },
      });

      expect(octokitServiceMock.createLabel).toHaveBeenCalledTimes(2);
      expect(octokitServiceMock.createLabel).toHaveBeenCalledWith(
        {
          owner: 'leemhoon00',
          repo: 'github-label-copier2',
        },
        { name: 'name1', color: '000000', description: 'description1' }
      );
      expect(octokitServiceMock.createLabel).toHaveBeenCalledWith(
        {
          owner: 'leemhoon00',
          repo: 'github-label-copier2',
        },
        { name: 'name2', color: '000000', description: 'description2' }
      );
    });
  });
});
