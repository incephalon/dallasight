#!/bin/bash

# ----------------------
# KUDU Deployment Script
# ----------------------

# Helpers 
# -------

exitWithMessageOnError () {
  if [ ! $? -eq 0 ]; then
    echo "An error has occured during web site deployment."
    echo $1
    exit 1
  fi
}

# Prerequisites
# -------------

# Verify node.js installed
hash node 2>/dev/null
exitWithMessageOnError "Missing node.js executable, please install node.js, if already installed make sure it can be reached from current environment."

# Setup
# -----

SCRIPT_DIR="$( cd -P "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
ARTIFACTS=$SCRIPT_DIR/artifacts

if [[ ! -n "$DEPLOYMENT_SOURCE" ]]; then
  DEPLOYMENT_SOURCE=$SCRIPT_DIR
fi

if [[ ! -n "$NEXT_MANIFEST_PATH" ]]; then
  NEXT_MANIFEST_PATH=$ARTIFACTS/manifest

  if [[ ! -n "$PREVIOUS_MANIFEST_PATH" ]]; then
    PREVIOUS_MANIFEST_PATH=$NEXT_MANIFEST_PATH
  fi
fi

if [[ ! -n "$DEPLOYMENT_TARGET" ]]; then
  DEPLOYMENT_TARGET=$ARTIFACTS/wwwroot
else
  KUDU_SERVICE=true
fi

if [[ ! -n "$KUDU_SYNC_CMD" ]]; then
  # Install kudu sync
  echo Installing Kudu Sync
  npm install kudusync -g --silent
  exitWithMessageOnError "npm failed"

  if [[ ! -n "$KUDU_SERVICE" ]]; then
    # In case we are running locally this is the correct location of kuduSync
    KUDU_SYNC_CMD="kuduSync"
  else
    # In case we are running on kudu service this is the correct location of kuduSync
    KUDU_SYNC_CMD="$APPDATA/npm/node_modules/kuduSync/bin/kuduSync"
  fi
fi

# Node Helpers
# ------------

installNodist () {
  NODE_EXE="$PROGRAMFILES/nodejs/node.exe"
  NODE_RUNTIME_ROOT="$DEPLOYMENT_TARGET/../.."
  NODIST_NODE_EXE="$NODE_RUNTIME_ROOT/node/nodist/bin/node.exe"
  NPM_CMD="$NODE_RUNTIME_ROOT/node/nodist/bin/npm"

  if [[ ! -e "$NODE_RUNTIME_ROOT/node/nodist/bin/node.exe" ]]; then
    echo Installing nodist
    cd $NODE_RUNTIME_ROOT
    mkdir node
    cd node
    git clone git://github.com/marcelklehr/nodist.git 2>/dev/null
    cd nodist
    npm install --production
    cd bin
    nodist update
  fi
}

installNodeAndNpm() {
  cd $NODE_RUNTIME_ROOT/node/nodist/bin
  SELECT_NODE_VERSION="\"$NODE_EXE\" \"$DEPLOYMENT_TARGET/conf.js\""
  eval "$SELECT_NODE_VERSION"
  NODE_VERSION=`cat nodeVersion.tmp`
  NPM_VERSION=`cat npmVersion.tmp` 
  echo "node version: `nodist $NODE_VERSION`"
# Check the locally installed npm to see if it matches the required version. 
# If a range is specified, it will not match up and so npm will still be invoked.
# For best performance specify a specific version rather than a semver expression
  MATCH=`npm ls npm@$NPM_VERSION | grep -c $NPM_VERSION`
  if [[ "$MATCH" == "0" ]]; then
    cmd.exe /c "\"$NPM_CMD\" install npm@$NPM_VERSION"
    exitWithMessageOnError "npm failed"
  fi
  echo "npm version: `cmd.exe /c \"\"$NPM_CMD\" -v\"`"
}

##################################################################################################################################
# Deployment
# ----------

echo Handling node.js grunt deployment.

# 1. Select node version
selectNodeVersion

# 2. Install npm packages
if [ -e "$DEPLOYMENT_SOURCE/package.json" ]; then
  eval $NPM_CMD install
  exitWithMessageOnError "npm failed"
fi

# 3. Install bower packages
if [ -e "$DEPLOYMENT_SOURCE/bower.json" ]; then
  eval $NPM_CMD install bower
  exitWithMessageOnError "installing bower failed"
  ./node_modules/.bin/bower install
  exitWithMessageOnError "bower failed"
fi

# 4. Run grunt
if [ -e "$DEPLOYMENT_SOURCE/Gruntfile.js" ]; then
  eval $NPM_CMD install grunt-cli
  exitWithMessageOnError "installing grunt failed"
  ./node_modules/.bin/grunt --no-color clean common dist
  exitWithMessageOnError "grunt failed"
fi

# 5. KuduSync to Target
"$KUDU_SYNC_CMD" -v 500 -f "$DEPLOYMENT_SOURCE/dist" -t "$DEPLOYMENT_TARGET" -n "$NEXT_MANIFEST_PATH" -p "$PREVIOUS_MANIFEST_PATH" -i ".git;.hg;.deployment;deploy.sh"
exitWithMessageOnError "Kudu Sync to Target failed"

##################################################################################################################################

echo "Finished successfully."