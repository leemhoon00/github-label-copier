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
          { name: 'label1', color: 'ff0000' },
          { name: 'label2', color: '00ff00' },
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
});
