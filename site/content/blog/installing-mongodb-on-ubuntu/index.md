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

# <temp>

- Install it
- Illustrate auth not Enabled
- create superUser
- Enable authentication
  - Verify authentication
- Login as superUser
- Create testUser
  - Test testUser
- Create devUser
  - Test devUser
- MongoDB Commands
- xx - Test App (I don't thing this is needed but ...)
- Reference

# </temp>

The production version of our app will use [MongoDB](https://mongodb.com) hosted on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas). However, for development it is easier to work with MongoDB locally.

## MongoDB Local Install

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


Now we will configure MongoDB. We need to:
- Create super & test users.
- Enable authentication.
- Perform some brief testing for each user.


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

## Create superUser

The first user to create is the 'superUser'. This user has full access and will only be used for certain tasks.

If you are not still in the mongo shell type `mongo` to enter it.

```console
mongo

```

The `use admin` command switches you to the `admin` database. This will be the 'authentication database' for superUser.

```console
use admin
```

Response:
```js
switched to db admin
```

Now use `createUser()` the create the superUser with the [root role](https://docs.mongodb.com/manual/reference/built-in-roles/#root).

```console
db.createUser(
  {
    user: "superUser",
    pwd: "karl",
    roles: [ "root" ]
  }
)
```

Response:
```console
Successfully added user: { "user" : "superUser", "roles" : [ "root" ] }
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

## Login as 'superUser'

If you are already in the mongo shell, exit using `ctrl-c`.

Use the below command to login as 'superUser'. The command options are:
- `-u superUser`: Login as user 'superUser'.
- `-p`: Prompt for password.
- `--authenticationDatabase admin`: Authenticate using the `admin` database.

```console
mongo -u superUser -p --authenticationDatabase admin
```

> **Security Tip:**
>
> You could include your password in the above command as `-p yourPassword` but this would put your password in the [bash](https://www.gnu.org/software/bash/) history file which can be read by an attacker. Don't do it!.


## Create testUser

If you are not already logged in as 'superUser', follow the steps in the section above.

Now create testUser. The command specifies

- `user: "testUser"`: The username is 'testUser'.
- `pwd: "karl"`: The user's password is 'karl'.
- `roles: [ { role: "readWrite", db: "todo-test" } ]`: The user is granted the [readWrite](https://docs.mongodb.com/manual/reference/built-in-roles/#readWrite) role in the `todo-test` database.

Switch to `todo-test`
```console
use todo-test
```

Create 'testUser'
```js
db.createUser(
  {
    user: "testUser",
    pwd: "karl",
    roles: [ { role: "readWrite", db: "todo-test" } ]
  }
)
```

Output
```console
Successfully added user: {
	"user" : "testUser",
	"roles" : [
		{
			"role" : "readWrite",
			"db" : "todo-test"
		}
	]
}
```

### Verify 'testUser'

If you are still in the Mongo Shell exit using ctrl-c



Login as testUser

```console
mongo -u testUser -p --authenticationDatabase todo-test
```

Switch to `todo-test`.

```console
use todo-test
```

Response:

```console
switched to db todo-test
```

```js
db.todos.insertOne({ title: 'todo1', completed: false })
```

**Output**
```js
{
 "acknowledged" : true,
 "insertedId" : ObjectId("5cf316024766652dcde6f7b5")
}
```

```js
db.todos.find()
```

**Output**
Your ObjectId will be different.
```js
{ "_id" : ObjectId("5de709fa170028214eb1b060"), "title" : "todo1", "completed" : false }

```

## Create 'devUser'

Login as superUser again

Switch to `todo-dev`

```js
use todo-dev
```

Response:
```console
switched to db todo-dev
```

```js
db.createUser(
  {
    user: "devUser",
    pwd: "karl",
    roles: [ { role: "readWrite", db: "todo-dev" } ]
  }
)
```

Response

```js
Successfully added user: {
	"user" : "devUser",
	"roles" : [
		{
			"role" : "readWrite",
			"db" : "todo-dev"
		}
	]
}
```

### Verify 'devUser'

If you are still in the Mongo Shell exit using ctrl-c

Exit & login as devUser

```js
mongo -u devUser -p --authenticationDatabase todo-dev
```

Switch to `todo-dev`

```js
use todo-dev
```

Resposne:
```console
switched to db todo-dev
```

```js
db.todos.insertOne({ title: 'todo1', completed: false })
```

Response:

```js
{
 "acknowledged" : true,
 "insertedId" : ObjectId("5cf316024766652dcde6f7b5")
}
```

```js
db.todos.find()
```

Output
```js
{ "_id" : ObjectId("5de728de0d36cc3a5b23e03e"), "title" : "todo1", "completed" : false }
```


## MongoDB Commands

```
sudo systemctl start mongod
sudo systemctl stop mongod
sudo systemctl restart mongod
sudo systemctl status mongod

TODO: My guess is enable makes it start automatically and disable does not?
sudo systemctl enable mongodb // don't start automatically
sudo systemctl disable mongodb // start automatically
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


# Reference
- [How To Securely Configure a Production MongoDB Server](https://www.digitalocean.com/community/tutorials/how-to-securely-configure-a-production-mongodb-server)
- [Built-In Roles](https://docs.mongodb.com/manual/reference/built-in-roles/)
- [Database Commands](https://docs.mongodb.com/manual/reference/command/)
- [Role Management Commands](https://docs.mongodb.com/manual/reference/command/nav-role-management/)
- [createUser](https://docs.mongodb.com/manual/reference/command/#user-management-commands)
