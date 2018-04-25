process.env.NODE_ENV = 'test';

let User = require("../api/models/userModel");

const server = require('../index');

let chai = require('chai'),
    should = chai.should();
let chaiHttp = require('chai-http');
    chai.use(chaiHttp);

describe('User',()=>{

    afterEach((done)=>{
        User.remove({}, (err)=>{
            done();
        });
    });
    
    describe("/POST rank", ()=>{
        it('it should post a user',(done)=>{
            let user = {
                email:"test@example.com",
                password:"Pwsrd001"
            }
            chai.request(server)
                .post('/user')
                .send(user)
                .end((err,res)=>{
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('_id');
                    res.body.should.have.property('email').eql(user.email);
                    done();
                })
            
        });
    });
    
});
