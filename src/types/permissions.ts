import * as z from 'zod';

export interface ActionPermission {
	access: 'none' | 'partial' | 'full';
	fields?: string[];
	presets?: Record<string, any>;
}

export interface CollectionPermissions {
	create: ActionPermission;
	read: ActionPermission;
	update: ActionPermission;
	delete: ActionPermission;
	share: ActionPermission;
}

export type UserPermissionsData = Record<string, CollectionPermissions>;

export const PermissionActionSchema = z.enum(['create', 'read', 'update', 'delete', 'share']);

export const PermissionRuleSchema = z.object({
	id: z.number().optional(),
	collection: z.string(),
	action: PermissionActionSchema,
	permissions: z.record(z.string(), z.any()).nullable().optional(),
	validation: z.record(z.string(), z.any()).nullable().optional(),
	presets: z.record(z.string(), z.any()).nullable().optional(),
	fields: z.array(z.string()).nullable().optional(),
	policy: z.string().nullable().optional(),
});

export const CreatePermissionSchema = PermissionRuleSchema.omit({ id: true });

export const UpdatePermissionSchema = PermissionRuleSchema.partial().omit({ id: true });

export type PermissionRule = z.infer<typeof PermissionRuleSchema>;
export type CreatePermissionInput = z.infer<typeof CreatePermissionSchema>;
export type UpdatePermissionInput = z.infer<typeof UpdatePermissionSchema>;
