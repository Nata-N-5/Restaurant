const express = require("express");
const SqlService = require("../../services/sqlService");

const router = express.Router();


// ========== POST entry to table ==========

//ORDER

router.post('/post-order', async (req, res) => { 
  const {orderId, date, status, staff_staffId, table_tableId } = req.body;  
  if (!orderId|| !date || !status|| !staff_staffId|| !table_tableId) {
    return res.status(400).send("Missing fields."); 
  }

  const db = new SqlService();
  //const tableName = "test_table" 
  try { 
    await db.connectToDb(); 
    await db.query(
      'INSERT INTO `order` (orderId, date, status, staff_staffId, table_tableId) VALUES (?, ?, ?, ?, ?)', 
      [orderId, date, status, staff_staffId, table_tableId]
    );
    res.status(200).send("Entry created");
  } catch (err) { 
    console.error("SQL error:", err);
    res.status(500).send("Error creating entry.");
  } finally { 
    await db.closeConnection();
  }
});

//MENU

router.post('/post-menu', async (req, res) => { 
  const {dishId, name, amount, description } = req.body;  
  if (!dishId || !name || !amount|| !description) {
    return res.status(400).send("Missing fields."); 
  }

  const db = new SqlService();
  //const tableName = "test_table" 
  try { 
    await db.connectToDb(); 
    await db.query(
      `INSERT INTO menu (dishId, name, amount, description) VALUES (?, ?, ?, ?)`, 
      [dishId, name, amount, description]
    );
    res.status(200).send("Entry created");
  } catch (err) { 
    console.error("SQL error:", err);
    res.status(500).send("Error creating entry.");
  } finally { 
    await db.closeConnection();
  }
});

//STAFF

router.post('/post-staff', async (req, res) => { 
  const {staffId, name, active, position } = req.body;  
  if (!staffId || !name || !active|| !position) {
    return res.status(400).send("Missing fields."); 
  }

  const db = new SqlService();
  //const tableName = "test_table" 
  try { 
    await db.connectToDb(); 
    await db.query(
      `INSERT INTO staff (staffId, name, active, position) VALUES (?, ?, ?, ?)`, 
      [staffId, name, active, position]
    );
    res.status(200).send("Entry created");
  } catch (err) { 
    console.error("SQL error:", err);
    res.status(500).send("Error creating entry.");
  } finally { 
    await db.closeConnection();
  }
});

//TABLE

router.post('/post-table', async (req, res) => { 
  const {tableId, name, active } = req.body;  
  if (!tableId || !name || !active) {
    return res.status(400).send("Missing fields.");
  }

  const db = new SqlService();
  //const tableName = "test_table" 
  try { 
    await db.connectToDb(); 
    await db.query(
      'INSERT INTO `table` (tableId, name, active) VALUES (?, ?, ?)', 
      [tableId, name, active]
    );
    res.status(200).send("Entry created");
  } catch (err) { 
    console.error("SQL error:", err);
    res.status(500).send("Error creating entry.");
  } finally { 
    await db.closeConnection();
  }
});


// ========== Get ALL entries of a table ========== 

//ORDER

router.get('/get-all-order', async (req, res) => { 
  const db = new SqlService(); 
  //const tableName = "test_table"
  try {
    await db.connectToDb();
    const data = await db.query('SELECT * FROM `order`'); 
    res.status(200).json(data); 
  } catch (err) {
    console.error("SQL error:", err);
    res.status(500).send("Error fetching data.");
  } finally {
    await db.closeConnection(); 
  }
});

//MENU 

router.get('/get-all-menu', async (req, res) => { 
  const db = new SqlService(); 
  //const tableName = "test_table"
  try {
    await db.connectToDb();
    const data = await db.query(`SELECT * FROM menu`); 
    res.status(200).json(data); 
  } catch (err) {
    console.error("SQL error:", err);
    res.status(500).send("Error fetching data.");
  } finally {
    await db.closeConnection(); 
  }
});

//STAFF

router.get('/get-all-staff', async (req, res) => { 
  const db = new SqlService(); 
  //const tableName = "test_table"
  try {
    await db.connectToDb();
    const data = await db.query(`SELECT * FROM staff`); 
    res.status(200).json(data); 
  } catch (err) {
    console.error("SQL error:", err);
    res.status(500).send("Error fetching data.");
  } finally {
    await db.closeConnection(); 
  }
});

//TABLE

router.get('/get-all-table', async (req, res) => { 
  const db = new SqlService(); 
  //const tableName = "test_table"
  try {
    await db.connectToDb();
    const data = await db.query('SELECT * FROM `table`'); 
    res.status(200).json(data); 
  } catch (err) {
    console.error("SQL error:", err);
    res.status(500).send("Error fetching data.");
  } finally {
    await db.closeConnection(); 
  }
});

// ========== Get ONE entry of a table ==========

//ORDER

router.get('/get-one-order/:orderId/:status', async (req, res) => { 
  const db = new SqlService();
  //const tableName = "test_table"
  try {
    await db.connectToDb();
    const result = await db.query(
      'SELECT * FROM `order` WHERE orderId = ? AND status = ?',
      [req.params.orderId, req.params.status]
    );
    await db.closeConnection();

    if (result.length === 0) {
      res.status(404).send("Entry not found.");
    } else {
      res.status(200).json(result[0]);
    }
  } catch (err) {
    console.error("SQL error:", err);
    res.status(500).send("Error retrieving info.");
  }
});


//MENU

router.get('/get-one-menu/:dishId', async (req, res) => { 
  const db = new SqlService();
  //const tableName = "test_table"
  try {
    await db.connectToDb();
    const result = await db.query(
      `SELECT * FROM menu WHERE dishId = ? `,
      [req.params.dishId] 
    );
    await db.closeConnection();

    if (result.length === 0) {
      res.status(404).send("Entry not found.");
    } else {
      res.status(200).json(result[0]);
    }
  } catch (err) {
    console.error("SQL error:", err);
    res.status(500).send("Error retrieving info.");
  }
});


//STAFF

router.get('/get-one-staff/:staffId/:active', async (req, res) => { 
  const db = new SqlService();
  //const tableName = "test_table"
  try {
    await db.connectToDb();
    const result = await db.query(
      `SELECT * FROM staff WHERE staffId = ? AND active = ?`,
      [req.params.staffId, req.params.active] 
    );
    await db.closeConnection();

    if (result.length === 0) {
      res.status(404).send("Entry not found.");
    } else {
      res.status(200).json(result[0]);
    }
  } catch (err) {
    console.error("SQL error:", err);
    res.status(500).send("Error retrieving info.");
  }
});


//TABLE

router.get('/get-one-table/:tableId/:active', async (req, res) => { 
  const db = new SqlService();
  //const tableName = "test_table"
  try {
    await db.connectToDb();
    const result = await db.query(
      'SELECT * FROM `table` WHERE tableId = ? AND active = ?',
      [req.params.tableId, req.params.active] 
    );
    await db.closeConnection();

    if (result.length === 0) {
      res.status(404).send("Entry not found.");
    } else {
      res.status(200).json(result[0]);
    }
  } catch (err) {
    console.error("SQL error:", err);
    res.status(500).send("Error retrieving info.");
  }
});
module.exports = router; 
