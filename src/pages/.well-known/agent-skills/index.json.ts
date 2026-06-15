import type { APIRoute } from "astro";
import { jsonResponse } from "../../../lib/agentDiscovery";
import { getAgentSkillsIndex } from "../../../lib/agentSkills";

export const GET: APIRoute = () => jsonResponse(getAgentSkillsIndex());
