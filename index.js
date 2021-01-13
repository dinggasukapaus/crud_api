const express = require("express");
const app =express();
const pool = require("./db");

app.use(express.json());

//routes

//!get
app.get("/shows",async(req,res)=>{
    try {
        // console.log(req.body);
        const showTB = await pool.query(
            "SELECT * FROM tb_user ORDER BY id ASC"
        );
        res.json(showTB.rows);
    } catch (err) {
        console.error(err.message);        
    }
});

//! get by id
app.get("/shows/:id",async(req,res)=>{
    const {id} = req.params;
    try {
        const showID = await pool.query("SELECT * FROM tb_user WHERE id = $1",[id])

        //respone
        res.json(showID.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
    // console.log(req.params);
}); 

//!create
app.post("/creates",async(req,res)=>{
    try {
        const { nama,username,password } = req.body;
        // console.log(req.body);
        const createTB = await pool.query(
            "INSERT INTO tb_user (nama ,username,password) VALUES ($1,$2,$3) RETURNING *",
            [nama,username,password]
        );
        res.json(createTB.rows[0]);
    } catch (err) {
        console.error(err.message);        
    }
});

//! update
app.put("/update/:id", async (req,res)=>{
    try {
        // digunakan untuk WHERE
        const {id} = req.params;
        // digunakan untuk SET
        const {nama,username,password} = req.body;

        //? query update
        const updateTB = await pool.query(
            "UPDATE tb_user SET nama =$1,username =$2,password = $3 WHERE id =$4",
            [nama,username,password,id]
        );
        const showTB = await pool.query(
            "SELECT * FROM tb_user ORDER BY id ASC"
        );
        
        // respone
        res.json("data user telah di update");

    } catch (err) {
        
    }
})


app.listen(3000,()=>{
    console.log("server berjalan di port:3000")
})