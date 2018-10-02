import email from '../src/email';

describe('Form Validation: email', () => {
    describe('settings', () => {
        it ('should have default message', () => {
            const expectedVal = 'Please enter a valid email address.';
            const emailInst = email();
            const settings = emailInst.settings;
            
            expect(settings).toBeDefined();
            expect(settings).toHaveProperty('message');
            expect(settings.message).toEqual(expectedVal);
        });

        it('should have default messageAttr', () => {
            const expectedVal = 'data-validation-email-message';
            const emailInst = email();
            const settings = emailInst.settings;
            
            expect(settings).toBeDefined();
            expect(settings).toHaveProperty('messageAttr');
            expect(settings.messageAttr).toEqual(expectedVal);
        });

        it('should have default events', () => {
            const emailInst = email();
            const settings = emailInst.settings;
            
            expect(settings).toBeDefined();
            expect(settings).toHaveProperty('events');
            expect(settings.events).toHaveLength(2);
            expect(settings.events).toContain('focusout');
            expect(settings.events).toContain('submit');
        });

        it('should have default pattern', () => {
            const emailInst = email();
            const settings = emailInst.settings;
            
            expect(settings).toBeDefined();
            expect(settings).toHaveProperty('pattern');
        })

        it('should overwrite defaults, if values passed in', () => {
            const newSettings = {
                message: "That's not an email address!",
                pattern: /[a-zA-Z0-1]/
            };
            const expectedVal = {
                message: "That's not an email address!",
                messageAttr: 'data-validation-email-message',
                pattern: /[a-zA-Z0-1]/,
                events: [
                    'focusout',
                    'submit'
                ]
            };

            const emailInst = email(newSettings);
            expect(emailInst.settings).toEqual(expectedVal);
        });
    });    

    describe('isRelevant', () => {
        it('should return true if some input has type email', () => {
            const mockField = {
                inputEls: [
                    {
                        getAttribute: () => null
                    },
                    {
                        getAttribute: () => null
                    },
                    {
                        getAttribute: () => 'email'
                    }
                ]
            }
            const emailInst = email();
            expect(emailInst.isRelevant(mockField)).toEqual(true);
        });

        it('should return false if no inputs have type email', () => {
            const mockField = {
                inputEls: [
                    {
                        getAttribute: () => null
                    },
                    {
                        getAttribute: () => null
                    },
                    {
                        getAttribute: () => null
                    }
                ]
            }
            const emailInst = email();
            expect(emailInst.isRelevant(mockField)).toEqual(false);
        });
    });

    describe('postprocessMessage', () => {
        it('should call postprocessMessage if defined and is function', () => {
            const settings = {
                postprocessMessage: jest.fn(msg => 'The message made it.')
            };
            const mockMessage = 'I am a mock message.';
            const emailInst = email(settings);
            const retVal = emailInst.postprocessMessage(mockMessage);

            expect(settings.postprocessMessage).toHaveBeenCalled();
            expect(settings.postprocessMessage).toHaveBeenCalledWith(mockMessage);
            expect(retVal).toEqual('The message made it.');
        });

        it('should return msg if not function', () => {
            const settings = {
                postprocessMessage: 'I am not a function'
            };
            const mockMessage = 'I am a mock message.';
            const emailInst = email(settings);
            const retVal = emailInst.postprocessMessage(mockMessage);

            expect(retVal).toEqual(mockMessage);
        });

        it('should return msg if no postprocessMessage', () => {
            const mockMessage = 'I am a mock message.';
            const emailInst = email();
            const retVal = emailInst.postprocessMessage(mockMessage);

            expect(retVal).toEqual(mockMessage);
        });
    });

    describe('validate', () => {
        it('should reject if no inputs', async () => {
            const mockField = {};
            const emailInst = email();
            await expect(emailInst.validate(mockField)).rejects.toEqual('email: No inputs set.');
        });

        it('should return true if input has no value', async () => {
            const mockField = {
                inputEls: [
                    {
                        value: ''
                    }
                ]
            };
            const expectedResponse = {valid: true};
            const emailInst = email();
            await expect(emailInst.validate(mockField)).resolves.toEqual(expectedResponse);
        });

        it('should return true if input passes regex', async () => {
            const mockField = {
                inputEls: [
                    {
                        value: 'anna@test.com'
                    }
                ]
            };
            const expectedResponse = {valid: true};
            const emailInst = email();
            await expect(emailInst.validate(mockField)).resolves.toEqual(expectedResponse);
        });

        it('should return false if input val does not pass regex', async () => {
            const mockField = {
                inputEls: [
                    {
                        value: '1234.test'
                    }
                ]
            };
            const expectedResponse = {valid: false};
            const emailInst = email();
            await expect(emailInst.validate(mockField)).resolves.toEqual(expectedResponse);
        });

    });
})