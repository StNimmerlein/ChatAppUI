#!/bin/bash

userPool=$1
client=$2
newUrl=$3

#echo "URL=$newUrl"
currentClientSettings=$(aws cognito-idp describe-user-pool-client --user-pool-id $userPool --client-id $client | jq -c '.UserPoolClient')
clientName=$(echo $currentClientSettings | jq -c -r '.ClientName')
supportedIdentityProviders=$(echo $currentClientSettings | jq -c '.SupportedIdentityProviders')
callbackURLs=$(echo $currentClientSettings | jq -c '.CallbackURLs')
logoutUrls=$(echo $currentClientSettings | jq -c '.LogoutURLs')
oauthFlows=$(echo $currentClientSettings | jq -c '.AllowedOAuthFlows')
oauthScopes=$(echo $currentClientSettings | jq -c '.AllowedOAuthScopes')
oauthFlowUserPoolClient=$(echo $currentClientSettings | jq -c '.AllowedOAuthFlowsUserPoolClient')
#echo "Data: clientName=$clientName, SIP=$supportedIdentityProviders, CU=$callbackURLs, LU=$logoutUrls, flow=$oauthFlows, scopes=$oauthScopes, oauth=$oauthFlowUserPoolClient"

aws cognito-idp update-user-pool-client --user-pool-id $userPool --client-id $client --client-name $clientName --supported-identity-providers $supportedIdentityProviders --callback-urls "[\"$newUrl\"]" --logout-urls "[\"$newUrl\"]" --allowed-o-auth-flows $oauthFlows --allowed-o-auth-scopes $oauthScopes --allowed-o-auth-flows-user-pool-client