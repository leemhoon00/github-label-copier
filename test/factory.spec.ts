import { createCopier } from '../src/factory';
import { DefaultCopier, TokenCopier } from '../src/controller';

describe('createCopier', () => {
  it('should return an instance of DefaultCopier when no token is provided', () => {
    const copier = createCopier();
    expect(copier).toBeInstanceOf(DefaultCopier);
  });

  it('should return an instance of TokenCopier when a token is provided', () => {
    const token = 'your-github-token';
    const copier = createCopier(token);
    expect(copier).toBeInstanceOf(TokenCopier);
  });
});
