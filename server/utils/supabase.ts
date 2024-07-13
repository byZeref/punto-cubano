// @ts-expect-error --> Supabase is not a module, nuxt said
import { serverSupabaseClient } from '#supabase/server'
import type { H3Event } from "h3";

export const useSupabase = async (event: H3Event) => {
  const client = await serverSupabaseClient(event)


  return { client }
}