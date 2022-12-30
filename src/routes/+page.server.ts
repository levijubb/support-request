import { addItem } from "$lib/Notion";
import { Client } from "@notionhq/client"
import type { Actions } from './$types';
import { env } from '$env/dynamic/private';


export const actions: Actions = {
  default: async ({ request }) => {
    const client = new Client({ auth: env.NOTION_KEY })
    const data = await request.formData();

    const firstName = data.get('firstname');
    const lastName = data.get('lastname');
    const email = data.get('email') as string;
    const description = data.get('description') as string

    addItem(client, `${firstName} ${lastName}`, email, description)
  }
};