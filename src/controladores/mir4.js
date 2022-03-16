const mir4Model = require('../schemas/mir4Schema');


const getListadoJugadores = async (req, res) => {
    const { } = req.body;
    const { page, limit, sortk, order } = req.query;
    const responseLabels = {
        totalDocs: 'totalData',
        docs: 'jugadores',
        limit: 'perPage',
        page: 'currentPage',
        nextPage: 'next',
        prevPage: 'prev'
        //totalPages: 'pageCount',
        //pagingCounter: 'slNo',
        //meta: 'paginador',
    };
    let jugadores;

    if (page && limit) {

        let sortKey = '_id', orderValue = '-1';

        if (sortk && order) {
            sortKey = sortk;
            orderValue = order;
        }

        const options = {
            page,
            limit,
            sort: { sortKey: orderValue },
            populate: {
                path: 'clan',
                select: '-_id -__v'
            },
            collation: {
                locale: 'es'
            },
            customLabels: responseLabels
        };

        jugadores = await mir4Model.paginate({}, options);

    } else {
        jugadores = { jugadores: await mir4Model.find({}).populate('clan', '-_id -__v') };
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