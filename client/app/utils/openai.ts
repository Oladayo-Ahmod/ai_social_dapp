const {Configuration, OpenAIApi} = require('openai')
import OpenAI from 'openai';

const client = new OpenAI({
    apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});
  
// const configuration = new Configuration({
//     apiKey : process.env.OPENAI_API_KEY
// })

// const openai = new OpenAIApi(configuration)

export default client