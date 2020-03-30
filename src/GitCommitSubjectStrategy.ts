import util from 'util'

import {
  BaseVersionStrategy,
  bumpVersionData,
  BUMP_LEVEL,
  IVersionBump
} from '@theo.gravity/version-bump'

import { getLastCommit } from 'git-last-commit'

const getLastCommitAsync = util.promisify(getLastCommit)

/**
 * Performs a version bump if the git commit subject contains the following:
 * - [major]
 * - [minor]
 * - [patch]
 * - [pre-release] Bumps the pre version for the first found integer version
 * - [build-release] Bumps the build version for the first found integer version
 *
 * If there are no tags defined, then the lowest level is assumed.
 *
 * See https://github.com/asamuzaK/semverParser#parsesemverversion-strict for more information.
 */
export default class GitCommitSubjectStrategy extends BaseVersionStrategy {
  static strategyShortName = 'git-commit-subj'

  static getCommandConfig () {
    return {
      command: GitCommitSubjectStrategy.strategyShortName,
      describe: `Uses the last git commit subject to determine the bump level. Will bump based on the following text:
        
          * [major]
          * [minor]
          * [patch]
          * [pre-major]
          * [pre-minor]
          * [pre-patch]
          * [pre-release]
          * [build-release]
        
        Default is the lowest version possible.`
    }
  }

  /**
   * Returns the next release version to update the versionFile with.
   */
  async getNextVersion (): Promise<IVersionBump.ParsedSemVerResult> {
    // get the last commit message
    const lastCommit = await getLastCommitAsync()
    // analyze the commit message to determine what bump level to use
    const bumpLevel = this._determineBumpLevel(lastCommit.subject)
    // get the current version manifest
    let versionData = this.getCurrentVersion()
    // bump the manifest based on the bump level
    return bumpVersionData(versionData, bumpLevel, {
      logger: this.getLogger()
    })
  }

  _determineBumpLevel (message): BUMP_LEVEL {
    if (!message || typeof message !== 'string') {
      return BUMP_LEVEL.LOWEST
    }

    if (message.includes('[major]')) {
      return BUMP_LEVEL.MAJOR
    }

    if (message.includes('[minor]')) {
      return BUMP_LEVEL.MINOR
    }

    if (message.includes('[patch]')) {
      return BUMP_LEVEL.PATCH
    }

    if (message.includes('[pre-major]')) {
      return BUMP_LEVEL.PRE_MAJOR
    }

    if (message.includes('[pre-minor]')) {
      return BUMP_LEVEL.PRE_MINOR
    }

    if (message.includes('[pre-patch]')) {
      return BUMP_LEVEL.PRE_PATCH
    }

    if (message.includes('[pre-release]')) {
      return BUMP_LEVEL.PRE_RELEASE
    }

    if (message.includes('[build-release]')) {
      return BUMP_LEVEL.BUILD_RELEASE
    }

    return BUMP_LEVEL.LOWEST
  }
}
