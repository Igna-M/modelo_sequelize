let db = require('../database/models');

let peliculasController = {
    crear: function(req, res){
        db.Genero.findAll()
        .then(function(generos){
            return res.render('creacionPeliculas', {generos: generos})
        })

    },
    agregar: function(req, res){
        db.Pelicula.create({
            title: req.body.titulo,
            awards: req.body.awards,
            length: req.body.length,
            rating: req.body.rating,
            release_date: req.body.fecha_estreno,
            genre_id: req.body.genero,
        })
        return res.redirect('peliculas')
    },
    listado: function(req, res){
        db.Pelicula.findAll()
            .then(function(peliculas){
                return res.render('listadoPeliculas', {peliculas: peliculas})
            })
    },
    detalle: function(req, res){
        db.Pelicula.findByPk(req.params.id, {
            include: [{association: 'genero'}, {association: 'actores'}]
        })
        .then(function(pelicula){
            return res.render('detallePelicula', {pelicula: pelicula})
        })
    },
    editar: function(req, res){
        let pedidoPelicula = db.Pelicula.findByPk(req.params.id);
        console.log(pedidoPelicula)
        let pedidoGeneros = db.Genero.findAll();
        Promise.all([pedidoPelicula, pedidoGeneros])
            .then(function([pelicula, generos]) {

            return res.render('editarPelicula', {pelicula: pelicula, generos: generos})
        });
    },
    actualizar:function(req, res){
        db.Pelicula.update({
            title: req.body.titulo,
            awards: req.body.awards,
            length: req.body.length,
            rating: req.body.rating,
            release_date: req.body.fecha_estreno,
            genre_id: req.body.genero
        }, {
            where: {
                id: req.params.id
            }
        })

        return res.redirect('/peliculas/' + req.params.id);
    },
    // Hay un problema con BORRAR, porque si la película tiene actuaciones, primero hay que borrar esas actuaciones
    borrar:function(req, res){ 
        db.Pelicula.destroy({
            where: {
                id: req.params.id
            }
        })

        res.redirect('/peliculas');
    }
    


}

module.exports = peliculasController