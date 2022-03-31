import * as env from 'env-var';

import { CouchbaseConnectionConfig } from 'nestjs-ottoman';
import {
  CONFIG_COUCHBASE_BUCKET,
  CONFIG_COUCHBASE_HOST,
  CONFIG_COUCHBASE_PASSWORD,
  CONFIG_COUCHBASE_USERNAME,
  CONFIG_HTTP_TIMEOUT,
} from './constants';

interface Config {
  [CONFIG_HTTP_TIMEOUT]?: string;
  couchbase: CouchbaseConnectionConfig;
}

export default (): Config => {
  console.log(env);
  return {
    [CONFIG_HTTP_TIMEOUT]: env.get(CONFIG_HTTP_TIMEOUT).default('6000').asString(),
    couchbase: {
      connectionName: 'orders',
      ottomanConnectionOptions: {
        connectionString: env
          .get(CONFIG_COUCHBASE_HOST)
          .default('couchbase://localhost:8091')
          .asString(),
        bucketName: env.get(CONFIG_COUCHBASE_BUCKET).default('test_bucket').asString(),
        username: env.get(CONFIG_COUCHBASE_USERNAME).default('Administrator').asString(),
        password: env.get(CONFIG_COUCHBASE_PASSWORD).default('password').asString(),
      },
    },
  };
};
