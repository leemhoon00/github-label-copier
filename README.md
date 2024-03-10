# Github Label Copier

`github-label-copier` is a simple tool to copy labels from one repository, either your own or someone else's, to your own repository.

## Usage

### Installation

```bash
npm install github-label-copier
```

### Import

```javascript
const { createCopier } = require('github-label-copier'); // JS
import { createCopier } from 'github-label-copier'; // TS
```

### Initialization

```javascript
const copier = createCopier(YOUR_GITHUB_TOKEN);
```

### Copy Labels

```javascript
copier.copyLabels({
  from: 'https://github.com/{OWNER}/{REPO}', // Source repository
  to: 'https://github.com/{OWNER}/{REPO}', // Destination repository
});
```

### Get Labels

```javascript
const labels = await copier.getLabels({
  url: 'https://github.com/freeCodeCamp/freeCodeCamp',
});
console.log(labels);
```

### Save Labels

```javascript
copier.saveLabels({
  url: 'https://github.com/Owner/Repo',
  format: 'json', // 'json' | 'yaml', Default: 'json'
});
```

### Push Labels by Json or Yaml

```yaml
# labels.yaml

- name: 'docs :books:'
  color: FFCACC
  description: docs label
- name: 'feat :sparkles:'
  color: CBFFA9
  description: add new feature
- name: 'test :white_check_mark:'
  color: DBC4F0
  description: add test
```

```javascript
const dotenv = require('dotenv');
dotenv.config();
const { createCopier } = require('../github-label-copier');

const token = process.env.GITHUB_TOKEN;

const copier = createCopier(token);

async function main() {
  copier.pushLabels({
    filename: 'labels.yaml',
    url: 'https://github.com/leemhoon00/github-label-copier',
  });
}

main();
```
