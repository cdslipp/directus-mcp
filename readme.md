# Directus Content MCP Server

The [Model Context Protocol](https://modelcontextprotocol.io/introduction) (MCP) is a standard for helping AI tools and
LLMs talk to applications and services like Directus.

The Directus Content MCP Server is an interface for Directus users to interact with their data in LLMs. Some good use
cases are:

- **Content Editors**: build custom pages, write blog posts, update content, organize assets and more inside your
  Directus project.
- **Data Analysts**: query collections, generate reports, analyze trends, and extract insights from your Directus data
  using natural language.

It intentionally limits destructive actions that would result in really bad outcomes like data loss from deleting fields
or deleting collections.

We plan to provide more tools for developers who are working with local / development Directus projects in future
releases and potentially as a separate package to help further prevent data loss.

## Installation

### Prerequisites

- An existing Directus project

If you don't have an existing Directus project, you can get started with a free trial on
[Directus Cloud](https://directus.cloud/register) at https://directus.cloud/register

OR

You can spin up a sample Directus instance locally with the following terminal command.

```
npx directus-template-cli@latest init
```

### Step 1. Get Directus Credentials

You can use email and password or generate a static token to connect the MCP to your Directus instance.

To get a static access token:

1. Login to your Directus instnace
2. Go to the User Directory and choose your own user profile
3. Scroll down to the Token field
4. Generate token and copy it
5. Save the user (do NOT forget to save because you’ll get an error that shows Invalid token!)

### Step 2. Configure the MCP in your AI Tool

#### Claude Desktop

1. Open [Claude Desktop](https://claude.ai/download) and navigate to Settings.

2. Under the Developer tab, click Edit Config to open the configuration file.

3. Add the following configuration:

   ```json
   {
   	"mcpServers": {
   		"directus": {
   			"command": "npx",
   			"args": ["@directus/content-mcp@latest"],
   			"env": {
   				"DIRECTUS_URL": "https://your-directus-url.com",
   				"DIRECTUS_TOKEN": "your-directus-token>"
   			}
   		}
   	}
   }
   ```

   or if you're using email and password

   ```json
   {
   	"mcpServers": {
   		"directus": {
   			"command": "npx",
   			"args": ["@directus/content-mcp@latest"],
   			"env": {
   				"DIRECTUS_URL": "https://your-directus-url.com",
   				"DIRECTUS_USER_EMAIL": "john@example.com",
   				"DIRECTUS_USER_PASSWORD": "your-password"
   			}
   		}
   	}
   }
   ```
   Make sure you replace the placeholder values with your URL and credentials.

4. Save the configuration file and restart Claude desktop.

5. From the new chat screen, you should see an icon appear with the Directus MCP server.

#### Cursor

1. Open [Cursor](https://docs.cursor.com/context/model-context-protocol) and create a .cursor directory in your project
   root if it doesn't exist.

2. Create a `.cursor/mcp.json` file if it doesn't exist and open it.

3. Add the following configuration:

   ```json
   {
   	"mcpServers": {
   		"directus": {
   			"command": "npx",
   			"args": ["@directus/content-mcp@latest"],
   			"env": {
   				"DIRECTUS_URL": "https://your-directus-url.com",
   				"DIRECTUS_TOKEN": "your-directus-token>"
   			}
   		}
   	}
   }
   ```

   or if you're using email and password

   ```json
   {
   	"mcpServers": {
   		"directus": {
   			"command": "npx",
   			"args": ["@directus/content-mcp@latest"],
   			"env": {
   				"DIRECTUS_URL": "https://your-directus-url.com",
   				"DIRECTUS_USER_EMAIL": "john@example.com",
   				"DIRECTUS_USER_PASSWORD": "your-password"
   			}
   		}
   	}
   }
   ```

   Make sure you replace the placeholder values with your URL and credentials.

4. Save the configuration file.

5. Open Cursor and navigate to Settings/MCP. You should see a green active status after the server is successfully
   connected.

## Tools

The MCP Server provides the following tools to interact with your Directus instance:

| Tool                 | Description                                          | Use Cases                                                      |
| -------------------- | ---------------------------------------------------- | -------------------------------------------------------------- |
| **system-prompt**    | Provides context to the LLM assistant about its role | Start of a session to understand the system context            |
| **users-me**         | Get current user information                         | Understanding permissions, personalizing responses             |
| **read-collections** | Retrieve the schema of all collections               | Exploring database structure, understanding relationships      |
| **read-items**       | Fetch items from any collection                      | Retrieving content, searching for data, displaying information |
| **create-item**      | Create new items in collections                      | Adding new content, records, or entries                        |
| **update-item**      | Modify existing items                                | Editing content, updating statuses, correcting information     |
| **delete-item**      | Remove items from collections                        | Cleaning up outdated content                                   |
| **read-files**       | Access file metadata or raw content                  | Finding images, documents, or media assets                     |
| **import-file**      | Import files from URLs                               | Adding external media to your Directus instance                |
| **update-files**     | Update file metadata                                 | Organizing media, adding descriptions, tagging                 |
| **read-fields**      | Get field definitions for collections                | Understanding data structure, field types and validation       |
| **read-field**       | Get specific field information                       | Detailed field configuration                                   |
| **create-field**     | Add new fields to collections                        | Extending data models                                          |
| **update-field**     | Modify existing fields                               | Changing field configuration, interface options                |
| **read-flows**       | List available automation flows                      | Finding automation opportunities                               |
| **trigger-flow**     | Execute automation flows                             | Bulk operations, publishing, status changes                    |
| **read-permissions** | List all permission rules                            | Viewing access controls, auditing permissions                  |
| **read-permission**  | Get specific permission rule                         | Detailed permission inspection                                 |
| **create-permission**| Create a permission rule                             | Setting up access controls for collections                     |
| **create-permissions**| Create multiple permission rules                    | Bulk permission setup for new roles/policies                   |
| **update-permission**| Update a permission rule                             | Modifying access controls                                      |
| **update-permissions**| Update multiple permission rules                    | Bulk permission changes                                        |
| **delete-permission**| Delete a permission rule                             | Removing access controls                                       |
| **delete-permissions**| Delete multiple permission rules                    | Bulk permission removal                                        |
| **read-comments**    | View comments on items                               | Retrieving feedback, viewing discussion threads                |
| **upsert-comment**   | Add or update comments                               | Providing feedback, documenting decisions                      |
| **markdown-tool**    | Convert between markdown and HTML                    | Content formatting for WYSIWYG fields                          |
| **get-prompts**      | List available prompts                               | Discovering pre-configured prompt templates                    |
| **get-prompt**       | Execute a stored prompt                              | Using prompt templates for consistent AI interactions          |

### System Prompt

The MCP server comes with a system prompt that helps encourage the right tool use and provides guiderails for the LLM.
You can overwrite the default system prompt in your env configuration by setting the `MCP_SYSTEM_PROMPT` variable.

You can also disable the system prompt entirely if desired.

Just set `MCP_SYSTEM_PROMPT_ENABLED` to `false`

### Prompt Configuration

The MCP server supports dynamic prompts stored in a Directus collection. Prompts are not widely supported across MCP
Clients, but Claude Desktop does have support for them.

You can configure the following:

- `DIRECTUS_PROMPTS_COLLECTION_ENABLED`: Set to "true" to enable prompt functionality
- `DIRECTUS_PROMPTS_COLLECTION`: The name of the collection containing prompts
- `DIRECTUS_PROMPTS_NAME_FIELD`: Field name for the prompt name (default: "name")
- `DIRECTUS_PROMPTS_DESCRIPTION_FIELD`: Field name for the prompt description (default: "description")
- `DIRECTUS_PROMPTS_SYSTEM_PROMPT_FIELD`: Field name for the system prompt text (default: "system_prompt")
- `DIRECTUS_PROMPTS_MESSAGES_FIELD`: Field name for the messages array (default: "messages")

### Mustache Templating

Both system prompts and message content support mustache templating using the `{{ variable_name }}` syntax:

1. Define variables in your prompts using double curly braces: `Hello, {{ name }}!`
2. When calling a prompt, provide values for the variables in the `arguments` parameter
3. The MCP server will automatically replace all variables with their provided values

## Local / Dev Installation (Using Your Fork)

If you've forked or cloned this repository and made custom modifications (like the new permissions tools), follow these instructions to use your local version instead of the published NPM package.

### Prerequisites
1. Clone your forked repo: `git clone https://github.com/YOUR_USERNAME/directus-mcp.git`
2. Navigate to the directory: `cd directus-mcp`
3. Install dependencies: `pnpm install`
4. Build the project: `pnpm build`
5. Note the full path to your built file: `/path/to/your/directus-mcp/dist/index.js`

### Claude Desktop (Local Version)

1. Open Claude Desktop and navigate to Settings
2. Under the Developer tab, click Edit Config
3. Add the following configuration (replace paths with your actual paths):

```json
{
	"mcpServers": {
		"directus": {
			"command": "node",
			"args": ["/Users/YOUR_USERNAME/path/to/directus-mcp/dist/index.js"],
			"env": {
				"DIRECTUS_URL": "https://your-directus-url.com",
				"DIRECTUS_TOKEN": "your-directus-token"
			}
		}
	}
}
```

4. Save and restart Claude Desktop

### Cursor (Local Version)

1. Create a `.cursor` directory in your project root if it doesn't exist
2. Create a `.cursor/mcp.json` file with:

```json
{
	"mcpServers": {
		"directus": {
			"command": "node",
			"args": ["/Users/YOUR_USERNAME/path/to/directus-mcp/dist/index.js"],
			"env": {
				"DIRECTUS_URL": "https://your-directus-url.com",
				"DIRECTUS_TOKEN": "your-directus-token"
			}
		}
	}
}
```

3. Save the file and restart Cursor
4. Check Settings → MCP to verify the connection

### Raycast (Local Version)

1. Open Raycast and search for "MCP Servers"
2. Select "Install Server" from the MCP Servers menu
3. Use this configuration:

```json
{
	"mcpServers": {
		"directus": {
			"command": "node",
			"args": ["/Users/YOUR_USERNAME/path/to/directus-mcp/dist/index.js"],
			"env": {
				"DIRECTUS_URL": "https://your-directus-url.com",
				"DIRECTUS_TOKEN": "your-directus-token"
			}
		}
	}
}
```

4. Press Command+Enter to install

### Development Mode (Auto-rebuild)

For active development with auto-rebuild on file changes:

1. In your directus-mcp directory, run: `pnpm dev`
2. This will watch for changes and automatically rebuild
3. Your MCP clients will use the latest built version (you may need to restart them after changes)

### Example: Full Local Dev Configuration

Here's a complete example with all options for Claude Desktop using a local build:

```json
{
	"mcpServers": {
		"directus": {
			"command": "node",
			"args": ["/Users/cdslipp/Code/open source/directus/directus-mcp/dist/index.js"],
			"env": {
				"DIRECTUS_URL": "https://your-directus-instance.com",
				"DIRECTUS_TOKEN": "your_directus_token",
				"DISABLE_TOOLS": [],
				"MCP_SYSTEM_PROMPT_ENABLED": "true",
				"MCP_SYSTEM_PROMPT": "You're a content editor working at Directus.\nYou're a master at copywriting and creating messaging that resonates with technical audiences.",
				"DIRECTUS_PROMPTS_COLLECTION_ENABLED": "true",
				"DIRECTUS_PROMPTS_COLLECTION": "ai_prompts"
			}
		}
	}
}
```

### Troubleshooting Local Installation

- **"Command not found" error**: Make sure you're using the full absolute path to `dist/index.js`
- **Changes not reflecting**: After rebuilding (`pnpm build`), restart your MCP client
- **Permission errors**: Ensure the dist/index.js file has execute permissions: `chmod +x dist/index.js`
- **Module not found errors**: Make sure you've run `pnpm install` and `pnpm build` successfully

### Example Configurations

#### Basic Configuration with Token

```json
{
	"mcpServers": {
		"directus": {
			"command": "npx",
			"args": ["@directus/content-mcp@latest"],
			"env": {
				"DIRECTUS_URL": "https://your-directus-instance.com",
				"DIRECTUS_TOKEN": "your_directus_token"
			}
		}
	}
}
```

#### Configuration with Email/Password Authentication

```json
{
	"mcpServers": {
		"directus": {
			"command": "npx",
			"args": ["@directus/content-mcp@latest"],
			"env": {
				"DIRECTUS_URL": "https://your-directus-instance.com",
				"DIRECTUS_USER_EMAIL": "user@example.com",
				"DIRECTUS_USER_PASSWORD": "your_password"
			}
		}
	}
}
```

#### Advanced Configuration with Custom System Prompt and Tool Restrictions

```json
{
	"mcpServers": {
		"directus": {
			"command": "npx",
			"args": ["@directus/content-mcp@latest"],
			"env": {
				"DIRECTUS_URL": "https://your-directus-instance.com",
				"DIRECTUS_TOKEN": "your_directus_token",
				"DISABLE_TOOLS": ["delete-item", "update-field"],
				"MCP_SYSTEM_PROMPT_ENABLED": "true",
				"MCP_SYSTEM_PROMPT": "You are an assistant specialized in managing content for our marketing website.",
				"DIRECTUS_PROMPTS_COLLECTION_ENABLED": "true",
				"DIRECTUS_PROMPTS_COLLECTION": "ai_prompts",
				"DIRECTUS_PROMPTS_NAME_FIELD": "name",
				"DIRECTUS_PROMPTS_DESCRIPTION_FIELD": "description",
				"DIRECTUS_PROMPTS_SYSTEM_PROMPT_FIELD": "system_prompt",
				"DIRECTUS_PROMPTS_MESSAGES_FIELD": "messages"
			}
		}
	}
}
```

# ❤️ Contributing

We love to see community contributions, but please open an issue first to discuss proposed changes before submitting any
PRs.

## 🙏 Thanks To

This started as an experiment by the dude, the legend, the [@rijkvanzanten](https://github.com/rijkvanzanten) 🙌

## License

MIT
