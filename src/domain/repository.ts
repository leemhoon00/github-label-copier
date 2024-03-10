export class Repository {
  url?: string;
  owner: string;
  repo: string;
  constructor(url: string) {
    const parsedInfo = this.parseUrl(url);
    this.owner = parsedInfo.owner;
    this.repo = parsedInfo.repo;
  }

  private parseUrl(url: string): { owner: string; repo: string } {
    const [owner, repo] = url.split('/').slice(3);

    if (!owner || !repo) {
      throw new Error('Invalid url');
    }
    return { owner, repo };
  }

  getRepoInfo() {
    return {
      owner: this.owner,
      repo: this.repo,
    };
  }
}
