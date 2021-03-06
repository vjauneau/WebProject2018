# PerudoOnline
This application was generated using JHipster 5.5.0, you can find documentation and help at [https://www.jhipster.tech/documentation-archive/v5.5.0](https://www.jhipster.tech/documentation-archive/v5.5.0).

## Mise en route de l'application en Dev

Installer node.js
Installer Jhipster https://www.jhipster.tech/installation/

Tout d'abord effectuer un git clone du repository en local sur votre Machine.
Ouvrir un invite de commande et utiliser

    npm install or yarn install
    
Afin d'installer les dépendances nécessaires au projet.

Ouvrir pgAdmin et Créer un utilisateur : 
    login Perudo
    password perudo
Ainsi qu'une base associé
    Perudo

Démarrer le serveur java, liquibase va générer votre base de données référentielles.
Dans l'invite de commande démarrer l'application Web : 

    ./mvnw
    npm start or yarn start

Vous pouvez désormais accéder à l'application via :
http://localhost:9000 WebSync browser via yarn
http://localhost:8080 Local 



## Development

Before you can build this project, you must install and configure the following dependencies on your machine:

1. [Node.js][]: We use Node to run a development web server and build the project.
   Depending on your system, you can install Node either from source or as a pre-packaged bundle.

After installing Node, you should be able to run the following command to install development tools.
You will only need to run this command when dependencies change in [package.json](package.json).

    npm install or yarn install

We use npm scripts and [Webpack][] as our build system.

Run the following commands in two separate terminals to create a blissful development experience where your browser
auto-refreshes when files change on your hard drive.

    ./mvnw
    npm start or yarn start

Npm is also used to manage CSS and JavaScript dependencies used in this application. You can upgrade dependencies by
specifying a newer version in [package.json](package.json). You can also run `npm update` and `npm install` to manage dependencies.
Add the `help` flag on any command to see how you can use it. For example, `npm help update`.

The `npm run` command will list all of the scripts available to run for this project.

### Managing dependencies

For example, to add [Leaflet][] library as a runtime dependency of your application, you would run following command:

    npm install --save --save-exact leaflet
    yarn add leaflet

To benefit from TypeScript type definitions from [DefinitelyTyped][] repository in development, you would run following command:

    npm install --save-dev --save-exact @types/leaflet
    yarn add @types/leaflet

Then you would import the JS and CSS files specified in library's installation instructions so that [Webpack][] knows about them:
Note: there are still few other things remaining to do for Leaflet that we won't detail here.

For further instructions on how to develop with JHipster, have a look at [Using JHipster in development][].

## Building for production

To optimize the PerudoOnline application for production, run:

    ./mvnw -Pprod clean package

This will concatenate and minify the client CSS and JavaScript files. It will also modify `index.html` so it references these new files.
To ensure everything worked, run:

    java -jar target/*.war

Then navigate to [http://localhost:8080](http://localhost:8080) in your browser.

Refer to [Using JHipster in production][] for more details.

## Testing

To launch your application's tests, run:

    ./mvnw clean test

### Client tests

Unit tests are run by [Jest][] and written with [Jasmine][]. They're located in [src/test/javascript/](src/test/javascript/) and can be run with:

    npm test



For more information, refer to the [Running tests page][].

### Code quality

Sonar is used to analyse code quality. You can start a local Sonar server (accessible on http://localhost:9001) with:

```
docker-compose -f src/main/docker/sonar.yml up -d
```

Then, run a Sonar analysis:

```
./mvnw -Pprod clean test sonar:sonar
```

For more information, refer to the [Code quality page][].

