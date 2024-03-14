import { Octokit } from '@octokit/rest';
import { OctokitService } from '../octokit';
// import { Label } from '../../domain/label';

const octokitOption = {
  headers: {
    'X-GitHub-Api-Version': '2022-11-28',
  },
};

describe('OctokitService', () => {
  let octokitService: OctokitService;
  let octokitMock: Octokit;

  beforeEach(() => {
    octokitMock = {
      request: jest.fn(),
    } as any;
    octokitService = new OctokitService(octokitMock);
  });

  describe('getLabels', () => {
    it('should call the Octokit API with the correct parameters', async () => {
      const spy = jest.spyOn(octokitMock, 'request').mockResolvedValue({
        data: [
          { name: 'label1', color: 'ff0000', description: '' },
          { name: 'label2', color: '00ff00', description: '' },
        ],
      } as any);

      // given
      const owner = 'owner';
      const repo = 'repo';

      // when
      await octokitService.getLabels({ owner, repo });

      // then
      expect(spy).toHaveBeenCalledWith(
        `GET /repos/${owner}/${repo}/labels`,
        octokitOption
      );
    });
  });

  describe('deleteLabel', () => {
    it('should call the Octokit API with the correct parameters', async () => {
      const spy = jest
        .spyOn(octokitMock, 'request')
        .mockResolvedValue({} as any);

      // given
      const owner = 'owner';
      const repo = 'repo';
      const label = { name: 'label1', color: 'ff0000', description: '' };

      // when
      await octokitService.deleteLabel({ owner, repo, label });

      // then
      expect(spy).toHaveBeenCalledWith(
        `DELETE /repos/${owner}/${repo}/labels/label1`,
        octokitOption
      );
    });

    it('should call the Octokit API with the correct parameters when the label name contains spaces', () => {
      // given
      const owner = 'owner';
      const repo = 'repo';
      const label = { name: 'space label', color: 'ff0000', description: '' };

      // when
      octokitService.deleteLabel({ owner, repo, label });

      // then
      const transformedLabelName = 'space%20label';

      expect(octokitMock.request).toHaveBeenCalledWith(
        `DELETE /repos/${owner}/${repo}/labels/${transformedLabelName}`,
        octokitOption
      );
    });

    it('should call the Octokit API with the correct parameters when the label name contains colons', () => {
      // given
      const owner = 'owner';
      const repo = 'repo';
      const label = { name: 'colon:label:', color: 'ff0000', description: '' };

      // when
      octokitService.deleteLabel({ owner, repo, label });

      // then
      const transformedLabelName = 'colon%3Alabel%3A';

      expect(octokitMock.request).toHaveBeenCalledWith(
        `DELETE /repos/${owner}/${repo}/labels/${transformedLabelName}`,
        octokitOption
      );
    });
  });
});
