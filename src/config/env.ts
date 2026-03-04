import { z, treeifyError } from 'zod';
import {BASE_URL} from "@env";

const envSchema = z.object({
    BASE_URL: z.url('Invalid BASE_URL: must be a valid URL'),
});

const parsedEnv = envSchema.safeParse({ BASE_URL });

if (!parsedEnv.success) {
    console.error(
        'Invalid environmental variables: ',
        treeifyError(parsedEnv.error),
    );
}

export const env = parsedEnv.data;
