import type { Actions } from './$types';

export const actions: Actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    const firstName = data.get('firstname');
    const lastName = data.get('lastname');
    const email = data.get('email');
    const description = data.get('description');

    console.log(firstName, lastName, email, description);
  }
};