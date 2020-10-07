# ec-app-engine
The ``ec-app-engine`` is the abstraction layer for the **EyeCaptain-Application**.

### Release new version  
1. Run `npm version [<newversion> | major | minor | patch | premajor | preminor | prepatch | prerelease [--preid=<prerelease-id>] | from-git]` to get the package to a new version.  
3. If you haven't been logged in to the package registry run ``npm login`` and enter your credentials
    * Username = Your git username
    * Password = Your personal access token*
    * Email = Your contact email (will be public)
2. After that you yan use `npm publish` to publish the app.

> *You can get an access token in your profile: https://github.com/settings/tokens   
> For more information about the registry go to [this page](https://docs.github.com/en/free-pro-team@latest/packages/using-github-packages-with-your-projects-ecosystem/configuring-npm-for-use-with-github-packages)
