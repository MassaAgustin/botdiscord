const mir4Model = require('../schemas/mir4Schema');


const getListadoJugadores = async (req, res) => {
    const { } = req.body;
    const { page, limit, sort, order } = req.query;
    let jugadores;

    if (page && limit) {

        let sortKey = '_id', orderValue = '-1'; //If not pass any sort order, query result is inconsistence in the order(repeats elements)

        if (sort && order) {
            sortKey = sort
            orderValue = order
        }

        const options = {
            page,
            limit,
            sort: { sortKey: orderValue },
            collation: {
                locale: 'es'
            }
        };

        jugadores = await mir4Model.paginate({}, options);

    } else {
        jugadores = await mir4Model.find({}).populate('clan', '-_id -__v');
    }


    res.status(200).json({
        success: true,
        message: `Jugadores de la página ${page}`,
        ...jugadores
    });
}

const getJugadorByID = async (req, res) => {
    const { id } = req.params;

    const jugador = await mir4Model.findById(id)
        .populate(
            {
                path: 'clan',
                select: 'nombre alianzas -_id',
                populate: {
                    path: 'alianzas',
                    select: 'nombre -_id'
                }
            }
        );

    res.status(200).json(jugador);
}

module.exports = {
    getJugadorByID,
    getListadoJugadores
}