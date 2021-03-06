import * as core from "@actions/core"

/**
 * Vercel API connector
 */
class Vercel {
  private sha
  private teamId
  private request
  private waitFor
  private projectId

  constructor(request, {
    sha,
    teamId,
    waitFor,
    projectId,
  }) {
    this.sha = sha
    this.teamId = teamId
    this.request = request
    this.waitFor = waitFor
    this.projectId = projectId
  }

  public wait(time) {
    return new Promise(resolve =>
      setTimeout(resolve, time * 1000)
    )
  }

  public async awaitDeployment() {
    const cutOffTime = new Date().getTime() + this.waitFor

    while (new Date().getTime() < cutOffTime) {
      const response = await this.request.get('/v6/deployments', {
        params: {
          projectId: this.projectId,
          "meta-githubCommitSha": this.sha,
          ...(this.teamId && { teamId: this.teamId })
        }
      })
      const data = response.data?.deployments || []

      const hasNoData = data.length < 1
      const isStillBuilding = hasNoData || data[0].buildingAt === data[0].ready

      if (isStillBuilding) {
        core.info("Deployment not yet ready, will retry in 2 seconds")
        await this.wait(2)
        continue
      }

      core.info(`Deployment found`)
      return data[0]
    }

    throw new Error(`Timeout limit was reached before a deployment was found`)
  }
}

export default Vercel
