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
```
## Want to see your data get added  LIVE in VScode?
```
Install "SQLite" extension in VScode
Find the dev.sqlite3 file in the server side 
Click "Open Database" and you will see it pop up at the bottom
Go into the user or todos table to see which one you added
```

## Want to test it on Insomnia? create your routes "Todo" the following

```
Make sure Header tab has "Content-Type" as header set and value application/json
Any routes that needs auth (creating Todos, delete Todos, edit Todos etc), 
to test it in Insomnia, add a second Header value called "auth-token", 
and pass it you jwt token in the value section, 
I left the token in your terminal, 
so you can copy that and paste it in Insomnia to see what each routes returns
```