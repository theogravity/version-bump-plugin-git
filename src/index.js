import GitCommitMessageStrategy from './GitCommitMessageStrategy'

export function getStrategies () {
  return [{
    fn: GitCommitMessageStrategy
  }]
}
