process.env.NODE_ENV = 'test';

let Rank = require('../api/models/rankModel');

let chai = require('chai'),
    chaiHttp = require('chai-http'),
    server = require('../index'),
    should = chai.should();
    

chai.use(chaiHttp);

describe('Rank Tests', () => {
    beforeEach((done) => {
        Rank.remove({}, (err) => {
            done();
        });
    });
    after((done)=>{
        Rank.remove({}, (err) =>{
            done();
        });
    });

    describe('/POST rank', () => {
        it('it should POST a rank', (done) => {
            let rank = {
                name: "Johannesburg MTN Taxi Rank",
                location: {
                    type: "Point",
                    coordinates: [0.0, 0.0]
                }
            }
            chai.request(server)
                .post('/rank')
                .send(rank)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('_id');
                    res.body.should.have.property('name').eql(rank.name);
                    res.body.should.have.property('location');
                    done();
                });
        });
        it('it should fail to POST rank without name', (done) => {
            let rank = {
                location: {
                    type: "Point",
                    coordinates: [0.0, 0.0]
                }
            }
            chai.request(server)
                .post('/rank')
                .send(rank)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.a('object');
                    res.body.should.have.property('errors');
                    res.body.errors.should.have.property('name');
                    res.body.errors.name.should.have.property('message').eql('Path `name` is required.');
                    done();
                });
        });
        it.skip('it should fail to POST rank without location', (done) => {
            let rank = {
                name: "Johannesburg MTN Taxi Rank"
            }
            chai.request(server)
                .post("/rank")
                .send(rank)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.a('object');
                    res.body.should.have.property('errors');
                    res.body.errors.should.have.property('location');
                    res.body.errors.location.should.have.property('message').eql('Path `location` is required.');
                    done();
                })
        });
    }); // /POST rank
    describe('/GET rank', () => {
        it('it should GET ranks', (done) => {
            let rank = new Rank({ name: "Johanesburg MTN Rank", location: {type:"Point", coordinates:[0.0, 0.0]} });
            rank.save((err, rank) => {
                chai.request(server)
                    .get('/rank')
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('array');
                        res.body[0].should.have.property('name').eql(rank.name);
                        res.body[0].should.have.property('location');
                        done();
                    });
            });
        });
    });
    describe('/GET/:id rank', () => {
        it('it should GET a rank given id', (done) => {
            let rank = new Rank({ name: "Johanesburg MTN Rank", location:{type:"Point",coordinates: [0.0, 0.0]} });

            rank.save((err, rank_) => {
                chai.request(server)
                    .get('/rank/' + rank_.id)
                    .end((err, res) => {

                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('_id').eql(rank.id);
                        res.body.should.have.property('location');
                        done();
                    });
            });
        });
    }); // /GET rank

    describe('/PUT/:id rank', () => {
        it('it should PUT a rank', (done) => {
            let rank = new Rank({ name: "Johanesburg MTN Rank", location: {type:"Point",coordinates:[0.0, 0.0]} });
            let updatedRank = { name: "Johanesburg MTN Noord Taxi Rank", location: {type:"Point", coordinates:[1.0, -1.0]} };

            rank.save((err, rank) => {
                chai.request(server)
                    .put('/rank/' + rank.id)
                    .send(updatedRank)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('_id').eql(rank.id);
                        res.body.should.have.property('name').eql(updatedRank.name);
                        res.body.should.have.property('location');
                        res.body.location.should.have.property('coordinates').eql(updatedRank.location.coordinates);
                        done();
                    });
            });
        });
    }); //PUT rank
    describe('/GET search ranks', () => {
        it('it should GET 5 nearest ranks', (done) => {
            let rank = new Rank({ name: "Johanesburg MTN Rank", location: {type:"Point", coordinates:[0.0,0.0]} });
           

            rank.save((err, rank) => {
                chai.request(server)
                    .get('/rank/search?lat=0.0&lng=0.0')
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('array');
                        res.body.should.have.lengthOf(1);
                        res.body[0].should.have.property('name').eql(rank.name);
                        res.body[0].should.have.property('location');
                        res.body[0].location.should.have.property('coordinates').eql(rank.location.coordinates);
                        done();
                    })
            });
        });

        it('it should not return a rank if more than a kilometre away',(done) =>{
            
            let rank = new Rank({ name: "Johanesburg MTN Rank", location: {type:"Point", coordinates:[0.009,0.0]} });
           

            rank.save((err, rank) => {
                chai.request(server)
                    .get('/rank/search?lat=0.0&lng=0.0')
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('array');
                        res.body.should.have.lengthOf(0);
                        done();
                    })
            });

        });
    })
});