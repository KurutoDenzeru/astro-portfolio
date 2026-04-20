import { createHash } from "node:crypto";

export type AgentSkillArtifact = {
	name: string;
	description: string;
	content: string;
};

const SITE_NAVIGATION_SKILL = `---
name: site-navigation
description: Navigate the portfolio site and jump directly to key sections.
---

# Site Navigation

Use this skill when you need to move around the portfolio quickly.

## Key routes

- Home: /
- Work: /work
- Projects: /projects
- API docs: /docs/api

## Guidance

- Prefer direct route navigation when a destination is known.
- Use /projects when you need implementation examples.
- Use /docs/api for machine-readable discovery endpoints.
`;

const API_DISCOVERY_SKILL = `---
name: api-discovery
description: Discover machine-readable API, OAuth, and agent metadata exposed by the site.
---

# API Discovery

Use this skill when you need to locate machine-readable metadata for agents.

## Discovery endpoints

- API catalog: /.well-known/api-catalog
- OpenAPI description: /openapi.json
- OAuth/OIDC discovery:
	- /.well-known/openid-configuration
	- /.well-known/oauth-authorization-server
- OAuth protected resource metadata: /.well-known/oauth-protected-resource
- MCP server card: /.well-known/mcp/server-card.json
- Agent skills index: /.well-known/agent-skills/index.json

## Notes

- Prefer /.well-known/api-catalog as the primary machine discovery entry point.
- Use /docs/api for human-readable guidance.
`;

const SKILL_ARTIFACTS: Record<string, AgentSkillArtifact> = {
	"site-navigation": {
		name: "site-navigation",
		description: "Navigate the portfolio site and jump directly to key sections.",
		content: SITE_NAVIGATION_SKILL,
	},
	"api-discovery": {
		name: "api-discovery",
		description:
			"Discover machine-readable API, OAuth, and agent metadata exposed by the site.",
		content: API_DISCOVERY_SKILL,
	},
};

export function getAgentSkillArtifact(skillName: string): AgentSkillArtifact | undefined {
	return SKILL_ARTIFACTS[skillName];
}

export function getAgentSkillsIndex() {
	const skills = Object.values(SKILL_ARTIFACTS).map((skill) => ({
		name: skill.name,
		type: "skill-md" as const,
		description: skill.description,
		url: `/.well-known/agent-skills/${skill.name}/SKILL.md`,
		digest: `sha256:${createHash("sha256").update(skill.content).digest("hex")}`,
	}));

	return {
		$schema: "https://schemas.agentskills.io/discovery/0.2.0/schema.json",
		skills,
	};
}
