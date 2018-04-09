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
        // after((done)=>{
        //     Rank.remove({}, (err) =>{
        //         done();
        //     });
        // });

        describe.only('/POST rank', () => {
            it('it should POST a rank', (done) =>{
                let rank = {
                        name: "Johannesburg MTN Taxi Rank",
                        location:[0.0,0.0],
                        loc:{
                            type:'Point',
                            coordinates:[0.0,0.0]
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
                        console.log(res.body.name);
                        res.body.should.have.property('location');
                        res.body.should.have.property('loc');
                        done();
                    });
            });
            it('it should fail to POST rank without name',(done) =>{
                let rank ={ 
                    location:[0.0,0.0]
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
            it('should fail to POST rank without location',(done)=>{
                let rank = {
                    name: "Johannesburg MTN Taxi Rank"
                }
                chai.request(server)
                .post("/rank")
                .send(rank)
                .end((err,res)=> {
                    res.should.have.status(200);
                    res.should.be.a('object');
                    res.body.should.have.property('errors');
                    res.body.errors.should.have.property('location');
                    res.body.errors.location.should.have.property('message').eql('Path `location` is required.');
                    done();
                })
            });
        }); // /POST rank
        describe('/GET rank',() => {
            it('it should GET ranks', () =>{
                let rank = new Rank({name:"Johanesburg MTN Rank", location:[0.0,0.0]});
                rank.save((err, rank)=>{
                    chai.request(server)
                    .get('/rank')
                    .end((err,res)=>{
                        res.should.have.status(200);
                        res.body.should.be.a('array');
                        res.body[0].should.have.property('name').eql(rank.name);
                        res.body[0].should.have.property('location').eql(rank.location);
                    });
                });
            });
        });
        describe('/GET/:id rank', () => {
            it('it should GET a rank given id', (done) => {
                let rank = new Rank({name:"Johanesburg MTN Rank", location:[0.0,0.0]});

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
        }); // /GET rank

        describe('/PUT/:id rank', () =>{
            it('it should PUT a rank', (done) =>{
                let rank = new Rank({name:"Johanesburg MTN Rank", location:[0.0,-0.0]});
                let updatedRank = {name:"Johanesburg MTN Noord Taxi Rank", location:[1.0,1.0]};

                rank.save((err,rank) => {
                    chai.request(server)
                    .put('/rank/' + rank.id)
                    .send(updatedRank)
                    .end((err,res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('_id').eql(rank.id);
                        res.body.should.have.property('name').eql(updatedRank.name);
                        res.body.should.have.property('location').eql(updatedRank.location);
                        done();
                    });
                });
            });
        });
        describe('/GET with queries', () =>{
            it('should GET 5 nearest ranks', (done) => {
                let rank = new Rank({name:"Johanesburg MTN Rank", location:[0.0,0.0]});
                
                rank.save((err,rank)=>{
                    chai.request(server)
                    .get('/rank/search?lat=0.0&lng=0.0')
                    .end((err,res) =>{
                        res.should.have.status(200);
                        res.body.should.be.a('array');
                        res.body[0].should.have.property('name').eql(rank.name);
                        res.body[0].should.have.property('location').eql(rank.location);
                        done();
                    })
                });
            });
        })
    });