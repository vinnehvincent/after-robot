process.env.NODE_ENV = 'test';

let User = require("../api/models/userModel");

const server = require('../index');

let chai = require('chai'),
    should = chai.should();
let chaiHttp = require('chai-http');
    chai.use(chaiHttp);

describe('User Tests',()=>{

    afterEach((done)=>{
        User.remove({}, (err)=>{
            done();
        });
    });
    
    describe("/POST user", ()=>{
        it('it should POST a user',(done)=>{
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
    describe("/GET users", ()=>{
        it('it should GET all users', (done)=>{
            let user = new User({
                email:"test@example.com",
                password:"Pwsrd001"
            });
            user.save((err, user_)=>{
                chai.request(server)
                .get('/user')
                .end((err,res)=>{
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.should.have.lengthOf(1);
                    res.body[0].should.have.property('_id');
                    done();
                });
            });
            
        });
    });
    describe("/GET/:id user",()=>{
        it('it should GET user by id', (done)=>{
            let user = new User({
                email:"test@example.com",
                password:"Pwsrd001"
            });
            user.save((err,user)=>{
                chai.request(server)
                    .get('/user/'+user.id)
                    .end((err,res)=>{
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('_id').eql(user.id);
                        done();
                    });
            });
        });
    });
    describe("/PUT/:id user", () =>{
        it('should PUT a user', (done)=>{
            let user = new User({
                email:"test@example.com",
                password:"Pwsrd001"
            });
            let newUser = {email:'puttest@exmaple.com',password:"Pswrd002"};
            user.save((err,user)=>{
                chai.request(server)
                    .put('/user/'+user.id)
                    .send(newUser)
                    .end((err,res)=>{
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('_id').eql(user.id);
                        res.body.should.have.property('email').eql(newUser.email);
                        res.body.should.have.property('password').eql(newUser.password);
                        done();
                    });
            });
        });  

    })
});
