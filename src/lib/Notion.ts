import { Client } from "@notionhq/client"
import { env } from '$env/dynamic/private';

export async function addItem(name: string, email: string, description: string) {
  const client = new Client({ auth: env.NOTION_KEY })
  const databaseId = env.NOTION_DATABASE_ID as string

  console.log("DBID", databaseId)
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

    console.log(`ADDED TICKET (${response.id}) BY ${email}`)

    return {
      status: 200,
    }
  } catch (err: any) {
    console.error(err.body)
  }
}
