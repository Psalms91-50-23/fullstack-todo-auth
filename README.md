# FullStack Authenticated Todo, "Todo" App correctly follow below instructions

```
npm install
create .env in your root directory, 
where the .gitignore is and putting in your own secret after the "=" sign JWT_TOKEN_SECRET=JKggSHj312DS,
sample key given
npm run knex migrate:latest
npm run dev
Will run on local host 3000, 
make sure your vpn is turned off as it will not work
To reset data back to the initial state use the command,
"npm run knex migrate:rollback" followed by,
"npm run knex migrate:latest",
then do "npm run dev" to start server
```
## Want to see your data get added  LIVE in VScode?
```
Install "SQLite" extension in VScode
Find the dev.sqlite3 file in the server side 
Click "Open Database" and you will see it pop up at the bottom
Go into the user or todos table to see which one you added
```

## Want to test it in Insomnia? Create your routes "Todo" the following

```
Make sure Header tab has "Content-Type" as header set and value application/json
Any routes that needs auth (creating Todos, delete Todos, edit Todos etc), 
to test it in Insomnia, add a second Header value called "auth-token", 
and pass it your jwt token in the value section, 
I left the token in your terminal, 
so you can copy that and paste it in Insomnia to see what each routes returns
When adding values for priority use digits 0-3 ["low","moderate","high","very high"],
0 being "low" and use number values 0 (being false) 1 for being true for active and completed
Make sure you login and so you get a users UID for creating todos etc.


Create User 
http://localhost:3000/api/user/register 
{
	"name": "kho",
	"email": "kho@gmail.com",
	"password": "!123Abc"	
}

Login sample
http://localhost:3000/api/user/login
{
	"email": "kho@gmail.com",
	"password": "!123Abc"	
}

Creating Todo
http://localhost:3000/api/todos

{
	"task": "Keep learning",
	"completed": 0,
	"active": 1,
	"priority": 3,
	"user_uid": "4373e4cd41d48d46"
}

Delete Todo
http://localhost:3000/api/todos/2

Get Todo by id
http://localhost:3000/api/todos/6

Patch Todo by id
http://localhost:3000/api/todos/6
{
    "id": 6,
    "task": "testing again trying it???",
    "completed": 0,
    "active": 1,
    "priority": 1,
    "user_uid": "4373e4cd41d48d46"
}

```