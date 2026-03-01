import { z, treeifyError } from 'zod';
import Env from 'react-native-config';

const envSchema = z.object({
    BASE_URL: z.url('Invalid Url'),
});

const parsedEnv = envSchema.safeParse(Env);

if (!parsedEnv.success) {
    console.error(
        'Invalid environmental variables: ',
        treeifyError(parsedEnv.error),
    );
}

export const env = parsedEnv.data;
