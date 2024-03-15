import { Repository } from 'src/domain/repository';

describe('Repository', () => {
  describe('constructor', () => {
    it('should parse the url correctly', () => {
      // given
      const url = 'https://github.com/leemhoon00/github-label-copier';

      // when
      const repository = new Repository(url);

      // then
      expect(repository.owner).toBe('leemhoon00');
      expect(repository.repo).toBe('github-label-copier');
    });

    it('should parse the url correctly when the url has more than 3 slashes', () => {
      // given
      const url = 'https://github.com/leemhoon00/github-label-copier/issues/1';

      // when
      const repository = new Repository(url);

      // then
      expect(repository.owner).toBe('leemhoon00');
      expect(repository.repo).toBe('github-label-copier');
    });

    it('should throw an error when the url is invalid', () => {
      // given
      const url = 'github.com/leemhoon00/github-label-copier';
      const url2 = 'https:/github.com/leemhoon00/github-label-copier';

      // when
      const createRepository = () => new Repository(url);
      const createRepository2 = () => new Repository(url2);

      // then
      expect(createRepository).toThrow('Invalid url');
      expect(createRepository2).toThrow('Invalid url');
    });
  });
});
