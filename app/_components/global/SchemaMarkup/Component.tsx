import {
  NextSchemaScript,
  type Schema,
} from '@operationnation/sanity-plugin-schema-markup/nextSchemaScript';

type Props = {
  schema: Schema[];
};

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

const SchemaMarkup = ({ schema }: Props) => {
  return (
    <NextSchemaScript
      schema={schema}
      projectId={projectId as string}
      dataset={dataset as string}
    />
  );
};

export default SchemaMarkup;
