/* eslint-disable no-use-before-define */
import isEmpty from 'lodash/isEmpty';

function fetchGithubData(cb) {
  let reposRaw = [];
  let pageNum = 1;
  const maxPage = 3;
  const handleFetch = (res) => {
    if (res.status >= 400) {
      // TODO: handle errors
      return cb(null, reposRaw);
    }
    return res.json();
  };

  const handleJSON = (json) => {
    if (isEmpty(json)) return cb(null, reposRaw);
    reposRaw = [ ...reposRaw, ...json ];
    pageNum += 1;
    if (pageNum < maxPage) {
      return fetchGithubPage();
    } else {
      return cb(null, reposRaw);
    }
  };

  const fetchGithubPage = () => {
    fetch(
      `https://api.github.com/users/omardelarosa/repos?page=${pageNum}`
    )
      .then(handleFetch)
      .then(handleJSON);
  };

  fetchGithubPage();
}

console.log('Coming Soon');

// fetchGithubData((err, githubData) => {
//   if (err) {
//     throw err;
//   }
//   console.log('GH', githubData);
// });
