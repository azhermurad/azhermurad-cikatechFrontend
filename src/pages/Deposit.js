import axios from "axios";
import { useEffect, useState } from "react";

const Deposit = () => {
  const [deposit, setDeposit] = useState("");
  const [depositNumber, setDepostNumber] = useState(0);
  useEffect(() => {
    (async function () {
      const deposits = await axios.get("http://localhost:4000/api/deposit");
      setDeposit(deposits.data);
      const a = deposits.data.filter((item) => item.action === "inActive");
      setDepostNumber(a.length);
    })();
  }, []);

  const deleteDeposit = async (id) => {
    const deleteDeposit = await axios.delete(
      "http://localhost:4000/api/deposit/" + id
    );
    const deletedPost = deposit.filter(
      (pos) => pos._id !== deleteDeposit.data._id
    );
    setDeposit(deletedPost);
    const a = deletedPost.filter((item) => item.action === "inActive");
    setDepostNumber(a.length);
  };
  const approvedDeposit = async (action, id) => {
    try {
      const updateDeposit = await axios.put(
        "http://localhost:4000/api/deposit/" + id,
        { action: action }
      );
      const updateUI = deposit.map((pos) => {
          if (pos._id === updateDeposit.data._id){
              return {
                  ...updateDeposit.data
              }
          }
          return pos;
      });
      setDeposit(updateUI);
      const a = updateUI.filter((item) => item.action === "inActive");
      setDepostNumber(a.length);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section id="hero" className="d-flex">
      <div className="container">
        <div style={{ width: "100%" }}>
          <div className="mb-2">
            <span className="font-weight-bold">Deposit : </span>
            <input
              type="text"
              onChange={() => {}}
              value={depositNumber}
              size="1"
              className="text-center bg-success text-white"
              disabled=""
            />
          </div>
          {deposit
            ? deposit.map((item, index) => {
                if (item.action === "inActive") {
                  return (
                    <div
                      key={index}
                      className="alert alert-success"
                      role="alert"
                    >
                      <div className="row">
                        <div className="col-md-4">2022-05-30 16:21:02</div>
                        <div className="col-md-4 text-center">
                          Deposit dari : {item.rekeningAsal}
                        </div>
                        <div className="col-md-4 text-right">
                          Jumlah :{item.jumlah}
                        </div>
                      </div>
                    </div>
                  );
                }
                return "";
              })
            : ""}

          <div className="card">
            <div className="card-body">
              <div className="row mb-2">
                <div className="col-md-4" style={{ background: "#f5ff36" }}>
                  <p
                    style={{ position: "relative", top: "8px" }}
                    className="text-center"
                  >
                    Deposit in progress
                  </p>
                </div>
              </div>
              <table className="table table-bordered ">
                <thead>
                  <tr className="text-center">
                    <th>No</th>
                    <th>Rekening Tujuan</th>
                    <th>Rekening Asal</th>
                    <th>Jumlah</th>
                    <th>Catatan: Nomor Rekord / Referensi</th>
                    <th>action</th>
                  </tr>
                </thead>
                <tbody>
                  {deposit ? (
                    deposit.map((item, index) => {
                      if (item.action === "inActive") {
                        return (
                          <tr key={index} className="text-center">
                            <td>{index}</td>
                            <td>{item.rekeningTujuan}</td>
                            <td>{item.rekeningAsal}</td>
                            <td>{item.jumlah}</td>
                            <td>{item.catatan}</td>
                            <td>
                              <button
                                title="approve deposit"
                                onClick={() => {
                                  approvedDeposit("Active", item._id);
                                }}
                                className="btn btn-info btn-sm"
                              >
                                <i className="fas fa-check"></i>
                              </button>
                              <button
                                className="btn btn-danger btn-sm"
                                onClick={() => {
                                  deleteDeposit(item._id);
                                }}
                              >
                                <i className="fas fa-trash"></i>
                              </button>
                            </td>
                          </tr>
                        );
                      }
                      return "";
                    })
                  ) : (
                    <tr>
                      <td colSpan="5">
                        <h5 className="text-center font-weight-bold text-primary">
                          No Deposit found
                        </h5>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className="card mt-5">
            <div className="card-body">
              <div className="row mb-2">
                <div className="col-md-4" style={{ background: "#8deab3" }}>
                  <p
                    style={{ position: "relative", top: "8px" }}
                    className="text-center"
                  >
                    Deposit Approved
                  </p>
                </div>
              </div>
              <table className="table table-bordered ">
                <thead>
                  <tr className="text-center">
                    <th>No</th>
                    <th>Rekening Tujuan</th>
                    <th>Rekening Asal</th>
                    <th>Jumlah</th>
                    <th>Catatan: Nomor Rekord / Referensi</th>
                    <th>action</th>
                  </tr>
                </thead>
                <tbody>
                  {deposit &&
                  deposit.filter((item) => item.action === "Active").length >
                    0 ? (
                    deposit.map((item, index) => {
                      if (item.action === "Active") {
                        return (
                          <tr key={index} className="text-center">
                            <td>{index}</td>
                            <td>{item.rekeningTujuan}</td>
                            <td>{item.rekeningAsal}</td>
                            <td>{item.jumlah}</td>
                            <td>{item.catatan}</td>
                            <td>
                              <button
                                title="approve deposit"
                                onClick={() => {
                                  approvedDeposit("inActive", item._id);
                                }}
                                className="btn btn-info btn-sm"
                              >
                                <i className="fas fa-redo-alt"></i>
                              </button>
                              <button
                                className="btn btn-danger btn-sm"
                                onClick={() => {
                                  deleteDeposit(item._id);
                                }}
                              >
                                <i className="fas fa-trash"></i>
                              </button>
                            </td>
                          </tr>
                        );
                      }
                      return "";
                    })
                  ) : (
                    <tr>
                      <td colSpan="5">
                        <h5 className="text-center font-weight-bold text-primary">
                          No Deposit found
                        </h5>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Deposit;
