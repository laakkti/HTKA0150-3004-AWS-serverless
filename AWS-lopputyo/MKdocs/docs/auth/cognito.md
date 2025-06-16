
## Cognito
Amazon Cognito is an identity platform for web and mobile apps. It’s a user directory, an authentication server, and an authorization service for OAuth 2.0 access tokens and AWS credentials.

<a href="https://docs.aws.amazon.com/cognito/latest/developerguide/what-is-amazon-cognito" target="_blank">https://docs.aws.amazon.com/cognito/latest/developerguide/what-is-amazon-cognito</a>


In addition for cognito signup and login lambda-funtions the following definitions to serverless.yml is needed.


```
provider:
  name: aws
  runtime: nodejs18.x
  region: eu-north-1
  environment:
    user_pool_id: { Ref: UserPool }
    client_id: { Ref: UserClient }

  iam:
    role:
      statements:
        - Effect: Allow
          Action:
            - cognito-idp:AdminCreateUser
            - cognito-idp:AdminSetUserPassword
            - cognito-idp:AdminInitiateAuth
          Resource: "*"

resources:
  Resources:
    UserPool:
      Type: AWS::Cognito::UserPool
      Properties:
        UserPoolName: serverless-auth-pool
        Schema:
          - Name: email
            Required: true
            Mutable: true
          - Name: name
            AttributeDataType: String
            Mutable: true
            Required: false
        Policies:
          PasswordPolicy:
            MinimumLength: 6
        AutoVerifiedAttributes: ["email"]

    UserClient:
      Type: AWS::Cognito::UserPoolClient
      Properties:
        ClientName: user-pool-ui
        GenerateSecret: false
        UserPoolId: { Ref: UserPool }
        AccessTokenValidity: 5
        IdTokenValidity: 5
        ExplicitAuthFlows:
          - "ADMIN_NO_SRP_AUTH"
```