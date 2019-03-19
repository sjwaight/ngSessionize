workflow "New workflow" {
  on = "push"
  resolves = ["Azure CLI"]
}

action "Build" {
  uses = "actions/npm@master"
  args = "install"
}

 action "Azure Login" {
  uses = "Azure/github-actions/login@master"
  env = {
    AZURE_SUBSCRIPTION = "Subscription Name"
  }
  secrets = ["AZURE_SERVICE_APP_ID", "AZURE_SERVICE_PASSWORD", "AZURE_SERVICE_TENANT"]
  needs = ["Build"]
}

action "Azure CLI" {
  uses = "Azure/github-actions/cli@master"
  env = {
    AZURE_SCRIPT = "az storage blob upload-batch -s 'build' --destination '$web' --account-name $AZURE_STORAGE_ACCOUNT_NAME"
  }
   needs = ["Azure Login"]
   secrets = ["AZURE_STORAGE_ACCOUNT_NAME"]
}
