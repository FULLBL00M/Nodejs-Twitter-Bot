![Tweetin'](https://botwiki.org/content/tutorials/make-an-image-posting-twitter-bot/images/posting-images.png)

# random-image-twitterbot

1. Update `.env` with your Twitter api keys ([see how to get them](https://botwiki.org/tutorials/how-to-create-a-twitter-app/)).
2. Put all your images into the `assets` folder.
3. Set up a free service ([Uptime Robot](https://uptimerobot.com/), [cron-job.org](https://cron-job.org/en/), or [others](https://www.google.com/search?q=free+web+cron)) to wake up your bot every 25+ minutes and tweet. Use `https://YOURPROJECTNAME.glitch.me/tweet` as a URL to which to send the HTTP request.


Also, check out [this tutorial](https://botwiki.org/tutorials/random-image-tweet/) and [this guide](https://botwiki.org/tutorials/importing-github-glitch/) where I attempt to adapt the original code for this bot so that it runs on Glitch. 
