# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the Directus Content MCP (Model Context Protocol) Server - an interface for Directus users to interact with their data in LLMs. It provides tools for content editors and data analysts to manage Directus content through natural language interactions.

## Development Commands

### Build & Development
- `pnpm install` - Install dependencies
- `pnpm build` - Build the TypeScript project to dist/
- `pnpm dev` - Watch mode: rebuild on changes and restart the server
- `pnpm start` - Run the built server from dist/index.js

### Code Quality
- `pnpm lint` - Run ESLint to check code quality
- `pnpm lint:fix` - Automatically fix ESLint issues

## Architecture

### Core Structure
The project is a TypeScript MCP server that connects to Directus instances via the Directus SDK. Key architectural components:

1. **Entry Point** (`src/index.ts`): Sets up the MCP server, handles tool/prompt registration, and manages request routing
2. **Configuration** (`src/config.ts`): Validates and parses environment variables using Zod schema
3. **Directus Client** (`src/directus.ts`): Creates and authenticates the Directus SDK client
4. **Tools** (`src/tools/`): Individual tool implementations for Directus operations (items, files, fields, etc.)
5. **Prompts** (`src/prompts/`): Handles dynamic prompt retrieval and templating with Mustache
6. **Types** (`src/types/`): TypeScript type definitions for all data structures
7. **Utils** (`src/utils/`): Helper functions for schema fetching, permissions, response formatting

### Tool System
Each tool in `src/tools/` exports:
- `name`: Tool identifier
- `description`: What the tool does
- `inputSchema`: Zod schema for validation
- `handler`: Async function that executes the tool logic

Tools are dynamically loaded and can be disabled via `DISABLE_TOOLS` environment variable.

### Authentication Flow
Supports two authentication methods:
1. Static token via `DIRECTUS_TOKEN`
2. Email/password via `DIRECTUS_USER_EMAIL` and `DIRECTUS_USER_PASSWORD`

### Key Dependencies
- `@directus/sdk`: Client library for Directus API interactions
- `@modelcontextprotocol/sdk`: MCP protocol implementation
- `zod`: Runtime type validation for all inputs/outputs
- `marked` & `isomorphic-dompurify`: Markdown/HTML conversion for content fields

## Environment Configuration

Required environment variables:
- `DIRECTUS_URL`: The Directus instance URL
- Authentication (one of):
  - `DIRECTUS_TOKEN`: Static access token
  - `DIRECTUS_USER_EMAIL` + `DIRECTUS_USER_PASSWORD`: User credentials

Optional configuration:
- `DISABLE_TOOLS`: Array of tool names to disable (default: ['delete-item'])
- `MCP_SYSTEM_PROMPT_ENABLED`: Enable/disable system prompt (default: 'true')
- `MCP_SYSTEM_PROMPT`: Custom system prompt text
- `DIRECTUS_PROMPTS_COLLECTION_ENABLED`: Enable dynamic prompts from Directus
- Various `DIRECTUS_PROMPTS_*_FIELD` settings for prompt field mapping

## Testing Approach

Currently no automated tests are present. When implementing tests:
1. Check for test framework in package.json before assuming
2. Follow existing patterns if tests exist
3. Ask for testing approach if unclear

## Important Patterns

1. **Error Handling**: All tool handlers wrap responses in try/catch blocks and return structured error responses
2. **Schema Validation**: Every tool input is validated against a Zod schema before processing
3. **Permission Checks**: Tools check user permissions before executing operations
4. **Response Format**: Tools return MCP-compliant response objects with content arrays
5. **Null/Undefined Stripping**: Utility functions clean request payloads before sending to Directus API