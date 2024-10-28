import type { IncomingMessage, ServerResponse } from "node:http"
import { promises as fs } from "node:fs"
import { join } from "node:path"

export async function get(req: IncomingMessage, res: ServerResponse) {
	const filePath = join(process.cwd(), "src/assets/Resume.pdf")
	const fileContents = await fs.readFile(filePath)

	res.setHeader("Content-Type", "application/pdf")
	res.setHeader("Content-Disposition", "attachment; filename=Resume.pdf")
	res.end(fileContents)
}
