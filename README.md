![Tweetin'](https://botwiki.org/content/tutorials/make-an-image-posting-twitter-bot/images/posting-images.png)

# random-image-twitterbot

1. Update `.env` with your Twitter api keys ([see how to get them](https://botwiki.org/tutorials/how-to-create-a-twitter-app/)).
2. Put all your images into the `assets` folder.
3. Set up a [free service to keep your bot awake](https://botwiki.org/tutorials/importing-github-glitch/#step-5).
4. Watch your bot tweet!

Also, check out this "[guide](https://botwiki.org/tutorials/importing-github-glitch/)" where I attempt to adapt the original code for this bot so that it runs on Glitch. 


**Note:** Apps hosted on Glitch are automatically put to sleep after 5 minutes of inactivity (that is, if nobody opens your app in a browser window or it doesn't receive any data).

Twitter's API doesn't send requests to y([Uptime Robot](https://uptimerobot.com/), [cron-job.org](https://cron-job.org/en/), or [others](https://www.google.com/search?q=free+web+cron)) to regularly ping your app every 25 minutes to wake it up.