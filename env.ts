import { omit } from 'lodash/fp';
import { ZodError, z } from 'zod';

const stringValidation = z.string().min(1, 'Var is not defined');
const urlValidation = z.string().url().min(1, 'Var is not defined');

const envSchema = z.object({
  // GOOGLE KEYS
  NEXT_PUBLIC_GOOGLE_MAP_KEY: stringValidation,
  // PURCHASE MODE
  NEXT_PUBLIC_PURCHASE_MODE: z.enum(['cart', 'single']),
  // ADMIN
  NEXT_PUBLIC_ADMIN_ENDPOINT_URL: urlValidation,
  NEXT_PUBLIC_ADMIN_TOKEN: stringValidation,
  // ENCRYPT
  NEXT_PUBLIC_ENCRYPT_KEY: stringValidation,
  // KOUNT
  NEXT_PUBLIC_KOUNT_CLIENT: stringValidation,
  NEXT_PUBLIC_KOUNT_ENVIRONMENT: stringValidation,
  NEXT_PUBLIC_FLIGHTS_MS: stringValidation,
});

type EnvValues = z.infer<typeof envSchema>;

// IDEA: trigger a toast message on dev instead of just a console error
function logEnvError(errors: ZodError<EnvValues>) {
  const formattedErrors = omit('_errors', errors.format());
  console.error('<');
  console.error('ENVIRONMENT VARIABLES ERRORS:');
  console.error('----');
  Object.entries(formattedErrors).forEach(([name, { _errors }]) => {
    const errMsg = _errors.join(', ');
    console.error(`"${name}": ${errMsg}`);
  });
  console.error('----');
  console.error('>');
}

function checkEnv() {
  try {
    return envSchema.parse(process.env);
  } catch (errors) {
    if (errors instanceof ZodError) logEnvError(errors as ZodError<EnvValues>);
    // So! We had some validation errors
    // let's just make sure the shape of the object is what we are expecting
    return Object.fromEntries(
      Object.keys(envSchema.shape).map((key) => [key, process.env[key] || '']),
    ) as EnvValues;
  }
}

export const envWL = checkEnv();
