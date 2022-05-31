import axios from "axios";
import { useRef, useState } from "react";

const FormDeposit = () => {
  const [success, setSuccess] = useState("");
  const rekeningTujuanRef = useRef();
  const rekeningAsalRef = useRef();
  const jumlahRef = useRef();
  const catatanRef = useRef();

  const formDepositHandler = async () => {
    try {
      const rekeningTujuan = rekeningTujuanRef.current.value;
      const rekeningAsal = rekeningAsalRef.current.value;
      const jumlah = jumlahRef.current.value;
      const catatan = catatanRef.current.value;
      if (!rekeningAsal || !rekeningTujuan || !jumlah || !catatan) {
        return;
      }
     await axios.post(
        "http://localhost:4000/api/deposit",
        {
          rekeningTujuan,
          rekeningAsal,
          jumlah,
          catatan,
        }
      );
      setSuccess("Form Deposit successfully");
      rekeningTujuanRef.current.value = "Pilih Rekening Tujuan";
      rekeningAsalRef.current.value = ''
      jumlahRef.current.value = ''
      catatanRef.current.value = ''
    } catch (error) {
      console.log("error", error.response.data.error);
    }
  };
  // const
  return (
    <section id="hero" className="d-flex">
      <div className="container">
        {success ? <div className="alert alert-success">{success}</div> : ""}
        <div className="card" style={{ width: "100%" }}>
          <div className="card-header">Form Deposit</div>
          <div className="card-body">
            <div className="form-group">
              <label>Rekening Tujuan:</label>
              <select className="form-control" ref={rekeningTujuanRef}>
                <option value="Pilih Rekening Tujuan">
                  Pilih Rekening Tujuan
                </option>
                <option value="BCA 1234 tes">BCA 1234 tes</option>
                <option value="BCA 09876 tes 2">BCA 09876 tes 2</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="Rekening Asal">Rekening Asal</label>
              <input
                ref={rekeningAsalRef}
                name="Rekening Asal"
                type="text"
                className="form-control "
                placeholder="Rekening Asal"
              />
            </div>
            <div className="form-group">
              <label>Jumlah</label>
              <input
                ref={jumlahRef}
                type="number"
                className="form-control"
                placeholder="Jumlah"
              />
            </div>
            <div className="form-group">
              <label>Catatan: No Rekord / Referensi</label>
              <input
                ref={catatanRef}
                type="text"
                className="form-control"
                placeholder="Catatan"
              />
            </div>
            <button
              onClick={formDepositHandler}
              className="btn btn-success"
              style={{ width: "100%", marginTop: "10px" }}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FormDeposit;
