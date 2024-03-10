import { Octokit } from '@octokit/rest';
import { DefaultCopier, TokenCopier } from './controller';
import { OctokitService } from './service/octokit';

export function createCopier(): DefaultCopier;
export function createCopier(githubToken: string): TokenCopier;
export function createCopier(githubToken?: string) {
  if (!githubToken) {
    return new DefaultCopier(new OctokitService(new Octokit()));
  } else {
    return new TokenCopier(
      new OctokitService(new Octokit({ auth: githubToken }))
    );
  }
}
