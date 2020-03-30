/* eslint-env jest */

import GitCommitSubjectStrategy from '../GitCommitSubjectStrategy'
import { getLastCommit } from 'git-last-commit'

jest.mock('git-last-commit', function () {
  return {
    getLastCommit: jest.fn()
  }
})

describe('GitCommitSubjectStrategy', () => {
  it('should bump the major version', async () => {
    // @ts-ignore
    getLastCommit.mockImplementationOnce(cb => {
      cb(null, {
        subject: '[major]'
      })
    })
    const s = new GitCommitSubjectStrategy({})

    await s.init({ currentVersion: '1.2.3' })

    const versionData = await s.getNextVersion()

    expect(versionData).toEqual({
      build: undefined,
      major: 2,
      minor: 0,
      patch: 0,
      pre: undefined,
      matches: true,
      version: '2.0.0'
    })
  })

  it('should bump the major version 2', async () => {
    // @ts-ignore
    getLastCommit.mockImplementationOnce(cb => {
      cb(null, {
        subject: '[major]'
      })
    })
    const s = new GitCommitSubjectStrategy({})
    await s.init({ currentVersion: '1.2.3-pre.1' })

    const versionData = await s.getNextVersion()

    expect(versionData).toEqual({
      build: undefined,
      major: 1,
      minor: 2,
      patch: 3,
      pre: undefined,
      matches: true,
      version: '1.2.3'
    })
  })

  it('should bump the minor version', async () => {
    // @ts-ignore
    getLastCommit.mockImplementationOnce(cb => {
      cb(null, {
        subject: '[minor]'
      })
    })
    const s = new GitCommitSubjectStrategy({})
    await s.init({ currentVersion: '1.2.3' })

    const versionData = await s.getNextVersion()

    expect(versionData).toEqual({
      build: undefined,
      major: 1,
      minor: 3,
      patch: 0,
      pre: undefined,
      matches: true,
      version: '1.3.0'
    })
  })

  it('should bump the patch version', async () => {
    // @ts-ignore
    getLastCommit.mockImplementationOnce(cb => {
      cb(null, { subject: '[patch]' })
    })
    const s = new GitCommitSubjectStrategy({})
    await s.init({ currentVersion: '1.2.3' })

    const versionData = await s.getNextVersion()

    expect(versionData).toEqual({
      build: undefined,
      major: 1,
      minor: 2,
      patch: 4,
      pre: undefined,
      matches: true,
      version: '1.2.4'
    })
  })

  it('should bump the pre major version', async () => {
    // @ts-ignore
    getLastCommit.mockImplementationOnce(cb => {
      cb(null, { subject: '[pre-major]' })
    })
    const s = new GitCommitSubjectStrategy({})
    await s.init({ currentVersion: '1.2.3' })

    const versionData = await s.getNextVersion()

    expect(versionData).toEqual({
      build: undefined,
      major: 2,
      minor: 0,
      patch: 0,
      pre: [0],
      matches: true,
      version: '2.0.0-0'
    })
  })

  it('should bump the pre minor version', async () => {
    // @ts-ignore
    getLastCommit.mockImplementationOnce(cb => {
      cb(null, { subject: '[pre-minor]' })
    })
    const s = new GitCommitSubjectStrategy({})
    await s.init({ currentVersion: '1.2.3' })

    const versionData = await s.getNextVersion()

    expect(versionData).toEqual({
      build: undefined,
      major: 1,
      minor: 3,
      patch: 0,
      pre: [0],
      matches: true,
      version: '1.3.0-0'
    })
  })

  it('should bump the pre patch version', async () => {
    // @ts-ignore
    getLastCommit.mockImplementationOnce(cb => {
      cb(null, { subject: '[pre-patch]' })
    })
    const s = new GitCommitSubjectStrategy({})
    await s.init({ currentVersion: '1.2.3' })

    const versionData = await s.getNextVersion()

    expect(versionData).toEqual({
      build: undefined,
      major: 1,
      minor: 2,
      patch: 4,
      pre: [0],
      matches: true,
      version: '1.2.4-0'
    })
  })

  it('should bump the pre version', async () => {
    // @ts-ignore
    getLastCommit.mockImplementationOnce(cb => {
      cb(null, { subject: '[pre-release]' })
    })
    const s = new GitCommitSubjectStrategy({})
    await s.init({ currentVersion: '1.2.3' })

    const versionData = await s.getNextVersion()

    expect(versionData).toEqual({
      build: undefined,
      major: 1,
      minor: 2,
      patch: 4,
      pre: [0],
      matches: true,
      version: '1.2.4-0'
    })
  })

  it('should bump the pre version 2', async () => {
    // @ts-ignore
    getLastCommit.mockImplementationOnce(cb => {
      cb(null, { subject: '[pre-release]' })
    })
    const s = new GitCommitSubjectStrategy({})
    await s.init({ currentVersion: '1.2.3-pre.1' })

    const versionData = await s.getNextVersion()

    expect(versionData).toEqual({
      build: undefined,
      major: 1,
      minor: 2,
      patch: 3,
      pre: ['pre', 2],
      matches: true,
      version: '1.2.3-pre.2'
    })
  })

  it('should bump the build version', async () => {
    // @ts-ignore
    getLastCommit.mockImplementationOnce(cb => {
      cb(null, { subject: '[build-release]' })
    })
    const s = new GitCommitSubjectStrategy({})
    await s.init({ currentVersion: '1.2.3' })

    const versionData = await s.getNextVersion()

    expect(versionData).toEqual({
      build: [0],
      major: 1,
      minor: 2,
      patch: 3,
      pre: undefined,
      matches: true,
      version: '1.2.3+0'
    })
  })

  it('should bump the build version 2', async () => {
    // @ts-ignore
    getLastCommit.mockImplementationOnce(cb => {
      cb(null, { subject: '[build-release]' })
    })
    const s = new GitCommitSubjectStrategy({})
    await s.init({ currentVersion: '1.2.3-pre.1' })

    const versionData = await s.getNextVersion()

    expect(versionData).toEqual({
      build: [0],
      major: 1,
      minor: 2,
      patch: 3,
      pre: ['pre', 1],
      matches: true,
      version: '1.2.3-pre.1+0'
    })
  })
})
