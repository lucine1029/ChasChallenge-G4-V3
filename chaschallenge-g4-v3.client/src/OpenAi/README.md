# OpenAI

## Setup: https://platform.openai.com/docs/quickstart?context=node

### Step 1: Install the OpenAI Node.js library

Once you have Node.js installed, the OpenAI Node.js library can be installed. From the terminal / command line, run:

- npm install --save openai

### Step 2: Set up your API key

Set up your API key for all projects (recommended)
The main advantage to making your API key accessible for all projects is that our SDK will automatically detect it
and use it without having to write any code.

MacOS

1. Open Terminal: You can find it in the Applications folder or search for it using Spotlight (Command + Space).
2. Edit bash profile: Use the command nano ~/.bash_profile or nano ~/.zshrc (for newer MacOS versions) to open the profile file in a text editor.
3. Add Environment Variable: In the editor, add the line below, replacing your-api-key-here with your actual API key:

- export OPENAI_API_KEY='your-api-key-here' (place key w')

4. Save and exit: Press Ctrl+O to write the changes, followed by Ctrl+X to close the editor.
5. Load your profile: Use the command source ~/.bash_profile or source ~/.zshrc to load the updated profile.
6. Verification: Verify the setup by typing echo $OPENAI_API_KEY in the terminal. It should display your API key.

### Step 3: Sending your first API request

#### Making an API request

After you have Node.js configured and set up an API key, the final step is to send a request to the OpenAI API using the Node.js library.
To do this, create a file named openai-test.js using the terminal or an IDE.
Inside the file, copy and paste one of the examples below:

```
ChatCompletions

ChatCompletions
import OpenAI from "openai";

const openai = new OpenAI();

async function main() {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "You are a helpful assistant." }],
    model: "gpt-3.5-turbo",
  });

  console.log(completion.choices[0]);
}

main();
```

To run the code, enter node openai-test.js into the terminal / command line.

The Chat Completions example highlights just one area of strength for our models: creative ability. Explaining recursion (the programming topic) in a well formatted poem is something both the best developers and best poets would struggle with. In this case, gpt-3.5-turbo does it effortlessly.

##

# Dependencies

I started on "openai": "^4.24.1" and updated to V.4.32.0 on the 24-04-02.
