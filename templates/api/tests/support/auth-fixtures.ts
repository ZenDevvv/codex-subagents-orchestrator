export const registerPayload = {
	firstName: "Ada",
	lastName: "Lovelace",
	email: "ada@example.com",
	userName: "adal",
	password: "secret123",
};

export const loginByEmailPayload = {
	identifier: registerPayload.email,
	password: registerPayload.password,
};

export const loginByUsernamePayload = {
	identifier: registerPayload.userName,
	password: registerPayload.password,
};
