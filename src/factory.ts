import { Octokit } from '@octokit/rest';
import { DefaultCopier, TokenCopier } from './copier';

export function createCopier(githubToken?: string) {
  if (!githubToken) {
    return new DefaultCopier(new Octokit());
  } else {
    return new TokenCopier(new Octokit({ auth: githubToken }));
  }
}
