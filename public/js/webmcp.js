// WebMCP tool registration for browser-based agents.
(function () {
  function normalizePath(inputPath) {
    if (typeof inputPath !== "string") return null;

    var trimmed = inputPath.trim();
    if (!trimmed) return null;

    try {
      var asUrl = new URL(trimmed, window.location.origin);
      if (asUrl.origin !== window.location.origin) return null;
      return asUrl.pathname + asUrl.search + asUrl.hash;
    } catch (error) {
      return null;
    }
  }

  function countMatches(haystack, needle) {
    if (!needle) return 0;

    var count = 0;
    var index = 0;
    var source = haystack.toLowerCase();
    var query = needle.toLowerCase();

    while (index < source.length) {
      var foundAt = source.indexOf(query, index);
      if (foundAt === -1) break;
      count += 1;
      index = foundAt + query.length;
    }

    return count;
  }

  function getTextContent() {
    var root = document.querySelector("main") || document.body;
    return root ? root.textContent || "" : "";
  }

  function openSearchDialog() {
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
    } catch (error) {
      // no-op
    }
  }

  function getTools() {
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
              description: "A site-relative path to navigate to.",
            },
          },
          required: ["path"],
          additionalProperties: false,
        },
        execute: async function (input) {
          var nextPath = normalizePath(input && input.path);
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
        execute: async function (input) {
          var query = (input && input.query ? String(input.query) : "").trim();
          if (!query) {
            return {
              ok: false,
              error: "Query is required.",
            };
          }

          var text = getTextContent();
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
        description:
          "Open the site's global search dialog.",
        inputSchema: {
          type: "object",
          properties: {},
          additionalProperties: false,
        },
        execute: async function () {
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
  }

  function registerWebMcpTools() {
    if (typeof window === "undefined" || typeof navigator === "undefined") return;

    var modelContext = navigator.modelContext;
    if (!modelContext) return;

    var tools = getTools();

    if (typeof modelContext.registerTool === "function") {
      var controller = new AbortController();

      tools.forEach(function (tool) {
        try {
          modelContext.registerTool(tool, { signal: controller.signal });
        } catch (error) {
          // Ignore duplicate or unsupported registration errors to keep page stable.
        }
      });

      window.addEventListener(
        "pagehide",
        function () {
          controller.abort();
        },
        { once: true },
      );

      return;
    }

    if (typeof modelContext.provideContext === "function") {
      try {
        modelContext.provideContext({ tools: tools });
      } catch (error) {
        // no-op
      }
    }
  }

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
