import { diag, DiagConsoleLogger, DiagLogLevel } from '@opentelemetry/api';
import { NodeSDK } from '@opentelemetry/sdk-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-grpc';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';
import { TypeormInstrumentation } from '@opentelemetry/instrumentation-typeorm';
import { ConfigModule } from '@nestjs/config';
ConfigModule.forRoot();

// eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.ERROR);

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call
const sdk = new NodeSDK({
  serviceName: 'therapy-api',
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call
  traceExporter: new OTLPTraceExporter({
    url: process.env.OPEN_TELEMETRY_HOST,
    //eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    compression: 'gzip' as any,
  }),
  //eslint-disable-next-line @typescript-eslint/no-unsafe-call
  instrumentations: [new HttpInstrumentation(), new TypeormInstrumentation()],
});

//eslint-disable-next-line @typescript-eslint/no-misused-promises
process.on('beforeExit', async () => {
  //eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
  await sdk.shutdown();
});

//eslint-disable-next-line @typescript-eslint/require-await
export const initalizeTracing = async () => {
  //eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return
  return sdk.start();
};
