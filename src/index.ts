import { Octokit } from '@octokit/rest';

export async function getLabels(authToken: string) {
  const octokit = new Octokit({
    auth: authToken,
  });

  const labels = await octokit.issues.listLabelsForRepo({
    owner: 'leemhoon00',
    repo: 'typevocab-server',
  });

  return labels;
}
