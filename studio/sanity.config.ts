import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './schemaTypes';

// For Sanity Studio v3, env variables must be prefixed with SANITY_STUDIO_
const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'ya1nxsau';
const dataset = process.env.SANITY_STUDIO_DATASET || 'production';

export default defineConfig({
  name: 'default',
  title: 'ODCLF Forum CMS',

  projectId: projectId,
  dataset: dataset,

  plugins: [structureTool()],

  schema: {
    types: schemaTypes,
  },
});
