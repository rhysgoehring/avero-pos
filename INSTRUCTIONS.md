# Frontend Coding Exercise
The following is intended as a coding exercise for frontend developers.

## Avero Point of Sale System
Your job is to build the UI for Avero’s new Point of Sale system. Servers at Avero’s flagship restaurant, The Greasy Spoon, will use your UI to track sales throughout the day. You will build this UI against the existing Avero POS API (documented below).

## Business Requirements
- Servers should be able to open a new check against a table (see POST /checks).
    - The restaurant has a fixed number of tables (see GET /tables). These tables never change.
    - Each check is associated with one and only one table.
    - Each table may have at most one open check associated with it at a time.
    - Each table may have any number of closed checks associated with it.
    - The restaurant may have multiple open checks at the same time, up to the number of tables.
- Servers should be able to add menu items to an open check (see POST /checks/:id/addItem).
    - The restaurant has a fixed set of menu items (see GET /items). These menu items never change.
    - A check may have any number of menu items associated with it.
    - The same menu item may appear any number of times on a check (a table may order 3 burgers and 2 sodas).
- Servers should be able to void an item on an open check (see POST /checks/:id/voidItem).
    - Voiding an item does not remove it from the check, but rather changes the “voided” property to true. That is an important distinction, and the UI should faithfully represent it.
    - You cannot void an item that does not appear on the check (if there is no burger on the check, I should not be able to void a burger on the check).
    - You cannot void an item more than once.
- Servers should be able to close a check (see POST /checks/:id/close)
    - Once a check is closed, it may no longer be edited in any way (items cannot be added or voided, it cannot be closed again, etc).
    - Once a check is closed, tax and tip will be calculated automatically on the server-side.
- Servers should be able to view all checks in the system, open and closed.
    - Typically, servers will be working on open checks. This is the primary use case. Think about how you will facilitate easily viewing and switching between open checks.
    - Sometimes servers will need to view closed checks - perhaps to confirm a charge or check a total. Think about how servers will navigate & distinguish between a potentially large number of closed checks.
- Servers should be able to view the details of a check
    - When viewing a check’s details, each charge should appear as a separate line item.
    - If a check is closed, tax and tip should be displayed as separate line items.
- All servers in the restaurant will be using the same UI. You may assume that only those servers will have access to this UI. You do not need to deal with identity management, authentication, authorization, login, etc. in any way.

## Expectations:
- You may use any language, library, or framework that you wish. Ultimately, you should choose whatever tools will best enable you to deliver a quality product.
- The API endpoints that we have provided should be all that you need. Your implementation should not require any additional backend (or at most, a static file server). If you believe that you have discovered a bug in the api, [please contact us](https://github.com/AveroLLC/check-api/issues)!
- There may some ambiguity in the business requirements. You are free to make assumptions where you feel like the requirements are unclear. If you do, please document these assumptions in the README.
- This exercise should take about 4-8 hours to complete. It should represent your best effort - but we understand that it is a side project. We do not expect perfection. =)

## Delivery
- Your final output should be a link to a publicly hosted repo (e.g. GitHub, bitbucket) which includes all of your code, assets, etc. Anything that we need to run your project and wish us to evaluate.
- Your code should include a README file with clear instructions for running your solution. Any dependencies, build commands, etc - every step after `git clone …` should be clearly documented. If we can’t run it, we can’t evaluate it!
- If you wish to include any other resources (design docs, planning breakdown, etc), you may reference and link them from the README.
- When you're ready for us to review, you should email whoever you have been in contact with at Avero.

## You will be evaluated on (in roughly this order)
- Our ability to access and run your code. If we can’t run it, we can’t evaluate it.
- Your adherence to the business and technical requirements outlined above. Beautiful code doesn’t matter if it doesn’t work correctly!
- The quality of your code. Think about good engineering practices - legibility, maintainability, separation of concerns, testability. This should be code that you are proud of.
- The quality of your UI / UX. You have been given significant leeway in how you implement this UI. Think about your users, think about their workflow and how they will be using this interface. If you have a talent for design, make it pretty! If you don’t, that’s ok, but it should still be easy and intuitive for your users to do their job.

## API Bugs
If you are reading this then you are one of the first people to do this code exercise and there are probably bugs in the API!

