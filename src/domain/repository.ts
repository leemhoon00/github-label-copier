export class Repository {
  url?: string;
  owner: string;
  repo: string;
  constructor({
    url,
    owner,
    repo,
  }: {
    url?: string;
    owner?: string;
    repo?: string;
  }) {
    if (!url && (!owner || !repo)) {
      throw new Error('Either url or owner and repo should be provided');
    }
    if (url) {
      const parsedInfo = this.parseUrl(url);
      this.owner = parsedInfo.owner;
      this.repo = parsedInfo.repo;
    } else {
      this.owner = owner!;
      this.repo = repo!;
    }
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
