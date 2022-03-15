/**
 * Defines the configuration types
 */
interface SetupValues {
  /**
   * The commit sha, this is used to find the correct deployment
   */
  sha: string
  /**
   * Max timeout in seconds (default is 120)
   */
  waitFor: number
  /**
   * The unique identifier for the targeted project
   */
  projectId: string
  /**
   * Vercel API access token
   */
  accessToken: string
}

export { SetupValues }
