const expect = require("chai").expect;
chai = require("chai");
const server = require("../index");
const chaiHttp = require("chai-http");

chai.use(chaiHttp);

describe("test_api", () => {
  it("get should be ok", () => {
    chai
      .request(server)
      .get("/")
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
      });
  });

  it("post should be ok", () => {
    chai
      .request(server)
      .post("/")
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
      });
  });

  it("put should be ok", () => {
    chai
      .request(server)
      .put("/")
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
      });
  });

  it("delete should be ok", () => {
    chai
      .request(server)
      .delete("/")
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
      });
  });
});
