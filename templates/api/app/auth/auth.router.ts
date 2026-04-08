import { Router, Request, Response, NextFunction } from "express";

interface IController {
	register(req: Request, res: Response, next: NextFunction): Promise<void>;
	login(req: Request, res: Response, next: NextFunction): Promise<void>;
	logout(req: Request, res: Response, next: NextFunction): Promise<void>;
	updatePassword(req: Request, res: Response, next: NextFunction): Promise<void>;
}

export const router = (route: Router, controller: IController): Router => {
	const routes = Router();
	const path = "/auth";

	/**
	 * @openapi
	 * components:
	 *   schemas:
	 *     RegisterRequest:
	 *       type: object
	 *       required:
	 *         - firstName
	 *         - lastName
	 *         - email
	 *         - userName
	 *         - password
	 *       properties:
	 *         firstName:
	 *           type: string
	 *         lastName:
	 *           type: string
	 *         email:
	 *           type: string
	 *           format: email
	 *         userName:
	 *           type: string
	 *           minLength: 3
	 *           maxLength: 50
	 *         password:
	 *           type: string
	 *           minLength: 6
	 *     LoginRequest:
	 *       type: object
	 *       required:
	 *         - identifier
	 *         - password
	 *       properties:
	 *         identifier:
	 *           type: string
	 *           description: Email or username
	 *         password:
	 *           type: string
	 *     UpdatePasswordRequest:
	 *       type: object
	 *       required:
	 *         - userId
	 *         - password
	 *       properties:
	 *         userId:
	 *           type: string
	 *           pattern: '^[0-9a-fA-F]{24}$'
	 *         password:
	 *           type: string
	 *           minLength: 6
	 *     AuthUser:
	 *       type: object
	 *       properties:
	 *         id:
	 *           type: string
	 *         email:
	 *           type: string
	 *         userName:
	 *           type: string
	 *         role:
	 *           type: string
	 *         subRole:
	 *           type: array
	 *           items:
	 *             type: string
	 *         avatar:
	 *           type: string
	 *           nullable: true
	 *         person:
	 *           type: object
	 *         token:
	 *           type: string
	 */

	/**
	 * @openapi
	 * /api/auth/register:
	 *   post:
	 *     summary: Register a new user
	 *     description: Register a basic user account for the canonical auth slice
	 *     tags: [Auth]
	 *     requestBody:
	 *       required: true
	 *       content:
	 *         application/json:
	 *           schema:
	 *             $ref: '#/components/schemas/RegisterRequest'
	 *     responses:
	 *       201:
	 *         description: User registered successfully
	 *       400:
	 *         description: Validation error or user already exists
	 *       500:
	 *         description: Internal server error
	 */
	routes.post("/register", controller.register);

	/**
	 * @openapi
	 * /api/auth/login:
	 *   post:
	 *     summary: Login user
	 *     description: Authenticate a user with email or username and return the session token
	 *     tags: [Auth]
	 *     requestBody:
	 *       required: true
	 *       content:
	 *         application/json:
	 *           schema:
	 *             $ref: '#/components/schemas/LoginRequest'
	 *     responses:
	 *       200:
	 *         description: Login successful
	 *       401:
	 *         description: Invalid credentials
	 *       500:
	 *         description: Internal server error
	 */
	routes.post("/login", controller.login);

	/**
	 * @openapi
	 * /api/auth/logout:
	 *   post:
	 *     summary: Logout user
	 *     description: Clear the authentication cookie
	 *     tags: [Auth]
	 *     security:
	 *       - cookieAuth: []
	 *     responses:
	 *       200:
	 *         description: Successfully logged out
	 *       500:
	 *         description: Internal server error
	 */
	routes.post("/logout", controller.logout);

	/**
	 * @openapi
	 * /api/auth/update-password:
	 *   put:
	 *     summary: Update user password
	 *     description: Update a user's password by user ID
	 *     tags: [Auth]
	 *     security:
	 *       - bearerAuth: []
	 *     requestBody:
	 *       required: true
	 *       content:
	 *         application/json:
	 *           schema:
	 *             $ref: '#/components/schemas/UpdatePasswordRequest'
	 *     responses:
	 *       200:
	 *         description: Password updated successfully
	 *       400:
	 *         description: Validation error
	 *       404:
	 *         description: User not found
	 *       500:
	 *         description: Internal server error
	 */
	routes.put("/update-password", controller.updatePassword);

	route.use(path, routes);

	return route;
};
