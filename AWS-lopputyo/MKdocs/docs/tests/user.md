## signup


```
requests/
└── user/
    └── post_signup.rest
```

#### serverless.yml

`functions:`
```
  signupUser:
    handler: user/signup.handler
    events:
      - httpApi:
          path: /user/signup
          method: post
``


```
POST https://vr6mgijfvf.execute-api.eu-north-1.amazonaws.com/user/signup
Content-Type: application/json

{
  "email": "AA4598@student.jamk.fi",
  "password": "topsecret",
  "name": "Timo Laakkonen"  
}
```
**On success**
<img src="../../img2/signup_test.png" alt="image 1" width="800" style="display: block; margin: 0;"/>

```Amazon Cognito > User pools > serverless-auth-pool > Users```
<img src="../../img2/users.png" alt="image 1" width="800" style="display: block; margin: 0;"/>

**On failure**
<img src="../../img2/signup_test_error.png" alt="image 1" width="800" style="display: block; margin: 0;"/>


```
sls logs -f signupUser
```

<img src="../../img2/signup_logs.png" alt="image 1" width="800" style="display: block; margin: 0;"/>

## login

```
requests/
└── user/
    └── post_login.rest
```

#### serverless.yml

`functions:`
```
  loginUser:
    handler: user/login.handler
    events:
      - httpApi:
          path: /user/login
          method: post
``


```
POST https://vr6mgijfvf.execute-api.eu-north-1.amazonaws.com/user/login
Content-Type: application/json

{
  "email": "AA4598@student.jamk.fi",
  "password": "topsecret"
}
```
**On success**
<img src="../../img2/login_test.png" alt="image 1" width="800" style="display: block; margin: 0;"/>

**On failure**
<img src="../../img2/login_test_error.png" alt="image 1" width="800" style="display: block; margin: 0;"/>
