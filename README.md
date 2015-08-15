# password-strength
password strength checker

# Install
> use bower

```bash
bower install password-strength --save
```

> [Download source](https://raw.githubusercontent.com/wahaha2012/password-strength/master/bundle.js)

# Usage
> global

```html
<script src="./bundle.js"></script>
```

> amd or cmd

```js
var PasswordStrength = require('password-strength/bundle');
```

# Demo
> minimum config, auto find password field

```js
new PasswordStrength();
```


> add password field manually

```js
var Demo = new PasswordStrength({
    autoFindInputs: false
});
var inputs = document.querySelectorAll('input[type=password]');

Demo.addInputs(inputs[0]);
```


> custom strength tag text and strength result info

```js
var Demo = new PasswordStrength({
    autoFindInputs: false,
    tagText:'Strength',
    strengthTexts:['Empty','Bad','Weak','Middle','Good','Strong']
});
var inputs = document.querySelectorAll('input[type=password]');

Demo.addInputs(inputs[0]);
```

# API
```js
new PasswordStrength(config) 
config : {
    /*base config and default values*/
    //strength info background
    background: {
        'weaker': '#f22a26',
        'weak': '#ff880a',
        'normal': '#b2a30a',
        'strong': '#99b20a',
        'stronger': '#58a80a'
    },
    checkLength: 6, //password minimum length required
    strengthTexts:['空','差','弱','中','好','强'], //strength grade info
    tagText: '密码强度', //strength tag text
    autoFindInputs: true, //auto find all password inputs
    zIndex: 10000 //set css z-index for strength tips
}

/* methods */
/**
 * add password input fields
 * @param  {DomElement} inputs  password input dom elements
 * @return {Null}           void
 */
.addInputs(inputs);

/**
 * update field strength status
 * @param  {DomElement} domElement  password input dom element
 * @return {Null}           void
 */
.updateStrength(domElement);

/**
 * show field strength status
 * @param  {DomElement} domElement  password input dom element
 * @return {Null}           void
 */
.showStrength(domElement);

/**
 * hidden field strength status
 * @return {Null}           void
 */
.hideStrength();

/**
 * check field strength
 * @param  {DomElement}[optional] domElements  password input dom elements, if not provide, check all inputs added to instance.
 * @return {Boolean}           verify pass or not
 */
.verify([domElements]);

/**
 * check password strength
 * @param  {String} password  string password need check
 * @param  {Integer} minLength  minimum password length required
 * @return {Object}  {strength: Integer[1-5], text: String['weak'...]}
 */
.checkStrength(password, minLength);
```
