import type { Client } from "@notionhq/client"
import { env } from '$env/dynamic/private';

export async function addItem(client: Client, name: string, email: string, description: string) {
  const databaseId = env.NOTION_DATABASE_ID as string
  try {
    const response = await client.pages.create({
      parent: { database_id: databaseId },
      properties: {
        Name: {
          title: [
            {
              "text": {
                "content": `${name} ${email}`
              }
            }
          ]
        },
        'Submitter Name': {
          rich_text: [
            {
              "text": {
                "content": name
              }
            }
          ]
        },
        Email: {
          email: email
        },
        Managed: {
          checkbox: false
        }
      },
      children: [
        {
          "object": "block",
          "type": "paragraph",
          "paragraph": {
            "rich_text": [{ "type": "text", "text": { "content": description } }]
          }
        }
      ]
    })

    console.log(response)
    console.log("Success! Entry added.")
  } catch (err: any) {
    console.error(err.body)
  }
}
