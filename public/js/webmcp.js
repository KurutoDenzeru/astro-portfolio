// WebMCP tool registration for browser-based agents.
(() => {
  const normalizePath = (inputPath) => {
    if (typeof inputPath !== "string") return null;

    const trimmed = inputPath.trim();
    if (!trimmed) return null;

    try {
      const asUrl = new URL(trimmed, window.location.origin);
      if (asUrl.origin !== window.location.origin) return null;
      return asUrl.pathname + asUrl.search + asUrl.hash;
    } catch (_error) {
      return null;
    }
  };

  const countMatches = (haystack, needle) => {
    if (!needle) return 0;

    let count = 0;
    let index = 0;
    const source = haystack.toLowerCase();
    const query = needle.toLowerCase();

    while (index < source.length) {
      const foundAt = source.indexOf(query, index);
      if (foundAt === -1) break;
      count += 1;
      index = foundAt + query.length;
    }

    return count;
  };

  const getTextContent = () => {
    const root = document.querySelector("main") || document.body;
    return root ? root.textContent || "" : "";
  };

  const openSearchDialog = () => {
    try {
      document.dispatchEvent(
        new KeyboardEvent("keydown", {
          key: "k",
          metaKey: true,
          bubbles: true,
          cancelable: true,
        }),
      );
      document.dispatchEvent(
        new KeyboardEvent("keydown", {
          key: "k",
          ctrlKey: true,
          bubbles: true,
          cancelable: true,
        }),
      );
    } catch (_error) {
      // no-op
    }
  };

  const getTools = () => {
    return [
      {
        name: "site.navigate",
        description:
          "Navigate to an internal page on this site by path, such as /projects or /work.",
        inputSchema: {
          type: "object",
          properties: {
            path: {
              type: "string",
              description: "Relative path starting with /, e.g. /projects or /work/some-project.",
            },
          },
          required: ["path"],
          additionalProperties: false,
        },
        execute: async (input) => {
          const nextPath = normalizePath(input?.path);
          if (!nextPath) {
            return {
              ok: false,
              error: "Invalid path. Use a path on the current origin, e.g. /projects.",
            };
          }

          window.location.assign(nextPath);

          return {
            ok: true,
            navigatedTo: nextPath,
          };
        },
        annotations: {
          readOnlyHint: false,
        },
      },
      {
        name: "site.find_text",
        description:
          "Search visible page content and return the number of matches for a query string.",
        inputSchema: {
          type: "object",
          properties: {
            query: {
              type: "string",
              description: "Text to search for in the current page content.",
            },
          },
          required: ["query"],
          additionalProperties: false,
        },
        execute: async (input) => {
          const query = (input?.query ? String(input.query) : "").trim();
          if (!query) {
            return {
              ok: false,
              error: "Query is required.",
            };
          }

          const text = getTextContent();
          return {
            ok: true,
            query: query,
            matches: countMatches(text, query),
          };
        },
        annotations: {
          readOnlyHint: true,
        },
      },
      {
        name: "site.open_search",
        description: "Open the site's global search dialog.",
        inputSchema: {
          type: "object",
          properties: {},
          additionalProperties: false,
        },
        execute: async () => {
          openSearchDialog();
          return {
            ok: true,
            message: "Search dialog open command dispatched.",
          };
        },
        annotations: {
          readOnlyHint: false,
        },
      },
    ];
  };

  const registerWebMcpTools = () => {
    if (typeof window === "undefined" || typeof navigator === "undefined") return;

    const modelContext = navigator.modelContext;
    if (!modelContext) return;

    const tools = getTools();

    if (typeof modelContext.registerTool === "function") {
      const controller = new AbortController();

      tools.forEach((tool) => {
        try {
          modelContext.registerTool(tool, { signal: controller.signal });
        } catch (_error) {
          // Ignore duplicate or unsupported registration errors to keep page stable.
        }
      });

      window.addEventListener(
        "pagehide",
        () => {
          controller.abort();
        },
        { once: true },
      );

      return;
    }

    if (typeof modelContext.provideContext === "function") {
      try {
        modelContext.provideContext({ tools: tools });
      } catch (_error) {
        // no-op
      }
    }
  };

  if (typeof document !== "undefined") {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", registerWebMcpTools, {
        once: true,
      });
    } else {
      registerWebMcpTools();
    }

    document.addEventListener("astro:after-swap", registerWebMcpTools);
  }
})();
