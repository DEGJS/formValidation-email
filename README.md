# formValidation-email
[![Build Status](https://travis-ci.com/DEGJS/formValidation-email.svg?branch=master)](https://travis-ci.com/DEGJS/formValidation-email)

An email rule module for the DEGJS [formValidation](https://github.com/DEGJS/formValidation) module.


## Install
formValidation-email is an ES6 module. Consequently, you'll need an ES6 transpiler ([Babel](https://babeljs.io) is a nice one) as part of your Javascript workflow.

If you're already using NPM for your project, you can install formValidation-email with the following command:

```
$ npm install @degjs/form-validation-email
```

Installing formValidation rule modules via JSPM will automatically install the base formValidation module.


## Usage
After importing, formValidation rule modules can be instantiated by passing an array of names into a formValidation options object:

```js
import formValidation from "@degjs/form-validation";

/* Import the Pattern rule module */
import email from "@degjs/form-validation-email";

let validationOptions = {
    rules: [
        email
    ]
};

/* Instantiate the formValidation module on an element */
let formElement = document.querySelector('.form');
let validationInst = formValidation(formElement, validationOptions);
```

Optionally, default rule settings can be overridden by instantiating the rule as a function and passing options as an object: 
```js
let validationOptions = {
    rules: [
        email({
            message: 'This message will override the default rule message.',
            events: [
                'focusout',
                'submit'
            ]
        })
    ]
};
```

formValidation-email builds upon the HTML5 `email` validation pattern. Therefore, after instantiating the rule module, a field in the validation instance will be tested by this rule simply by setting the field input's type attribute to `email`.

This rule module contains its own default validation message. However, this message can be overridden by adding a data attribute at the field or form level (in that order of importance).

Sample Markup:
```html
<form class="form" data-validation-email-message="This message will override the default rule message.">
    <fieldset>
        <div class="js-validation-field" data-validation-email-message="This message will override both the default rule message and the form element message.">
            <label for="email">Email</label>
            <input type="email" id="email" name="email">
        </div>
        <button type="submit">Submit</button>
    </fieldset>
</form>
```


## Options

#### options.message
Type: `String`  
Default: `Please enter a valid email address.`  
The default message displayed when a field fails this rule's validation test.

#### options.messageAttr
Type: `String`  
Default: `data-validation-pattern-message`  
The data attribute formValidation will check when determining [message hierarchy](https://github.com/DEGJS/formValidation#configuring-error-messages)

#### options.events
Type: `Array`  
Default: `['focusout','submit']`  
An array of DOM events that will cause the rule to run validation on a field (or the entire form, when using `submit`). NOTE: `focusout` should be used in place of `blur` due to event bubbling limitations.

#### options.pattern
Type: `RegEx literal`  
Default: ``/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$``  
The RegEx pattern the rule will use to determine a valid email address.

For more detailed usage instructions, see the [formValidation Usage](https://github.com/DEGJS/formValidation#usage) documentation.
