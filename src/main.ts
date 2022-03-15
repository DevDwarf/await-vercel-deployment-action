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

    const request = axios.create({
      baseURL: baseUrl,
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })

    const vercelObject = new Vercel(request, {
      sha,
      teamId,
      waitFor,
      projectId,
    })

    const deployment = await vercelObject.awaitDeployment()

    core.setOutput("deployment", deployment)
  } catch (error: any) {
    core.setFailed(error.message)
  }
}

initAwaitForVercelDeployment()
