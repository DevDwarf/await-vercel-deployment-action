import * as core from '@actions/core'
import * as github from '@actions/github'

import { getSetupValues } from "./getSetupValues"

/**
 *  Initiates the Action
 */
const initAwaitForVercelDeployment = async (): Promise<void> => {
  const {
    sha,
    waitFor,
    projectId,
    accessToken
  } = getSetupValues()
  core.info(`Awaiting deployment for project with Id: ${projectId}`)

  try {
    core.setOutput("deployment", { test:"Hello" })
  } catch (error: any){
    core.setFailed(error.message)
  }
}

initAwaitForVercelDeployment()
