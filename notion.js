
const { Client } = require("@notionhq/client");


const notion = new Client({ auth: process.env.NOTION_KEY })
const databaseId = process.env.NOTION_DATABASE_ID;

function buildObject(item) {
  let object = {
    parent: { database_id: databaseId },
    properties: {},
  };
  
  if (item.title.length > 0) {
    object.properties["Topic"] = {
      "title": [
        {
          "text": {
            "content": item.title
          }
        }
      ]
    };
  }
  
  if (item.link.length > 0) {
    object.properties["Conversation"] = {
      "url": item.link
    };
  }
  
  if (item.pending_action.length > 0) {
    object.properties["Admin"] = {
      "rich_text": [{
        "type": "text",
        "text": {
          "content": item.pending_action
        }
      }]
    };
  }
  
  if (item.id.length > 0) {
    object.properties["IntercomId"] = {
      "rich_text": [{
        "type": "text",
        "text": {
          "content": item.id
        }
      }]
    };
  }
  
  if (item.email.length > 0) {
    object.properties["Email"] = {
      "email": item.email
    };
  }
  
  object.properties["Closed"] = {
    checkbox: item.closed
  };
  
  if (item.support_date) {
    object.properties["Support Date"] = {
      "date": { 'start': item.support_date }
    };
  }
  
  if (item.category.length > 0) {
    object.properties["Category"] = {
      "multi_select": [{ name: item.category}]
    };
  }
  
  if (item.pending_action.length > 0) {
    object.properties["Pending Action"] = {
      "rich_text": [{
        "type": "text",
        "text": {
          "content": item.pending_action
        }
      }]
    };
  }
  
  if (item.user_type.length > 0) {
    object.properties["User Type"] = {
      "select": { name: item.user_type}
    };
  }
  
  if (item.tag.length > 0) {
    object.properties["Tags"] = {
      "multi_select": [{ name: item.tag}]
    };
  }

  if (item.priority.length > 0) {
    object.properties["Action/Priority"] = {
      "multi_select": [{ name: item.priority}]
    };
  }
  
  return object
}

exports.addItem = async function (item) {
  console.log(item)
  try {
    const object = buildObject(item);
    const response = await notion.pages.create(object)
    console.log(response)
    console.log("Success! Entry added.")
  } catch (error) {
    console.log("error");
    console.error(error)
  }
}