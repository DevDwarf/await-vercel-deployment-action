/**
 * Defines the state types
 */
interface StateInterface {
  /**
   * The commit sha, this is used to find the correct deployment
   */
  sha: string
  /**
   * Max timeout in seconds (default is 120)
   */
  waitFor: number
  /**
   * Vercel API base url
   */
  baseUrl: string
  /**
   * The unique identifier for the targeted project
   */
  projectId: string
  /**
   * The unique identifier for a Vercel team
   */
  teamId: string
  /**
   * Vercel API access token
   */
  accessToken: string

  /**
   * Ensure SHA is found and valid
   */
  validateSha(): string
}

export { StateInterface }
