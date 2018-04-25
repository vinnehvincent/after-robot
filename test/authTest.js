process.env.NODE_ENV = 'test';

let server = require('../index');

let chai = require('chai'),
    should = chai.should();
let chaiHttp = require('chai-http')

chai.use(chaiHttp);

describe("Auth", ()=>{
    describe("/POST login", ()=>{
        it.skip('it should login a user', (done)=>{

        });
    });
});