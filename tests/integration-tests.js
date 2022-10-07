const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

chai.should();
chai.use(chaiHttp);

describe('Boilerplate CRUD API - Integration tests', () => {
    
    describe("GET /post/all-posts", () => {
        it("It should GET all the posts", (done) => {
            chai.request(app)
                .get("/post/all-posts")
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                    response.body[0].should.be.a('object');
                    response.body[0].should.have.property('title');
                    response.body[0].should.have.property('body');
                    response.body[0].should.have.property('slug');
                done();
            });
        });
    });
    
    describe("POST /post/create-post", () => {
        it("It should POST a new post", (done) => {
            const post = {
                title: "New title",
                body: "This is a new body"
            };
            chai.request(app)                
                .post("/post/create-post")
                .send(post)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object')
                done();
            });
        });
    });

     
    describe("PUT /post/edit-post/:slug", () => {
        it("It should PUT an existing story", (done) => {

            const postSlug = "c1131425dd1549ffc28c9dc9"; 
            const story = {
                title: "Post 1 changed",
                body: "This is post 1 content"
            };
            chai.request(app)                
                .put("/post/edit-post/" + postSlug)
                .send(story)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');               
                done();
            });
        }); 

        it("It should NOT UPDATE a story that is not in the database", (done) => {

            const postSlug = "123456789"; 
            const story = {
                title: "Post 1 changed",
                body: "This is post 1 content"
            };
            chai.request(app)                
                .put("/post/edit-post/" + postSlug)
                .send(story)
                .end((err, response) => {
                    response.should.have.status(409);
                done();
            });
        });       
    });


    describe("DELETE /post/delete/:slug", () => {
        it("It should DELETE an existing post", (done) => {
            const storyId = "c1131425dd1549ffc28c9dc9"; 
            chai.request(app)                
                .delete("/post/delete-post/" + storyId)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                 
                done();
            });
        });

        it("It should NOT DELETE a story that is not in the database", (done) => {
            const storyId = "1234567"; 
            chai.request(app)                
                .delete("/post/delete-post/" + storyId)
                .end((err, response) => {
                    response.should.have.status(409);
                done();
            });
        });
    });
});