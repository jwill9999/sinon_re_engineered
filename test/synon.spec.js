
 var expect = require('chai').expect;
 var Synon = require('../synon');



// DECLARED VARIABLES
var spiedObj;
var spiedError;
var a, e, fn;

// CREATE EMPTY OBJ TO HOLD SPY OR STUB
let spyObj = {};

// IMPORT A FUNCTION TO SPY OR STUB  
a = function a(num) {
    return num + 1;
};

// STUBBED ERROR FUNC FOR TESTING
e = () => {
    throw new Error('OMG')
}

// STUBBED FUNC FOR TESTING
fn = function mock(num) {
    return num + 20
}



describe('Synon Re-Engineered Code Module', () => {


    describe('Non spied function', () => {
        beforeEach(function () {
            spyObj.a = a;
        })


        it('should say not a spy ', () => {
            expect(spyObj.a === a).to.be.true;
        });
    })

    describe('Spied function', () => {

        before(() => {
            spiedObj = Synon.spy(spyObj, 'a')

        })

        it('Not equal to original object', () => {
            expect(spiedObj !== a).to.be.true;
        });

        it('is a function', () => {
            expect(typeof spiedObj === 'function').to.be.true;
        });

        it('has a log', () => {
            expect(spiedObj.log.length === 0).to.be.true;
        });

        it('can call original function', () => {
            expect(spiedObj(1) === 2).to.be.true;
        });

        it('Log length should increase when called', () => {
            expect(spiedObj.log.length).to.equal(1);
        });

        it('Arguments are stored', () => {
            expect(spiedObj.log[0].arguments[0] === 1).to.be.true;
        });

        it('Context is stored ', () => {
            expect(spiedObj.log[0].context).to.exist;
        });

        it('returns stored value ', () => {
            expect(spiedObj.log[0].returns).to.equal(2);
        });
    })

    describe('After Restore function is invoked', () => {

        before(() => {
            spiedObj.restore();
        })

        it('spy reference restored to original function', () => {
            expect(spyObj.a === a).to.be.true;
        });

        it('spy now does not log after restore function invoked', () => {
            expect(spiedObj.log.length).to.equal(1);
        });
    });

    describe('If No Errors', () => {

        beforeEach(() => {
            spyObj.e = e;
            spiedError = Synon.spy(spyObj, 'e');
        })

        it('ERROR log will be empty ', () => {
            expect(spiedError.log[0]).to.be.undefined;
        });

        describe('If Errors', () => {

            beforeEach(() => {
                spiedError();
            })

            it('ERRORS will be logged', () => {
                expect(spiedError.log[0].error).not.to.be.undefined;
            });

        });

    });

    describe('Stubbing a function', () => {

        before(() => {
            Synon.stub(spyObj, 'a', fn);
        })

        it('returns the value of the Mocked function ', () => {
            expect(spyObj.a(1)).to.equal(21);
        });

        describe('On Restoring a stubbed function', () => {

            before(() => {
                spyObj.a.restore();
            })

            it('Mock function is restored to original function ', () => {
                expect(spyObj.a(1)).to.equal(2);
            });

        });
    });


})

