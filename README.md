![Tweetin'](https://botwiki.org/content/tutorials/make-an-image-posting-twitter-bot/images/posting-images.png)

# random-image-twitterbot

1. Update `.env` with your Twitter api keys ([see how to get them](https://botwiki.org/tutorials/how-to-create-a-twitter-app/)).
2. Put all your images into the `assets` folder.
3. Set up a free service ([Uptime Robot](https://uptimerobot.com/), [cron-job.org](https://cron-job.org/en/), or [others](https://www.google.com/search?q=free+web+cron)) to wake up your bot every 25+ minutes and tweet. Use `https://YOURPROJECTNAME.glitch.me/tweet` as a URL to which to send the HTTP request.


Also, check out [this tutorial](https://botwiki.org/tutorials/random-image-tweet/) and [this guide](https://botwiki.org/tutorials/importing-github-glitch/) where I attempt to adapt the original code for this bot so that it runs on Glitch. 

## Notes

Due to a _glitch_ in Glitch, it seems that deleting images from the assets folder may not always fully remove them. To fix this, open the Console from the  Advanced options of your project.

![Open Console/Terminal](https://cdn.glitch.com/3c154b8d-e506-4703-8406-6c95aa79ea3a%2Ffix-assets-1.PNG?1505911667214)

Then type `nano .glitch-assets`.

![Console/Terminal](https://cdn.glitch.com/3c154b8d-e506-4703-8406-6c95aa79ea3a%2Ffix-assets-2.PNG?1505911668539)

This will open a file Glitch uses to reference your assets. You can press `CTRL+K` to remove one line. When you're done, press `CTRL+X`, then `Y` to confirm changes, and finally press the `Enter` key to save your file. 