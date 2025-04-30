import { z } from 'zod';

const ResponseSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(1, 'Message is required')
});

type Response = z.infer<typeof ResponseSchema>;

const UserSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(6, 'Password must be at least 6 characters')
});

type User = z.infer<typeof UserSchema>;

export {
  ResponseSchema,
  Response,
  UserSchema,
  User
};
