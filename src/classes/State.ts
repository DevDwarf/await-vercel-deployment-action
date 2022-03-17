import * as core from "@actions/core"
import * as github from "@actions/github"

import {
  GithubInterface,
  StateInterface
} from "../types"
import config from "../config"

/**
 * Contains the state for the action
 */
class State implements StateInterface {
  public sha
  public teamId
  public waitFor
  public baseUrl
  public projectId
  public accessToken

  constructor() {
    this.sha = ""
    this.baseUrl = config.VERCEL_BASE_ENDPOINT
    this.teamId = core.getInput("team-id")
    this.waitFor = +core.getInput("wait-for") * 1000
    this.projectId = core.getInput("project-id", {
      required: true
    })
    this.accessToken = core.getInput("access-token", {
      required: true
    })
  }

  public validateSha(): string {
    const gh = github as unknown as GithubInterface

    if(gh.context.payload?.head_commit){
      return gh.context.payload.head_commit.id
    }

    if(gh.context.payload?.pull_request){
      return gh.context.payload.pull_request.head.sha
    }

    throw new Error("SHA cannot be retrieved")
  }
}

export default State
