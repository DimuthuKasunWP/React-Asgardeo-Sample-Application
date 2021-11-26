# Sample React Applicaiton With Asgardeo User Authentication

## Description
This is a sample ReactJS based application , implemented for demonstration purposes. The design is inspired by a template from <a href="https://www.free-css.com/assets/files/free-css-templates/preview/page234/interact/">Free-CSS.com </a>

## Make it Yours!
### 1. Preps
You will need to have <a href="https://nodejs.org/">Node JS</a> installed on your pc. 

### 2. Clone Files
After cloning the files, you will have to run ```yarn``` followed by ```yarn start``` in the CLI or ```npm install``` followed by ```npm start```

### 3. Change Running Port
Default Running script ```npm start ``` will be execute as ```PORT=5000 react-script start ``` as mentioned in the package.json file. This command will work linux and Mac os and if you want to change the port on windows change the start script as ``` set PORT = 5000 react-script start ``` . 

### 4. Add the Asgardeo Configurations
Update asgardeo configurations in the ```src/config.json```.

```
{
    "clientID": "",
    "serverOrigin": "https://api.asgardeo.io/t/<org_name>",
    "signInRedirectURL": "https://localhost:3000/home",
    "signOutRedirectURL": "https://localhost:3000",
    "scope": [ "openid","profile" ,"email", "internal_login"]
}
```