If you come across a bug, please help us out and [file an issue](https://github.com/AveroLLC/check-api/issues).

# API DOCUMENTATION

## Connecting
All URIs in this document have the following base:
```https://check-api.herokuapp.com```

## Content-Type
Any data in request or response bodies should be JSON.

## Authentication
For every request, you must send an access token in the _Authorization_ header.  If you're planning on submitting this exercise to us, you should have already received an access token, so let us know if you haven't.

### GET /tables - list tables
list the tables in the restaurant

example response body:
```json
[
    {
        "id": "2644ece3-83dd-4deb-ae02-54f4df083e16",
        "number": 1
    },
    {
        "id": "c482731d-19a4-4d1f-90ab-e4dc4ac7d28d",
        "number": 2
    }
]
```

### GET /items  - list menu items
list the menu items 

example response body:
```json
[
    {
        "id": "348e706c-ab3b-4a6e-a391-8de96ac7e0a3",
        "name": "PULL-APART BREAD",
        "price": 4.5
    },
    {
        "id": "92d26789-a296-4910-b7a9-b08e68d9e44d",
        "name": "GREEN SALAD ",
        "price": 8
    },
    {
        "id": "abae32ec-05e5-4072-ba54-3a46764a5eff",
        "name": "MORTGAGE LIFTER BEANS",
        "price": 6
    }
]
```

### GET /checks - list all checks with basic info
_this will be empty until you create a check_

example response body:
```json
[
    {
        "id": "0ca23e8c-00ea-4ef4-9e10-001f86569b86",
        "dateCreated": "2017-11-14T17:16:20.544813Z",
        "dateUpdated": "2017-11-16T22:16:04.497084Z",
        "createdBy": "admin",
        "tableId": "2644ece3-83dd-4deb-ae02-54f4df083e16",
        "closed": true,
        "tax": 1,
        "tip": 2.43
    },
    {
        "id": "56d7b4d3-789b-4fa4-ac6d-c329cc5a3a15",
        "dateCreated": "2017-11-16T21:48:49.443236Z",
        "dateUpdated": "2017-11-16T21:48:49.443236Z",
        "createdBy": "admin",
        "tableId": "5d6e6290-a0bb-4aa9-ba3d-9071e5a65a93",
        "closed": false,
        "tax": null,
        "tip": null
    }
 ]
```

### POST /checks - create a new check
##### Body:
- **tableId** (string, uuid) - the id of the table you'd like to create a check for

example request body:
```json
{
    "tableId": "2644ece3-83dd-4deb-ae02-54f4df083e16"
}
```

### GET /checks/:id - get the details for a check
##### URI parameters:
- **id** (string, uuid) - the id of the check

example response body:
```json
{
    "id": "0ca23e8c-00ea-4ef4-9e10-001f86569b86",
    "dateCreated": "2017-11-14T17:16:20.544813Z",
    "dateUpdated": "2017-11-16T22:16:04.497084Z",
    "createdBy": "admin",
    "tableId": "2644ece3-83dd-4deb-ae02-54f4df083e16",
    "closed": true,
    "tax": 1,
    "tip": 2.43,
    "orderedItems": [
        {
            "id": "bb640a13-26ad-4484-826e-db15653a22e6",
            "dateCreated": "2017-11-14T21:46:16.726296Z",
            "dateUpdated": "2017-11-14T21:46:16.726296Z",
            "createdBy": "admin",
            "checkId": "0ca23e8c-00ea-4ef4-9e10-001f86569b86",
            "itemId": "92d26789-a296-4910-b7a9-b08e68d9e44d",
            "voided": false
        },
        {
            "id": "dff5fc06-3e97-4099-b91e-94b4c7a05982",
            "dateCreated": "2017-11-14T21:45:10.086868Z",
            "dateUpdated": "2017-11-16T22:13:54.33976Z",
            "createdBy": "admin",
            "checkId": "0ca23e8c-00ea-4ef4-9e10-001f86569b86",
            "itemId": "348e706c-ab3b-4a6e-a391-8de96ac7e0a3",
            "voided": true
        }
    ]
}
 ```


### PUT /checks/:id/addItem - add a menu item to a check
##### URI parameters:
- **id** (string, uuid) - the id of the check

##### Body:
- **itemId** (string, uuid) - the id of the item to add to the check

example request body:
```json
{
    "itemId": "0ca23e8c-00ea-4ef4-9e10-001f86569b86"
}
```

### PUT /checks/:id/voidItem - void an item on a check
##### URI parameters:
- **id** (string, uuid) - the id of the check

##### Body:
- **orderedItemId** (string, uuid) - the id of the orderedItem to void (this will be different than the itemId you used to add it to the check)

example request body:
```json
{
    "orderedItemId": "90ad5191-5b3c-4665-9a46-a6fcf5079806"
}
```

### PUT /checks/:id/close - mark a check as closed
_Once a check is closed, tax and tip will be calculated an changes to the check will be blocked._
##### URI parameters:
- **id** (string, uuid) - the id of the check

##### Body:
_body should be an empty object_

example request body:
```json
{
}
```

### DELETE /checks - delete all checks
_This is here so that you can clean up data while doing dev work and get back to a fresh state.  There's no requirement to expose this through the UI you are building._

##### Body:
_body should be an empty object_

example request body:
```json
{
}
```
