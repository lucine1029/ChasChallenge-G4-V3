// TS Interfaces -----------------------------------------------------------------------------
interface ChildInfo {
  firstName: string;
  nickName: string;
  birthDate: number;
  gender: string;
}

interface UserInfo {
  email: string;
  password: string;
}

interface ChildPreferences {}

interface Allergies {
  skaldjur: boolean;
  nötte: boolean;
}

interface Todos {
    task: string;
    completed: boolean;
    priority: string
}

// Request -----------------------------------------------------------------------------

// OpenAI
import OpenAI from 'openai';

const openai = new OpenAI();

async function main() {
  const completion = await openai.chat.completions.create({
    messages: [{ role: 'system', content: 'Will trump win the election?' }],
    model: 'gpt-3.5-turbo',
  });

  console.log(completion.choices[0]);
}

main();

// Axios
import axios from 'axios'; // Importerar via browser
const url = 'https://jsonplaceholder.typicode.com/users';
async function getUser(url) {
  try {
    const response = await axios.get(url);
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}
getUser(url);


// NavBarModal -----------------------------------------------------------------------------
