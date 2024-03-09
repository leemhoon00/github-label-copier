import { Octokit } from '@octokit/rest';
import { DefaultCopier, TokenCopier } from './controller';

export function createCopier(): DefaultCopier;
export function createCopier(githubToken: string): TokenCopier;
export function createCopier(githubToken?: string) {
  if (!githubToken) {
    return new DefaultCopier(new Octokit());
  } else {
    const tokenCopier = new TokenCopier(new Octokit({ auth: githubToken }));
    return tokenCopier;
  }
}
