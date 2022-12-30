import { addItem } from "$lib/Notion";
import type { Actions } from './$types';

export const actions: Actions = {
  default: async ({ request }) => {
    const data = await request.formData();

    const firstName = data.get('firstname');
    const lastName = data.get('lastname');
    const email = data.get('email') as string;
    const description = data.get('description') as string

    console.log("DATA", firstName, lastName, email, description)
    await addItem(`${firstName} ${lastName}`, email, description)

    return {
      status: 200,
      body: {
        message: 'Success'
      }
    }
  }
};