import React, { Component } from 'react';
import isEmpty from 'lodash/isEmpty';
import _map from 'lodash/map';
import _sortBy from 'lodash/sortBy';
import 'isomorphic-fetch';

function fetchGithubData(cb) {
  let reposRaw = [];
  let pageNum = 1;
  const maxPage = 1;
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
      // `https://api.github.com/users/omardelarosa/repos?page=${pageNum}`
      '/assets/json/github.json'
    )
      .then(handleFetch)
      .then(handleJSON);
  };

  fetchGithubPage();
}

function processGHData(repos, ctx) {
  const languages = repos.reduce((acc, repo) => {
    const lang = repo.language || 'Other';
    if (!acc[lang]) {
      acc[lang] = 1;
    } else {
      acc[lang] += 1;
    }
    return acc;
  }, {});
  ctx.setState({
    languages,
    repos
  });
}

function lengthOrMax(list, max, scale = 1, shift = 0) {
  return (list.length * scale) + shift <= max ? (list.length * scale) + shift : max;
}

function getContributionRatio(repos = [], value = 0) {
  return value / repos.length;
}

class CodeStats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      languages: {},
      repos: []
    };
  }

  componentWillMount() {
    fetchGithubData((err, githubData) => {
      if (err) {
        throw err;
      }
      processGHData(githubData, this);
    });
  }

  render() {
    const {
      state: {
        languages,
        repos
      },
      props: {
        headingText,
        descriptionText
      }
    } = this;
    const langsAndCounts = Object.keys(languages)
      .map((langName) => {
        return {
          language: langName,
          count: languages[langName]
        };
      });
    const sortedLangs = _sortBy(langsAndCounts, [ 'count' ]).reverse();
    return (
      <div className='code-stats'>
        <h2 className='code-stats__heading'>{ headingText }</h2>
        <div className='code-stats__description'>
          { descriptionText }
        </div>
        {
          sortedLangs.map(({ language, count }) => {
            const contributionRatio = getContributionRatio(repos, count);
            const bg = [
              'rgb(',
              `${Math.trunc(contributionRatio * 20) || ''}0,`,
              `${Math.trunc(contributionRatio * 255) || ''}0,`,
              '0)'
            ].join('');
            const truncatedInverseRatio = Math.trunc(
              (1 - contributionRatio) * 255
            );
            const fontColor = [
              'rgb(',
              `${truncatedInverseRatio},`,
              `${truncatedInverseRatio},`,
              `${truncatedInverseRatio}`,
              ')'
            ].join('');
            return (
              <p
                className='code-stats__language'
                key={ `code-stats__language__${language}` }
                style={{
                  backgroundColor: bg,
                  color: fontColor,
                  width: `${Number(((count / repos.length) * 80) + 20)}%`
                }}
                >
                <span className='code-stats__language--name'>
                  { language }
                </span>
                <span className='code-stats__language--count'>
                  { `${count} repo${count === 1 ? '' : 's'}` }
                </span>
              </p>
            );
          })
        }
      </div>
    );
  }

  static get defaultProps () {
    return {
      headingText: 'Language Statistics',
      descriptionText: 'A language-by-language breakdown of my open-source contributions on GitHub.'
    };
  }
}

export default CodeStats;
