---
description: MongoDB is the 'M' in MERN.
modifiedDate: ''
partOfBook: true
postFooterText: MongoDB is ready to use.
postFooterIcon: finish-flag
previewImage:
publishedDate: '2019-11-28'
slug: installing-mongodb-on-ubuntu
title: Installing MongoDB on Ubuntu
---

## MongoDB Local Install

The production version of our app will use [MongoDB](https://mongodb.com) hosted on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas). However, for development it is easier to work with MongoDB locally.

MongoDB has excellent instructions on how to install the MongoDB Community Edition on Ubuntu. Install MongoDB on your local machine using the official documentation: [Install MongoDB Community Edition](https://docs.mongodb.com/manual/administration/install-community/). Once that is done the remainder of this article will focus on configuration.

> TODO: How to incorporate this material?

## Definitions

Reading the definition of a term doesn't always lead to immediate understanding. For me, the best way to learn new terms is to read through them, put them to use as you will do below, and then come back and read them again.

- **Resource:** A resource can be a database, collection, set of collections or a cluster.

- **Action:** An action specifies the operation allowed on the resource. For example 'find', 'create' or 'insert'.

- **Privilege:** A privilege consists of a specified resource and the actions permitted on it.

- **Role:** A set of privileges. A role can contain one or more privileges. It can also contain other roles, in which case granting the role to a user applies the privileges in the contained role.
- **Built-in roles:** Built-in roles are roles that come with MongoDB by default. A complete list of built-in roles can be found at: [Built-In Roles](https://docs.mongodb.com/manual/reference/built-in-roles/).
- **User-defined roles:** User-defined roles are roles that are created by a MongoDB user. You use them to customize privileges according to your needs. Read more about user-defined roles at: [User-Defined roles](https://docs.mongodb.com/manual/core/security-user-defined-roles/)
- **Role-Based Access Control:** Initially after installation, access control is not enabled. This means authentication is not required to access MongoDB. Once you enable access control users must authenticate themselves. Role-based access control. Read more at: [Role-Based Access Control](https://docs.mongodb.com/manual/core/authorization/#role-based-access-control)
- **Authentication Database:** You create a given user in a given database and that becomes the authentication database for the user. However, a user's privileges are not limited to that database. You can assign it roles in other databases as well. Read more at: [Authentication Database](https://docs.mongodb.com/manual/core/security-users/#user-authentication-database)


> TODO: What and where does this go?
## Illustrative Info
- You can see users in roles using Robo3T. Roles are in system.roles and users in system.users



---

**Extra Information**

- [Database Commands](https://docs.mongodb.com/manual/reference/command/)
  - [Role Management Commands](https://docs.mongodb.com/manual/reference/command/nav-role-management/)
  - [createUser](https://docs.mongodb.com/manual/reference/command/#user-management-commands)


  ```console

  sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 9DA31620334BD75D9DCB49F368818C72E52529D4

  echo "deb [ arch=amd64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.0.list

  sudo apt-get update

  sudo apt-get install -y mongodb-org

  sudo systemctl enable mongod
  sudo systemctl start mongod

  ```


---

Begin content

---



Now we will configure MongoDB. We need to:
- Crate super & test users
- Enable authentication
- Perform some brief testing


> We will be using the MongoDB Shell. If you are not familiar with it see [The mongo Shell](https://docs.mongodb.com/manual/mongo/).

---
## Authentication is Not Enabled

Before creating users let's take a quick look the current lack of authentication. Start the MongoDB shell. The command is simply `mongo`.

```console
mongo
```

As you can see from the output in the image below, your in and have full access. We will fix this issue below, but first we need a user to authenticate with.

<em>click on the image for a larger view</em>
<br><br>
![authentication not enabled message](media/authentication-not-enabled-message.png)
---

## Create superuser

The first user to create is the 'superuser'. This user has full access and will only be used for certain tasks.

If you are not still in the mongo shell type `mongo` to enter it.

```console
mongo

```

The `use admin` command switches you to the `admin` database. This will be the 'authentication database' for superuser.

```console

use admin

```

Now use `createUser()` the create the superuser with the [root role](https://docs.mongodb.com/manual/reference/built-in-roles/#root).

```console

db.createUser(
  {
    user: "superuser",
    pwd: "karl",
    roles: [ "root" ]
  }
)
```

## Enable Authenticaton

To enable authentication you need to add a line to the `mongo.service` file.

> In the steps below the editor 'GNU nano' will be used. However, you can use any editor you are comfortable with. I you want to know more about nano, [visit its documentation](https://www.nano-editor.org/dist/latest/nano.html).

Exit the mongo shell.

```console

ctrl+c

```

Use nano to edit the file.

```

sudo nano /lib/systemd/system/mongod.service


```

Find the line

```
ExecStart=/usr/bin/mongod --config /etc/mongod.conf

```

And add `--auth` to it so the full line is

```

ExecStart=/usr/bin/mongod --auth --config /etc/mongod.conf

```

If you are not familiar with Nano, note the keyboard shortcuts at the bottom of the editor. To save the file and exit Nano

- `ctrl+o` then `enter` to write the file to disk
- `ctrl+x` to exit Nano


Next you need to reload system level configuration with the command:

```
sudo systemctl daemon-reload
```

And then restart the `mongod` process:

```
sudo service mongod restart
```


## Verify Authentication

```js
mongo
```

Output - no longer warning about authentication

```js
MongoDB shell version v4.0.10
connecting to: mongodb://127.0.0.1:27017/?gssapiServiceName=mongodb
Implicit session: session { "id" : UUID("f0f33c53-812d-4db6-b4d2-a7eb30aa7048") }
MongoDB server version: 4.0.10

```


- Try ...
```
db.getUsers()
```
... and get 'not authorized' message
```
2019-06-01T11:35:26.549-0700 E QUERY    [thread1] Error: not authorized on test to execute command { usersInfo: 1.0, $db: "test" } :
_getErrorWithCode@src/mongo/shell/utils.js:25:13
DB.prototype.getUsers@src/mongo/shell/db.js:1686:1
@(shell):1:1

```

## Create testUser

Login as superuser
```js
ctrl+c
mongo -u superuser -p --authenticationDatabase admin
```


```js
use todo-test
db.createUser(
  {
    user: "testUser",
    pwd: "karl",
    roles: [ { role: "readWrite", db: "todo-test" } ]
  }
)
```

```js
use todo-dev
db.createUser(
  {
    user: "devUser",
    pwd: "karl",
    roles: [ { role: "readWrite", db: "todo-dev" } ]
  }
)
```


Exit & login as testUser

```js
ctrl+c
mongo -u testUser -p --authenticationDatabase todo-test
```



## Test testUser
```js
use todo-test

db.todos.insertOne({ title: 'todo1', completed: false })
{
	"acknowledged" : true,
	"insertedId" : ObjectId("5cf316024766652dcde6f7b5")
}
```

Output
```js
 {
... "acknowledged" : true,
... "insertedId" : ObjectId("5cf316024766652dcde6f7b5")
... }
```


```js

db.todos.find()
{ "_id" : ObjectId("5cf316024766652dcde6f7b5"), "title" : "todo1", "completed" : false }

```
Output
```js
{
... "acknowledged" : true,
... "insertedId" : ObjectId("5cf316024766652dcde6f7b5")
... }
```

## Commands

```
sudo systemctl start mongodb
sudo systemctl stop mongodb
sudo systemctl restart mongodb
sudo systemctl status mongodb

TODO: My guess is enable makes it start automatically and disable does not?
sudo systemctl enable mongodb // don't start automatically
sudo systemctl disable mongodb // don't start automatically
```


## Test App
1. clone app
```js
git clone https://github.com/klequis/wrapping-calls-to-mongodb.git
```
2. Open in vs code
```js
cd wrapping-calls-to-mongodb
code .
```
__index.js__
```js
return 'mongodb://localhost:27017'
```
to
```js
return 'mongodb://testUser:password@localhost:27017'
```

```js
npm i
npm run test
```
All tests should pass
