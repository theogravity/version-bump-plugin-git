import CliBumpStrategy from './CliBumpStrategy'

export function getStrategies () {
  return [{
    name: 'cli',
    fn: CliBumpStrategy,
    description: CliBumpStrategy.description
  }]
}
