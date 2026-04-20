import type { APIRoute } from "astro";
import { getAgentSkillsIndex } from "../../../lib/agentSkills";
import { jsonResponse } from "../../../lib/agentDiscovery";

export const GET: APIRoute = () => jsonResponse(getAgentSkillsIndex());
