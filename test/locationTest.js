let mongoose = require('mongoose');
let Rank = require('../api/models/rankModel');

    mongoose.Promise = global.Promise,
    mongoose.connect('mongodb://localhost/after-robot');

    chai = require('chai'),
    chaiHttp = require('chai-http'),
    server = require('../index'),
    should = chai.should();


    chai.use(chaiHttp);

    describe('Rank',()=>{
        
        beforeEach((done) => {
            Rank.remove({}, (err) =>{
                done();
            });
        });

        describe('/POST rank', () => {
            it('it should POST a rank', (done) =>{
                let rank = {
                        name: "Johannesburg MTN Taxi Rank",
                        location: {
                            lat:0.0,
                            lng:0.0
                        }
                }
                chai.request(server)
                    .post('/rank')
                    .send(rank)
                    .end((err,res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('_id');
                        res.body.should.have.property('name').eql(rank.name);
                        res.body.should.have.property('location');
                        done();
                    });
            });
            it('it should fail to POST rank without name',(done) =>{
                let rank ={ 
                    location:{
                        lat: 0.0,
                        lng: 0.0
                    }
                }
                chai.request(server)
                    .post('/rank')
                    .send(rank)
                    .end((err,res) => {
                        res.should.have.status(200);
                        res.should.be.a('object');
                        res.body.should.have.property('errors');
                        res.body.errors.should.have.property('name');
                        res.body.errors.name.should.have.property('message').eql('Path `name` is required.');
                        done();
                    });
            });
        }); // /POST rank

        describe('/GET/:id rank', () => {
            it('it should GET a rank', (done) => {
                let rank = new Rank({name:"Johanesburg MTN Rank", location:{lat:0.0,lng:-0.0}});

                rank.save((err, rank) =>{
                    chai.request(server)
                    .get('/rank/'+ rank.id)
                    .end((err, res) => {

                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('_id').eql(rank.id);
                        res.body.should.have.property('location');
                        done();
                    });
                });
            });
        }); // /GET:id rank

        describe('/PUT/:id rank', () =>{
            it('it should PUT a rank', (done) =>{
                let rank = new Rank({name:"Johanesburg MTN Rank", location:{lat:0.0, lng:-0.0}});

                rank.save((err,rank) => {
                    chai.request(server)
                    .put('/rank/' + rank.id)
                    .send({name:"Johanesburg MTN Noord Taxi Rank", location:{lat:1.0,lng:1.0}})
                    .end((err,res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('_id').eql(rank.id);
                        res.body.should.have.property('name').eql('Johanesburg MTN Noord Taxi Rank');
                        res.body.should.have.property('location').eql({lat:1.0,lng:1.0});
                        done();
                    });
                });
            });
        });
        
    });