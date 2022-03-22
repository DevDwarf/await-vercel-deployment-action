import axios from "axios"
import * as core from "@actions/core"

import State from "./classes/State"
import Vercel from "./classes/Vercel"

/**
 *  Initiates the Action
 */
const initAwaitForVercelDeployment = async (): Promise<void> => {
  try {
    const stateObject = new State()
    const {
      sha,
      teamId,
      waitFor,
      baseUrl,
      projectId,
      accessToken
    } = stateObject
    core.info(`Awaiting deployment for project with Id: ${projectId}`)

    core.info(`Ready with sha: ${sha}`)
    core.info(`Ready with teamId: ${teamId}`)
    core.info(`Ready with waitFor: ${waitFor}`)
    core.info(`Ready with baseUrl: ${baseUrl}`)

    const request = axios.create({
      baseURL: baseUrl,
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })

    core.info(`Request built with token: ${accessToken}`)

    const vercelObject = new Vercel(request, {
      sha,
      teamId,
      waitFor,
      projectId,
    })

    core.info(`Vercel client ready`)

    const deployment = await vercelObject.awaitDeployment()

    core.setOutput("deployment", deployment)
  } catch (error: any) {
    core.error(error)
    core.setFailed(error.message)
  }
}

initAwaitForVercelDeployment()
