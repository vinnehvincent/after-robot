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
                            lat:0.0,
                            lng:0.0
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
            it('it should fail to POST location without name',(done) =>{
                let location ={ 
                    coOrdinates:{
                        lat: 0.0,
                        lng: 0.0
                    }
                }
                chai.request(server)
                    .post('/location')
                    .send(location)
                    .end((err,res) => {
                        res.should.have.status(200);
                        res.should.be.a('object');
                        res.body.should.have.property('errors');
                        res.body.errors.should.have.property('name');
                        res.body.errors.name.should.have.property('message').eql('Path `name` is required.');
                        done();
                    });
            });
        }); // /POST location

        describe('/GET/:id location', () => {
            it('it should GET a location', (done) => {
                let location = new Location({name:"Johanesburg MTN Rank", coOrdinates:{lat:0.0,lng:-0.0}});

                location.save((err, location) =>{
                    chai.request(server)
                    .get('/location/'+ location.id)
                    .end((err, res) => {

                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('_id').eql(location.id);
                        res.body.should.have.property('coOrdinates');
                        done();
                    });
                });
            });
        }); // /GET:id location

        describe('/PUT/:id location', () =>{
            it('it should PUT a location', (done) =>{
                let location = new Location({name:"Johanesburg MTN Rank", coOrdinates:{lat:0.0, lng:-0.0}});

                location.save((err,location) => {
                    chai.request(server)
                    .put('/location/' + location.id)
                    .send({name:"Johanesburg MTN Noord Taxi Rank", coOrdinates:{lat:1.0,lng:1.0}})
                    .end((err,res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('_id').eql(location.id);
                        res.body.should.have.property('name').eql('Johanesburg MTN Noord Taxi Rank');
                        res.body.should.have.property('coOrdinates').eql({lat:1.0,lng:1.0});
                        done();
                    });
                });
            });
        });
        
    });