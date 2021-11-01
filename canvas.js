const canvas = {
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
  };

exports.canvas = canvas;