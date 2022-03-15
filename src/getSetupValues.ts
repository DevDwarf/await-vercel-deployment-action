import * as core from '@actions/core'
import * as github from '@actions/github'

import {
  SetupValues
} from "./types"

/**
 * Retrieves all needed information to use for the action
 */
const getSetupValues = (): SetupValues => ({
  sha: github.context.payload.after,
  waitFor: +core.getInput("wait-for") * 1000,
  projectId: core.getInput("project-id", {
    required: true
  }),
  accessToken: core.getInput("access-token",{
    required: true
  })
})

export { getSetupValues }
