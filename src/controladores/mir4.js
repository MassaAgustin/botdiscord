const mir4Model = require('../schemas/mir4Schema');

const getClases = () => {
    return [
        'Guerrero',
        'Maga',
        'Ballestera',
        'Lancero',
        'Taoista',
        'Ninguno'
    ];
}

const getListadoJugadores = async (req, res) => {
    const { page, limit, sortk, order, clan, nickName, nivel, poder, clase } = req.query;
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
    const queryFilter = {
    };
    let jugadores, promedio = 0;

    if (clan) {
        queryFilter.clan = clan;
    }

    if (clase) {
        queryFilter.clase = clase;
    }

    if (nickName) {
        queryFilter.nickName = { $regex: `(?i)(${nickName})` };
    }

    if (nivel) {
        queryFilter.nivel = { $lte: nivel };
    }

    if (poder) {
        queryFilter.poder = { $lte: poder };
    }

    if (page && limit) {

        let sortKey = 'nickName', orderValue = '1';

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

        [jugadores, allJugadores] = await Promise.all([
            mir4Model.paginate(queryFilter, options),
            mir4Model.find(queryFilter)
        ]);

        await allJugadores.forEach( async jugador => {
            promedio += jugador.poder
        });

        promedio /= jugadores.totalData;

    } else {
        jugadores = { jugadores: await mir4Model.find(queryFilter).populate('clan', '-_id -__v') };
    }

    res.status(200).json({
        success: true,
        message: `Jugadores de la página ${page}`,
        mediaPoder: promedio,
        ...jugadores

    });
}

const getJugadorByID = async (req, res) => {
    const { id } = req.params;

    const jugador = await mir4Model.findById(id)
        .populate(
            {
                path: 'clan',
                select: 'nombre -_id',
                /* populate: {
                    path: 'alianzas',
                    select: 'nombre -_id'
                } */
            }
        );

    const formatedJugador = {
        id: jugador._id,
        nickName: jugador.nickName,
        poder: jugador.poder,
        nivel: jugador.nivel,
        clase: jugador.clase,
        subclase: jugador.subclase,
        clan: jugador.clan.nombre,
        fechaCreacion: jugador['Fecha cracion'],
        fechaModificacion: jugador['Fecha actualizacion']
    }

    res.status(200).json(formatedJugador);
}

module.exports = {
    getJugadorByID,
    getListadoJugadores,
    getClases
}