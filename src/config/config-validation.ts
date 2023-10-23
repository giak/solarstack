import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';
import { EnvironmentVariablesDTO } from './config.dto';

export function validateConfig(
  configuration: Record<string, unknown>,
): EnvironmentVariablesDTO {
  const finalConfig = plainToClass(EnvironmentVariablesDTO, configuration, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(finalConfig, { skipMissingProperties: false });

  try {
    hasErrors(errors);
  } catch (error) {
    showErrors(errors);
    console.error(error);
  }

  return finalConfig;
}

const hasErrors = (errors: any[]): void | never => {
  if (errors.length === 0) return;

  throw new Error(
    "Veuillez correctement renseigner les variables d'environnement mentionnées ci-joint.",
  );
};

const showErrors = (errors: any[]): void => {
  const formattedErrors: string[] = errors.map((error, i) => {
    const constraints = Object.values(error.constraints);
    return `${i++} - ${constraints.join(' | ')}`;
  });

  console.log(formattedErrors.join('\n'));
};
