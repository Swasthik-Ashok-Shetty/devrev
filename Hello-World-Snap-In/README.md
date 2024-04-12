# DevRev Snaps TypeScript Template For Hello World Display

#### This repository contains a template for the functions for Displaying Hello World Comment while work-item creation as part of Snap-Ins.

## Installation and Requirements for Snap-In Creation
 1. Create organisation in [Dev-org](https://app.devrev.ai/) in Devrev.ai 
 2. Download and Install [Devrev CLI](https://developer.devrev.ai/snap-in-development/references/install-dev-rev-cli).
 3. Install [jq](https://jqlang.github.io/jq/)
 4. Install devrev/typescript-sdk
```
npm i @devrev/typescript-sdk
```

## Getting started with the template
  1. Create a new repository from this command.
```
devrev snap_in_version init
```
2. In the new folder, "devrev-snaps-typescript-template" you can add more functions at path `src/functions` where the folder name corresponds to the function name in your manifest file.
 3. Each function you add will also need to be mentioned in `src/function-factory.ts` .

## Testing locally
 You can test your code by adding test events under `src/fixtures` similar to the example event provided. You can add keyring values to the event payload to test API calls as well.

 Once you have added the event, you can test your code by running:
```
npm install
npm run start:watch -- --functionName=function_1 --fixturePath=function_1_event.json
npm run start:watch -- --functionName=function_2 --fixturePath=function_2_event.json
```

## Adding external dependencies
 You can also add dependencies on external packages in package.json under the "dependencies" key. These dependencies will be made available to your function at runtime and testing.

## Packaging the code
 Once you are done with the testing,
 Run under `Hello-World-Snap-In/code`
```
npm install
npm run build
npm run package
```
 and ensure it succeeds.

 You will see a `build.tar.gz` file is created and you can provide it while creating the snap_in_version.

## Creating and Deploying the Snap-In
 Once the installation and packaging of code is done,
 The following command under `Close-Issue-Snap-In/code` need to be followed,

#### 1. To Authenticate
```
devrev profiles authenticate --org <DevOrg-slug-name> --usr <your-email@example.com>
```
   where,
  1. `<DevOrg-slug-name>`: The unique slug name of your DevOrg to which you want to log in.
 2. `<your-email@example.com>`: Your registered user email for Devrev profile.

#### 2. Create a snap-in package
```
devrev snap_in_package create-one --slug <slug name>
```
   For Example,
```
devrev snap_in_package create-one --slug close-snap-in | jq .
```

#### 3. Create a snap-in version
```
devrev snap_in_version create-one --path <path to the snap-in code>
```
 For Example here,

```
devrev snap_in_version create-one --manifest ../manifest.yaml --archive ./build.tar.gz | jq .
```

#### 4. Show a snap-in version
```
devrev snap_in_version show | jq .
```

#### 5. Create a Snap-in in draft
```
devrev snap_in draft | jq .
```

## Once the following commands is runned successfully, the Created Snap-In Has to be installed in the Devrev account.
## After the installation the snap-in can be used to comment Hello World while creating work item (Issue/Ticket) and same comment can be displayed using slash command `/say_hello_world` under description section of the work item (Issue/Ticket).
