import type { PrismaClient } from "../../generated/prisma";

type MockPerson = {
	id: string;
	personalInfo: {
		firstName: string;
		lastName: string;
	};
	contactInfo: unknown[];
	addresses: unknown[];
	languages: unknown[];
	emergencyContacts: unknown[];
	documents: unknown;
	createdAt: Date;
	updatedAt: Date;
};

type MockUser = {
	id: string;
	email: string;
	userName: string;
	password?: string;
	loginMethod: string;
	role: string;
	personId: string;
	subRole: string[];
	avatar: string | null;
	status: string;
	isDeleted: boolean;
	orgId: string | null;
	organization: unknown;
	lastLogin: Date | null;
	createdAt: Date;
	updatedAt: Date;
};

type CreateArgs<T> = {
	data: T;
};

type FindUniqueArgs = {
	where: Record<string, unknown>;
	include?: Record<string, boolean>;
};

type FindFirstArgs = {
	where?: Record<string, unknown>;
	include?: Record<string, boolean>;
	select?: Record<string, boolean | Record<string, boolean>>;
};

type UpdateArgs = {
	where: Record<string, unknown>;
	data: Record<string, unknown>;
};

export type StatefulPrismaMock = PrismaClient & {
	__state: {
		persons: MockPerson[];
		users: MockUser[];
	};
};

const selectFields = (record: Record<string, any>, select?: Record<string, any>) => {
	if (!select) {
		return record;
	}

	const selected: Record<string, any> = {};

	for (const [field, value] of Object.entries(select)) {
		if (!value || !(field in record)) {
			continue;
		}

		if (value === true) {
			selected[field] = record[field];
			continue;
		}

		if (typeof value === "object" && value.select && record[field]) {
			selected[field] = selectFields(record[field], value.select);
		}
	}

	return selected;
};

export function createStatefulPrismaMock(): StatefulPrismaMock {
	let personCounter = 1;
	let userCounter = 1;
	const persons: MockPerson[] = [];
	const users: MockUser[] = [];

	const getPerson = (personId: string) => persons.find((person) => person.id === personId) || null;
	const withRelations = (user: MockUser, include?: Record<string, boolean>) => {
		const baseRecord: Record<string, any> = { ...user };

		if (include?.person) {
			baseRecord.person = getPerson(user.personId);
		}

		if (include?.organization) {
			baseRecord.organization = user.organization;
		}

		return baseRecord;
	};

	const prisma = {
		__state: {
			persons,
			users,
		},
		person: {
			create: async ({ data }: CreateArgs<Omit<MockPerson, "id" | "createdAt" | "updatedAt">>) => {
				const person: MockPerson = {
					id: `person-${personCounter++}`,
					createdAt: new Date(),
					updatedAt: new Date(),
					...data,
				};

				persons.push(person);
				return person;
			},
		},
		user: {
			findUnique: async ({ where, include }: FindUniqueArgs) => {
				let user: MockUser | undefined;

				if (typeof where.email === "string") {
					user = users.find((entry) => entry.email === where.email);
				} else if (typeof where.id === "string") {
					user = users.find((entry) => {
						if (entry.id !== where.id) {
							return false;
						}

						if (typeof where.isDeleted === "boolean") {
							return entry.isDeleted === where.isDeleted;
						}

						return true;
					});
				}

				return user ? withRelations(user, include) : null;
			},
			findFirst: async ({ where, include, select }: FindFirstArgs) => {
				let user: MockUser | undefined = users[0];

				if (Array.isArray(where?.OR)) {
					const orClauses = where.OR as Array<Record<string, unknown>>;
					user = users.find((entry) =>
						orClauses.some((candidate) => {
							if (typeof candidate.email === "string") {
								return entry.email === candidate.email;
							}

							if (typeof candidate.userName === "string") {
								return entry.userName === candidate.userName;
							}

							return false;
						}),
					);
				} else if (typeof where?.id === "string") {
					user = users.find((entry) => entry.id === where.id);
				}

				if (!user) {
					return null;
				}

				const record = withRelations(user, include);
				return select ? selectFields(record, select) : record;
			},
			create: async ({ data }: CreateArgs<Record<string, unknown>>) => {
				const user: MockUser = {
					id: `user-${userCounter++}`,
					email: String(data.email),
					userName: String(data.userName),
					password: typeof data.password === "string" ? data.password : undefined,
					loginMethod: String(data.loginMethod || "email"),
					role: String(data.role || "user"),
					personId: String(data.personId),
					subRole: Array.isArray(data.subRole) ? (data.subRole as string[]) : [],
					avatar: null,
					status: "active",
					isDeleted: false,
					orgId: null,
					organization: null,
					lastLogin: null,
					createdAt: new Date(),
					updatedAt: new Date(),
				};

				users.push(user);
				return user;
			},
			update: async ({ where, data }: UpdateArgs) => {
				const user = users.find((entry) => entry.id === where.id);

				if (!user) {
					throw new Error(`User not found for update: ${String(where.id)}`);
				}

				Object.assign(user, data, { updatedAt: new Date() });

				if ("lastLogin" in data && data.lastLogin instanceof Date) {
					user.lastLogin = data.lastLogin;
				}

				return withRelations(user);
			},
		},
	} as unknown as StatefulPrismaMock;

	return prisma;
}
