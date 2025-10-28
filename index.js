const express = require('express');
const app = express();
const db = require('./models');
const PORT =  3000; // Gunakan port 3000

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
    });
}).catch((err) => {
    console.log("Gagal sinkronisasi database: ", err);
});


// RUTE (ROUTES)
app.post('/Komik', async (req, res) => {
    const data = req.body;
    try {
        const Komik = await db.Komik.create(data);
        res.status(201).send(Komik); // Kirim status 201 (Created)
    }
    catch (err) {
        res.status(500).send(err); // Kirim status 500 jika ada error database
    }
});

app.get('/Komik', async (req, res) => {
    try {
        const Komik = await db.Komik.findAll();
        res.send(Komik);
    }
    catch (err) {
        res.status(500).send(err);
    }
});

app.put('/Komik/:id', async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    try {
        const Komik = await db.Komik.findByPk(id); // Ini sudah benar
        if (!Komik) {
            return res.status(404).send({ message: 'Komik tidak ditemukan' }); // Kirim JSON
        }
        await Komik.update(data);
        res.send({ message: 'Komik berhasil diupdate', Komik });
    }
    catch (err) {
        res.status(500).send(err);
    }
});

app.delete('/Komik/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const Komik = await db.Komik.findByPk(id);
        if (!Komik) {
            return res.status(404).send({ message: 'Komik tidak ditemukan' }); // Kirim JSON
        }
        await Komik.destroy();
        res.send({ message: 'Komik berhasil dihapus' });
    }
    catch (err) {
        res.status(500).send(err);
    }
});

// SINKRONISASI DAN JALANKAN SERVER (HANYA SATU KALI)