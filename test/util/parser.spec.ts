import { Parser } from 'src/util/parser';
import { GithubLabel, Label } from 'src/domain/label';

describe('Parser', () => {
  describe('parseGithubLabel', () => {
    it('should return a parsed label', () => {
      // given
      const githubLabel: GithubLabel = {
        name: 'label',
        color: 'ffffff',
        description: 'description',
        id: 1,
        node_id: 'node_id',
        url: 'url',
        default: false,
      };

      // when
      const parser = new Parser();
      const label: Label = parser.parseGithubLabel(githubLabel);

      // then
      expect(label).toEqual({
        name: 'label',
        color: 'ffffff',
        description: 'description',
      });
    });
  });

  describe('parseGithubLabels', () => {
    it('should return a parsed labels', () => {
      // given
      const githubLabels: GithubLabel[] = [
        {
          name: 'label1',
          color: 'ffffff',
          description: 'description1',
          id: 1,
          node_id: 'node_id1',
          url: 'url1',
          default: false,
        },
        {
          name: 'label2',
          color: '000000',
          description: 'description2',
          id: 2,
          node_id: 'node_id2',
          url: 'url2',
          default: false,
        },
      ];

      // when
      const parser = new Parser();
      const labels: Label[] = parser.parseGithubLabels(githubLabels);

      // then
      expect(labels).toEqual([
        {
          name: 'label1',
          color: 'ffffff',
          description: 'description1',
        },
        {
          name: 'label2',
          color: '000000',
          description: 'description2',
        },
      ]);
    });
  });
});
