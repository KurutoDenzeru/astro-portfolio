import type { APIRoute } from "astro";
import { getAgentSkillArtifact } from "../../../../lib/agentSkills";

export const GET: APIRoute = ({ params }) => {
	const skill = params.skill ? getAgentSkillArtifact(params.skill) : undefined;

	if (!skill) {
		return new Response("Skill not found", {
			status: 404,
			headers: {
				"Content-Type": "text/plain; charset=utf-8",
			},
		});
	}

	return new Response(skill.content, {
		status: 200,
		headers: {
			"Content-Type": "text/markdown; charset=utf-8",
			"Cache-Control": "public, max-age=3600",
		},
	});
};
