# Home

<p align="center">
  <a href="https://ttsclan.vercel.app">
<img height=300 src="https://cdn.discordapp.com/icons/570349873337991203/7f945e4de66e287e33e029043c99dd76.png?size=512"/>
  </a>
</p>
<p align="center">
  <strong>
 The Tomatohead Society (TTS) is a Fortnite clan that strongly
    <br>
 supports Team Pizza and is always looking for new members like you!
    </strong>
</p>

# Welcome

Welcome to the TTS Documentation, the dashboard to interact with the TTS discord server.

TTS makes it easy to view and manage all things in TTS.

---

## Structure

| Codebase                 | Description      |
| ------------------------ | ---------------- |
| [crustina](crustina)     | API Client       |
| [hothouse](hothouse)     | Discord.js Bot   |
| [nightshade](nightshade) | Next.js Frontend |
| [zzaria](zzaria)         | Nest.js Backend  |

# Overview

-   [Patch Notes](#patch-notes)
-   News
-   Bugs
-   Item Shop
-   Dark Mode
-   Open Source

# Basic Features

-   [Create account](#authentication)

# Patch Notes

-   Patch Notes are a simple way for creators to share release notes of their maps and bots with TTS members

-   When created

    -   You can add a name and an image URL for the Patch Notes
    -   If your don't have an image you can add text with markdown to be used. Markdown can also be used with an image
    -   You can schedule for them to release at a certain date
    -   You can also choose whether other creators can see your patch notes before they are scheduled to release
    -   You can create a command for TTS Bot to integrate with the patch notes. When the command is used it will send an image with the patch notes if they are released

-   TTS Creators and Members can like and dislike Patch Notes

# Authentication

-   You can simply log into TTS by using your Discord account
-   When you first click a log in button you will be redirected to Discord and it will ask you to hit accept
-   If you have already hit accept before you don't have to do it again
-   Once you hit accept if will check if you are in the TTS Discord. If you are not in TTS you will be redirected to the TTS invite link. **(not implemented yet. See [#40](/../../issues/40) for more details)**

## Technical Details in Authentication

-   Data from the TTS Server is fetched and saved in the database
-   If user is in TTS their account is created or updated in the database 
-   Otherwise they are redirected to the TTS Discord Server invite link and the login process fails
-   If everything goes well and user is in TTS an access token and a refresh token for that user will be generated
-   This access token and refresh tokens are secert keys that are used to know who you are. Do not share these otherwise the person you shared it with can log in as you! They will be able to get your data and do actions as if they are you.
-   After tokens are created the user will be redirected to `/save?accessToken=whatever_the_access_token_is&refreshToken=whatever_the_refresh_token_is`
-   The client will save the access token and refresh token in local storage
-   Then a Websocket connection between the server and the client will established
-   The tokens are sent through a WS message (Websocket Message): 
```json
["auth", {"accessToken": "whatever_the_access_token_is", "refreshToken": "whatever_the_refresh_token_is"}]
```
 -  If the access token and refresh token are valid then the server will respond with a WS message like this that contains the user details:
 ```json
["auth-success", {
  "avatarUrl": "https://cdn.discordapp.com/avatars/481158632008974337/d9712404dc60ea0f39712a91f7b914d4.png?size=2048",
  "id": "481158632008974337",
  "name": "Creeper",
  "tag": "Creeper#4717",
   "_id": "5fd0e32d087b692d04143ca2",
  "__v": 0
}]
``` 
