import { Octokit } from '@octokit/rest';

export async function getLabels(authToken?: string) {
  authToken;
  const octokit = new Octokit();

  const labels = await octokit.issues.listLabelsForRepo({
    owner: 'leemhoon00',
    repo: 'typevocab-server',
  });

  return labels;
}
