/** Parse fetch response as JSON; surface HTML error pages with a readable message. */
export async function parseJsonResponse<T extends Record<string, unknown>>(
  response: Response,
): Promise<T> {
  const text = await response.text();

  if (!text) {
    return {} as T;
  }

  try {
    return JSON.parse(text) as T;
  } catch {
    const isHtml = text.trimStart().startsWith("<!");
    const preview = text.replace(/\s+/g, " ").slice(0, 160);

    if (isHtml) {
      throw new Error(
        `Server returned an HTML error page (HTTP ${response.status}). The /api/upload route may have crashed — check Netlify function logs and R2 environment variables (R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_ENDPOINT).`,
      );
    }

    throw new Error(`Invalid server response: ${preview}`);
  }
}
