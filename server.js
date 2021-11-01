
const express = require('express');
const bodyParser = require('body-parser');
const notion = require('./notion');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname));

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
        
const listener = app.listen(process.env.PORT, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});

/* 
  This is an endpoint that Intercom will POST HTTP request when the card needs to be initialized.
  This can happen when your teammate inserts the app into the inbox, or a new conversation is viewed.
*/

app.get("/test", async (request, response) => {    
  console.log("in");
  console.log(process.env.NOTION_KEY );
  notion.addItem({})
  
});

app.post("/initialize", (request, response) => {  
  const body = request.body;  
  response.send({
    canvas: {
      content: {
        components: [
          {
            "type": "input",
            "id": "title",
            "label": "Title",
            "placeholder": "Enter a title for your issue..."
          },
          {
            "type": "dropdown",
            "id": "priority",
            "label": "Priority",
            "options": [
              {
                "type": "option",
                "id": "high",
                "text": "High"
              },
              {
                "type": "option",
                "id": "medium",
                "text": "Medium"
              },
              {
                "type": "option",
                "id": "low",
                "text": "Low"
              }
            ]
          },
          {
            "type": "dropdown",
            "id": "tag",
            "label": "Tag",
            "options": [
              {
                "type": "option",
                "id": "pricing",
                "text": "Pricing"
              },
              {
                "type": "option",
                "id": "account",
                "text": "Account"
              },
              {
                "type": "option",
                "id": "multiple occurences",
                "text": "Multiple occurences"
              }
            ]
          },
          {
            "type": "dropdown",
            "id": "category",
            "label": "Category",
            "options": [
              {
                "type": "option",
                "id": "User Error",
                "text": "User Error"
              },
              {
                "type": "option",
                "id": "Clarity/UX",
                "text": "Clarity/UX"
              },
              {
                "type": "option",
                "id": "Bug",
                "text": "Bug"
              },
              {
                "type": "option",
                "id": "Request",
                "text": "Request"
              }
            ]
          },
          {
            "type": "textarea",
            "id": "pending_action",
            "label": "Pending actions",
            "placeholder": "Enter text here...",
          },
          {
            "type": "checkbox",
            "id": "closed",
            "label": "Closed",
            "options": [
              {
                "type": "option",
                "id": "true",
                "text": "Yes"
              },
            ]
          },
        
          { type: "button", label: "Save", style: "primary", id: "url_button", action: {type: "submit"} },
        ], 
      },
    },
  });
});


app.post("/submit", (request, response) => {  
  const body = request.body;  
  
  // Retrieve required Intercom data
  const item = {
    id: body.conversation.id,
    link: `https://app.intercom.com/a/apps/lad2rn6c/inbox/inbox/all/conversations/${body.conversation.id}`,
    admin: body.admin.name,
    support_date: new Date().toISOString(), //body.conversation.created_at * 1000
    user_type: body.contact.role,
    email: (body.contact.email.length == 0) ? 'nomail@mail.com' : body.contact.email,
    priority: body.input_values.priority,
    pending_action: body.input_values.pending_action,
    category: body.input_values.category,
    title: body.input_values.title,
    closed: (body.input_values.closed == "true") ? true : false,
    tag: body.input_values.tag,
  };
  
  // Post to notion
  notion.addItem(item);
  
  response.send({
    canvas: {
      content: {
        components: [
          { type: "text", text: "Item added to notion", style: "header", align: "center" },
        ], 
      },
    },
  });
});