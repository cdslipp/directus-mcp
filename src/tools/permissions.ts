import {
	createPermission,
	createPermissions,
	deletePermission,
	deletePermissions,
	readPermission,
	readPermissions,
	updatePermission,
	updatePermissions,
} from '@directus/sdk';

import * as z from 'zod';
import {
	CreatePermissionSchema,
	UpdatePermissionSchema,
} from '../types/permissions.js';
import { defineTool } from '../utils/define.js';
import {
	formatErrorResponse,
	formatSuccessResponse,
} from '../utils/response.js';

export const readPermissionsTool = defineTool('read-permissions', {
	description: 'List all permission rules that exist in Directus. Permissions control data access for policies/roles.',
	annotations: {
		title: 'Read Permissions',
		readOnlyHint: true,
	},
	inputSchema: z.object({
		filter: z.record(z.string(), z.any()).optional().describe('Filter permissions by conditions'),
		limit: z.number().optional().describe('Limit the number of permissions returned'),
		offset: z.number().optional().describe('Number of permissions to skip'),
		sort: z.array(z.string()).optional().describe('Sort permissions by fields'),
		fields: z.array(z.string()).optional().describe('Control what fields are returned'),
	}),
	handler: async (directus, query) => {
		try {
			const result = await directus.request(
				readPermissions(query),
			);
			return formatSuccessResponse(result);
		}
		catch (error) {
			return formatErrorResponse(error);
		}
	},
});

export const readPermissionTool = defineTool('read-permission', {
	description: 'Retrieve a single permission rule by its ID.',
	annotations: {
		title: 'Read Permission',
		readOnlyHint: true,
	},
	inputSchema: z.object({
		id: z.number().describe('The ID of the permission rule to retrieve'),
		fields: z.array(z.string()).optional().describe('Control what fields are returned'),
	}),
	handler: async (directus, { id, fields }) => {
		try {
			const result = await directus.request(
				readPermission(id, { fields }),
			);
			return formatSuccessResponse(result);
		}
		catch (error) {
			return formatErrorResponse(error);
		}
	},
});

export const createPermissionTool = defineTool('create-permission', {
	description: 'Create a new permission rule. This controls what actions a policy/role can perform on a collection.',
	annotations: {
		title: 'Create Permission',
	},
	inputSchema: z.object({
		data: CreatePermissionSchema.describe('The permission rule data to create'),
	}),
	handler: async (directus, { data }) => {
		try {
			const result = await directus.request(
				createPermission(data),
			);
			return formatSuccessResponse(result, 'Permission rule created successfully');
		}
		catch (error) {
			return formatErrorResponse(error);
		}
	},
});

export const createPermissionsTool = defineTool('create-permissions', {
	description: 'Create multiple permission rules at once. Useful for setting up permissions for multiple collections or actions.',
	annotations: {
		title: 'Create Multiple Permissions',
	},
	inputSchema: z.object({
		data: z.array(CreatePermissionSchema).describe('Array of permission rules to create'),
	}),
	handler: async (directus, { data }) => {
		try {
			const result = await directus.request(
				createPermissions(data),
			);
			return formatSuccessResponse(result, `${data.length} permission rules created successfully`);
		}
		catch (error) {
			return formatErrorResponse(error);
		}
	},
});

export const updatePermissionTool = defineTool('update-permission', {
	description: 'Update an existing permission rule.',
	annotations: {
		title: 'Update Permission',
		destructiveHint: true,
	},
	inputSchema: z.object({
		id: z.number().describe('The ID of the permission rule to update'),
		data: UpdatePermissionSchema.describe('The partial data to update the permission with'),
	}),
	handler: async (directus, { id, data }) => {
		try {
			const result = await directus.request(
				updatePermission(id, data),
			);
			return formatSuccessResponse(result, 'Permission rule updated successfully');
		}
		catch (error) {
			return formatErrorResponse(error);
		}
	},
});

export const updatePermissionsTool = defineTool('update-permissions', {
	description: 'Update multiple permission rules at once.',
	annotations: {
		title: 'Update Multiple Permissions',
		destructiveHint: true,
	},
	inputSchema: z.object({
		ids: z.array(z.number()).describe('Array of permission IDs to update'),
		data: UpdatePermissionSchema.describe('The partial data to update all permissions with'),
	}),
	handler: async (directus, { ids, data }) => {
		try {
			const result = await directus.request(
				updatePermissions(ids, data),
			);
			return formatSuccessResponse(result, `${ids.length} permission rules updated successfully`);
		}
		catch (error) {
			return formatErrorResponse(error);
		}
	},
});

export const deletePermissionTool = defineTool('delete-permission', {
	description: 'Delete a permission rule. Please confirm with the user before deleting.',
	annotations: {
		title: 'Delete Permission',
		destructiveHint: true,
	},
	inputSchema: z.object({
		id: z.number().describe('The ID of the permission rule to delete'),
	}),
	handler: async (directus, { id }) => {
		try {
			await directus.request(deletePermission(id));
			return formatSuccessResponse(null, 'Permission rule deleted successfully');
		}
		catch (error) {
			return formatErrorResponse(error);
		}
	},
});

export const deletePermissionsTool = defineTool('delete-permissions', {
	description: 'Delete multiple permission rules. Please confirm with the user before deleting.',
	annotations: {
		title: 'Delete Multiple Permissions',
		destructiveHint: true,
	},
	inputSchema: z.object({
		ids: z.array(z.number()).describe('Array of permission IDs to delete'),
	}),
	handler: async (directus, { ids }) => {
		try {
			await directus.request(deletePermissions(ids));
			return formatSuccessResponse(null, `${ids.length} permission rules deleted successfully`);
		}
		catch (error) {
			return formatErrorResponse(error);
		}
	},
});