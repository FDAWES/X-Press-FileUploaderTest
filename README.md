# X-Press-FileUploaderTest

#### The purpose of this application is to illustrate a couple upload/storage options for files submitted from the client side. In this application I used 3 different methods to hand file uploads.
**Method #1** utilizes the **express-fileuploader** package [find it here.](https://www.npmjs.com/package/express-fileuploader)

**Method #2** utilizes the **aws-sdk** package [find it here.](https://www.npmjs.com/package/aws-sdk)
	*This method requires you to setup an account with AWS. You can do that [here](https://www.amazon.com/ap/signin?openid.assoc_handle=aws&openid.return_to=https%3A%2F%2Fsignin.aws.amazon.com%2Foauth%3Fresponse_type%3Dcode%26client_id%3Darn%253Aaws%253Aiam%253A%253A934814114565%253Auser%252Fportal-aws-auth%26redirect_uri%3Dhttps%253A%252F%252Fconsole.aws.amazon.com%252Fbilling%252Fhome%253Fstate%253DhashArgs%252523%2526isauthcode%253Dtrue%26noAuthCookie%3Dtrue&openid.mode=checkid_setup&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&action=&disableCorpSignUp=&clientContext=&marketPlaceId=&poolName=&authCookies=&pageId=aws.ssop&siteState=unregistered%2Cen_US&accountStatusPolicy=P1&sso=&openid.pape.preferred_auth_policies=MultifactorPhysical&openid.pape.max_auth_age=120&openid.ns.pape=http%3A%2F%2Fspecs.openid.net%2Fextensions%2Fpape%2F1.0&server=%2Fap%2Fsignin%3Fie%3DUTF8&accountPoolAlias=&forceMobileApp=0&language=en_US&forceMobileLayout=0)*
	*This method also requires that you create a storage bucket. Find instructions for that [here](https://docs.aws.amazon.com/AmazonS3/latest/gsg/CreatingABucket.html)*
	*Lastly, you will need to create access keys so that the aws-sdk can access your storage buckets. Find instructions on that [here.](https://docs.aws.amazon.com/general/latest/gr/managing-aws-access-keys.html)*

**Method #3** utilizes **fs** to copy the file from the temp directory (where the image initially gets saved) to the upload directory that you specify

**Attention Heroku Users!!!!!!**
The only method that will **persist** in the Heroku environment is **Method #2**. **Method #3** will also work (in this app) but once you restart the dyno or push new changes to Heroku, you will lose **ALL** uploaded files. 

`Also you will need to setup *config vars* containing your AWS *access key* and *secret*. **I have also setup a configuration variable for the storage bucket that I want this app to always access. (This is not necessary. Just my choice.)**

If you need help with configuration variable setup in Heroku, please check out this [link.](https://devcenter.heroku.com/articles/config-vars#setting-up-config-vars-for-a-deployed-application) 
Heroku also has a specific section on link the AWS S3 storage to your Heroku app. That can be found at this [link.](https://devcenter.heroku.com/articles/s3)

**Testing AWS in Development**
If you are testing AWS upload in development, you will need to complete some basic configuration. Just check out the **Basic Configuration** section of this [repo.](https://github.com/aws-samples/aws-nodejs-sample#basic-configuration) The repo has sample code and is a great way just to get started and you can build from there.

**Any questions, please log issues! Open source is the best source!**