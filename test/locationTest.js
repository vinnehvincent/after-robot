let mongoose = require('mongoose');
let Location = require('../api/models/locationModel');

    mongoose.Promise = global.Promise,
    mongoose.connect('mongodb://localhost/after-robot');

    chai = require('chai'),
    chaiHttp = require('chai-http'),
    server = require('../index'),
    should = chai.should();


    chai.use(chaiHttp);

    describe('Location',()=>{
        
        beforeEach((done) => {
            Location.remove({}, (err) =>{
                done();
            });
        });

        describe('/POST location', () => {
            it('it should POST a location', (done) =>{
                let location = {
                        name: "Johannesburg MTN Taxi Rank",
                        coOrdinates: {
                            lat:"0.0",
                            lng:"0.0"
                        }
                }
                chai.request(server)
                    .post('/location')
                    .send(location)
                    .end((err,res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('_id');
                        res.body.should.have.property('name').eql(location.name);
                        res.body.should.have.property('coOrdinates');
                        done();
                    });
            });
        }); // /POST location
    });