import type { CodegenConfig } from '@graphql-codegen/cli'
 
const config: CodegenConfig = {
   schema: 'http://192.168.1.30:1337/graphql',
   documents: ['src/graphql/**/*.graphql'],
   generates: {
      './src/gql/': {
        preset: 'client',
      }
   }
}
export default config