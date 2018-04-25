process.env.NODE_ENV = 'test';

let User = require("../api/models/userModel");

const server = require('../index');

let chai = require('chai'),
    should = chai.should();
let chaiHttp = require('chai-http');
    chai.use(chaiHttp);

describe('User',()=>{
    describe("/POST rank", ()=>{
        it.skip('it should post a user',(done)=>{

        });
    });
});

